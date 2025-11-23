import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const Showcase = () => {
    const { t } = useTranslation();
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    useGSAP(() => {
        if (!isTablet) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#showcase',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: true,
                }
            });

            timeline
                .to('.mask img', {
                    transform: 'scale(1.1)'
                }).to('.content', { opacity: 1, y: 0, ease: 'power1.in' });
        }
    }, [isTablet])

    return (
        <section id="showcase" className="w-screen overflow-hidden h-full common-padding bg-zinc pt-8">
            <div className="media">
                <video src="./videos/game.mp4" loop muted autoPlay playsInline />
                <div className="mask">
                    <img src="./mask-cse.svg" alt="CodeSpark Engineering Logo" />
                </div>
            </div>

            <div className="content">
                <div className="wrapper">
                    <div className="lg:max-w-md">
                        <h2>{t('showcase.heading')}</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                {t('showcase.intro')}{" "}
                                <span className="text-white">
                                    {t('showcase.company')}
                                </span>
                                {t('showcase.weBuild')}
                            </p>
                            <p>
                                {t('showcase.description1')}
                            </p>
                            <p>
                                {t('showcase.description2')}
                            </p>
                            <p className="text-primary">{t('showcase.learnMore')}</p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>{t('showcase.metric1Label')}</p>
                            <h3>{t('showcase.metric1Value')}</h3>
                            <p>{t('showcase.metric1Description')}</p>
                        </div>
                        <div className="space-y-2">
                            <p>{t('showcase.metric2Label')}</p>
                            <h3>{t('showcase.metric2Value')}</h3>
                            <p>{t('showcase.metric2Description')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase
