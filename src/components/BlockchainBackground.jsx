import { useEffect, useRef } from 'react';

const BlockchainBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Blockchain nodes
        const nodes = [];
        const nodeCount = 15;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 4 + Math.random() * 3,
                connections: []
            });
        }

        const drawNode = (node, pulse) => {
            // Outer glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${0.3 * pulse})`);
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fill();

            // Core
            ctx.fillStyle = `rgba(96, 165, 250, ${0.8 + 0.2 * pulse})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Inner highlight
            ctx.fillStyle = `rgba(147, 197, 253, ${0.6 * pulse})`;
            ctx.beginPath();
            ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.4, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawConnection = (node1, node2, strength) => {
            const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${strength * 0.3})`);
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${strength * 0.4})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${strength * 0.3})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();

            // Animated particle on connection
            const t = (time * 0.001) % 1;
            const px = node1.x + (node2.x - node1.x) * t;
            const py = node1.y + (node2.y - node1.y) * t;

            ctx.fillStyle = `rgba(147, 197, 253, ${strength})`;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
        };

        const animate = () => {
            time += 16;

            // Clear canvas with fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const pulse = Math.sin(time * 0.002) * 0.5 + 0.5;

            // Update node positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Keep within bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));
            });

            // Draw connections
            nodes.forEach((node1, i) => {
                nodes.forEach((node2, j) => {
                    if (i < j) {
                        const dx = node2.x - node1.x;
                        const dy = node2.y - node1.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = 200;

                        if (distance < maxDistance) {
                            const strength = 1 - distance / maxDistance;
                            drawConnection(node1, node2, strength);
                        }
                    }
                });
            });

            // Draw nodes
            nodes.forEach(node => {
                drawNode(node, pulse);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.4 }}
        />
    );
};

export default BlockchainBackground;
