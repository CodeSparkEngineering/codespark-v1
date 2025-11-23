import { useState, useRef, useEffect } from 'react';

const OpportunityBrain = () => {
    const canvasRef = useRef(null);
    const [hoveredNode, setHoveredNode] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    const opportunities = [
        { id: 1, name: 'Cloud Architecture', x: 0.3, y: 0.3, color: '#0ea5e9', icon: 'cloud' },
        { id: 2, name: 'AI Integration', x: 0.7, y: 0.25, color: '#8b5cf6', icon: 'brain' },
        { id: 3, name: 'Web Development', x: 0.5, y: 0.5, color: '#10b981', icon: 'code' },
        { id: 4, name: 'Mobile Apps', x: 0.2, y: 0.65, color: '#f59e0b', icon: 'mobile' },
        { id: 5, name: 'Data Analytics', x: 0.75, y: 0.7, color: '#ec4899', icon: 'chart' },
        { id: 6, name: 'DevOps & CI/CD', x: 0.5, y: 0.15, color: '#06b6d4', icon: 'settings' },
    ];

    const renderIcon = (iconType) => {
        const iconProps = "w-8 h-8 text-white";

        switch (iconType) {
            case 'cloud':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                );
            case 'brain':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            case 'code':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
            case 'mobile':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                );
            case 'chart':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                );
            case 'settings':
                return (
                    <svg className={iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        let animationFrame;
        let time = 0;

        const drawBrain = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);
            time += 0.01;

            // Draw connections (synapses)
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
            ctx.lineWidth = 1;

            for (let i = 0; i < opportunities.length; i++) {
                for (let j = i + 1; j < opportunities.length; j++) {
                    const opp1 = opportunities[i];
                    const opp2 = opportunities[j];
                    const x1 = opp1.x * rect.width;
                    const y1 = opp1.y * rect.height;
                    const x2 = opp2.x * rect.width;
                    const y2 = opp2.y * rect.height;

                    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    if (distance < 200) {
                        const opacity = (1 - distance / 200) * 0.3;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            opportunities.forEach((opp, index) => {
                const x = opp.x * rect.width;
                const y = opp.y * rect.height;
                const pulse = Math.sin(time * 2 + index) * 3;
                const baseRadius = 25;
                const radius = baseRadius + pulse;

                // Glow effect
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
                gradient.addColorStop(0, opp.color + '40');
                gradient.addColorStop(1, opp.color + '00');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
                ctx.fill();

                // Main circle
                ctx.fillStyle = opp.color;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Border
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            animationFrame = requestAnimationFrame(drawBrain);
        };

        drawBrain();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        opportunities.forEach(opp => {
            const nodeX = opp.x * rect.width;
            const nodeY = opp.y * rect.height;
            const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);

            if (distance < 30) {
                setSelectedNode(opp);
            }
        });
    };

    return (
        <>
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="absolute inset-0 w-full h-full cursor-pointer z-20"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 z-40 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-blue-500/30">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        🧠 CodeSpark Opportunities
                    </h3>
                    <p className="text-blue-300 text-xs mt-1">Click nodes to explore</p>
                </div>
            </div>

            {/* Node Labels */}
            <div className="absolute inset-0 pointer-events-none z-30">
                {opportunities.map(opp => (
                    <div
                        key={opp.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                        style={{
                            left: `${opp.x * 100}%`,
                            top: `${opp.y * 100}%`,
                        }}
                    >
                        <div className="mb-1 flex justify-center">
                            {renderIcon(opp.icon)}
                        </div>
                        <div className="text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                            {opp.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Node Info */}
            {selectedNode && (
                <div className="absolute bottom-4 left-4 right-4 z-40 bg-black/80 backdrop-blur-lg p-4 rounded-xl border border-blue-500/50 animate-fadeIn">
                    <div className="flex items-start gap-3">
                        <div className="mt-1">{renderIcon(selectedNode.icon)}</div>
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-lg mb-1">{selectedNode.name}</h4>
                            <p className="text-gray-300 text-sm">
                                {selectedNode.id === 1 && "Scalable architecture on Google Cloud, AWS, and Azure."}
                                {selectedNode.id === 2 && "AI and Machine Learning integration into your systems."}
                                {selectedNode.id === 3 && "Modern web sites and applications with React and Next.js."}
                                {selectedNode.id === 4 && "Native and cross-platform apps for iOS and Android."}
                                {selectedNode.id === 5 && "Data analysis and intelligent dashboards."}
                                {selectedNode.id === 6 && "Deploy automation and infrastructure as code."}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="text-white hover:text-blue-400 transition-colors pointer-events-auto"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default OpportunityBrain;
