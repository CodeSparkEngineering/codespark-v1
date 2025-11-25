import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BlockchainBackground from './BlockchainBackground.jsx';
import { useTranslation } from 'react-i18next';

const CodeTerminal = () => {
    const { t } = useTranslation();
    const containerRef = useRef();
    const linesRef = useRef([]);

    const services = [
        { text: t('codeTerminal.services.gcloud'), color: "text-green-400" },
        { text: t('codeTerminal.services.websites'), color: "text-blue-400" },
        { text: t('codeTerminal.services.architecture'), color: "text-purple-400" },
        { text: t('codeTerminal.services.ai'), color: "text-yellow-400" },
        { text: t('codeTerminal.services.ready'), color: "text-white" }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        // Reset all lines to invisible initially
        linesRef.current.forEach(line => {
            gsap.set(line, { opacity: 0, y: 20 });
        });

        // Animate each line appearing
        services.forEach((_, index) => {
            tl.to(linesRef.current[index], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, index * 0.3);
        });

        // Hold for a moment
        tl.to({}, { duration: 2 });

        // Fade all out
        tl.to(linesRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.1
        });

    }, { scope: containerRef });

    return (
        <section id="code-terminal" className="common-padding bg-zinc-900 section-spacing relative overflow-hidden">
            {/* Blockchain Background */}
            <BlockchainBackground />

            <div className="screen-max-width relative z-10">
                <div className="mb-12 w-full flex flex-col items-center">
                    <h1 id="features_title" className="section-heading text-center">
                        {t('codeTerminal.title')}
                    </h1>
                    <p className="text-gray-500 text-center max-w-2xl mt-5">
                        {t('codeTerminal.subtitle')}
                    </p>
                </div>

                <div className="flex justify-center items-center w-full">
                    <div className="w-full max-w-5xl flex justify-center">
                        <div ref={containerRef} className="w-full max-w-[800px] relative z-20">
                            <div className="bg-black/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-500">
                                {/* Terminal Header */}
                                <div className="bg-white/10 px-4 py-3 flex items-center gap-2 border-b border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 text-xs text-white/60 font-mono">bash — 80x24</div>
                                </div>

                                {/* Terminal Body */}
                                <div className="p-8 min-h-[400px] font-mono text-left terminal-content relative z-10">
                                    {services.map((service, index) => (
                                        <div
                                            key={index}
                                            ref={el => linesRef.current[index] = el}
                                            className={`terminal-line text-lg md:text-xl mb-3 ${service.color} opacity-0 font-semibold`}
                                        >
                                            {service.text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Glow effect behind */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl -z-10 rounded-full opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodeTerminal;
