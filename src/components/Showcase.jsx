import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

const Showcase = () => {
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
                        <h2>Innovative Solutions</h2>

                        <div className="space-y-5 mt-7 pe-10">
                            <p>
                                Introducing {" "}
                                <span className="text-white">
                                    CodeSpark Engineering
                                </span>
                                . We build
                            </p>
                            <p>
                                Scalable, high-performance software solutions tailored to your business needs. From cloud architecture to AI integration, we deliver excellence.
                            </p>
                            <p>
                                Our team of expert engineers ensures that every line of code contributes to a robust, secure, and efficient system that drives your success.
                            </p>
                            <p className="text-primary">Learn more about our services</p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className="space-y-2">
                            <p>Up to</p>
                            <h3>10x faster</h3>
                            <p>development cycles with our agile process</p>
                        </div>
                        <div className="space-y-2">
                            <p>Guaranteed</p>
                            <h3>99.9% uptime</h3>
                            <p>for your critical applications</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Showcase
