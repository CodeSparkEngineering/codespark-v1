import CodeTerminal from "./CodeTerminal.jsx";
import MatrixBackground from "./MatrixBackground.jsx";

const ProductViewer = () => {
    return (
        <section id="product-viewer" className="py-20 bg-black relative overflow-hidden">
            <MatrixBackground />

            <div className="screen-max-width px-5 md:px-10 mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-10">
                    Our Services.
                </h2>
                <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
                    We provide comprehensive engineering solutions to power your digital transformation.
                </p>

                <CodeTerminal />
            </div>
        </section>
    )
}
export default ProductViewer
