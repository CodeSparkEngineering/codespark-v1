import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import OpportunityBrain from "./OpportunityBrain";
import ThreeDBackground from "./ThreeDBackground";

const Highlights = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    useGSAP(() => {
        gsap.to('.brain-container', {
            scrollTrigger: {
                trigger: '#highlights',
                start: isMobile ? 'bottom bottom' : 'top center'
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power1.inOut'
        });
    })

    return (
        <section id="highlights" className="relative">
            <h2>Explore our services.</h2>
            <h3>Interactive neural network of CodeSpark Engineering capabilities.</h3>

            <div className="brain-container opacity-0 translate-y-5 mt-20">
                <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-blue-900/30" style={{ height: '600px', position: 'relative' }}>
                    <ThreeDBackground />
                    <OpportunityBrain />
                </div>
            </div>
        </section>
    )
}
export default Highlights
