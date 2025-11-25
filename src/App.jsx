import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase.jsx";
import Performance from "./components/Performance.jsx";
import Features from "./components/Features.jsx";
import Highlights from "./components/Highlights.jsx";
import Footer from "./components/Footer.jsx";
import MatrixBackground from "./components/MatrixBackground.jsx";
import CodeTerminal from "./components/CodeTerminal.jsx";
import ClientQuiz from "./components/ClientQuiz.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget.jsx";

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <MatrixBackground />
            <CodeTerminal />
            <Showcase />
            <Performance />
            <Features />
            <Highlights />
            <Footer />
            <WhatsAppWidget />
        </main>
    )
}

export default App
