import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const insights = [
    "Optimizing Database Queries...",
    "Scalability Check: Passed",
    "AI Model Training: 99%",
    "Security Protocol: Active",
    "Latency Reduced by 40%",
    "Codebase Refactoring...",
    "Deploying to Cloud...",
    "System Health: Optimal",
    "Generating Analytics...",
    "User Experience: Enhanced"
];

const AICore = () => {
    const [insight, setInsight] = useState("Click to Analyze");
    const [isScanning, setIsScanning] = useState(false);
    const coreRef = useRef(null);
    const textRef = useRef(null);

    const handleScan = () => {
        if (isScanning) return;
        setIsScanning(true);

        // Pulse animation
        gsap.to(coreRef.current, {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                gsap.to(coreRef.current, { scale: 1, duration: 0.2 });
            }
        });

        // Text scramble/update effect
        let count = 0;
        const interval = setInterval(() => {
            setInsight(insights[Math.floor(Math.random() * insights.length)]);
            count++;
            if (count > 5) {
                clearInterval(interval);
                setIsScanning(false);
                setInsight(insights[Math.floor(Math.random() * insights.length)]);
            }
        }, 100);
    };

    useGSAP(() => {
        // Idle animation
        gsap.to(coreRef.current, {
            boxShadow: "0 0 20px 5px rgba(0, 150, 255, 0.5)",
            repeat: -1,
            yoyo: true,
            duration: 1.5
        });
    }, []);

    return (
        <div
            className="codespark-gradient cursor-pointer group relative overflow-hidden"
            onClick={handleScan}
        >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

            <div className="relative z-10 flex items-center gap-7">
                {/* Central Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div ref={coreRef} className="w-20 h-20 rounded-full bg-black border border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        <img src="./ai.png" alt="AI Core" className="w-10 h-10 object-contain" />
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-white text-lg lg:text-xl">
                        CodeSpark Intelligence
                    </p>
                    <p ref={textRef} className="text-sm text-gray-300 font-mono mt-1 min-w-[200px]">
                        {isScanning ? (
                            <span className="animate-pulse text-blue-400">Scanning system...</span>
                        ) : (
                            <span>{insight}</span>
                        )}
                    </p>
                </div>
            </div>

            {/* Interactive ripple effect on click could go here, but GSAP pulse is sufficient for now */}
        </div>
    );
};

export default AICore;
