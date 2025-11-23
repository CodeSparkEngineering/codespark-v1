import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 2;
    }, []);

    return (
        <section id="hero">
            <div className="flex flex-col items-center justify-center">
                <h1>CodeSpark Engineering</h1>
                <h2 className="text-4xl md:text-6xl font-bold text-center mt-5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                    Built for Engineering Excellence.
                </h2>
            </div>

            <video ref={videoRef} src="./videos/hero.mp4" autoPlay muted playsInline />

            <a href="https://wa.me/message/D4VY7QSTGWJXO1" target="_blank" rel="noopener noreferrer">
                <button>Contact Us</button>
            </a>

            <p>Building the future of software.</p>
        </section>
    )
}
export default Hero
