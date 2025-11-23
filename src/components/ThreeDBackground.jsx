import { useRef, useEffect } from 'react';

const ThreeDBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initParticles();
        };

        class Particle3D {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 1000;
                this.size = Math.random() * 2 + 1;
                this.speedZ = Math.random() * 2 + 0.5;
                this.color = `hsl(${200 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`;
            }

            update() {
                this.z -= this.speedZ;
                if (this.z <= 0) {
                    this.reset();
                    this.z = 1000;
                }
            }

            draw() {
                const scale = 1000 / (1000 + this.z);
                const x2d = (this.x - canvas.width / 2) * scale + canvas.width / 2;
                const y2d = (this.y - canvas.height / 2) * scale + canvas.height / 2;
                const size = this.size * scale;

                if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) {
                    return;
                }

                const opacity = 1 - this.z / 1000;
                ctx.fillStyle = this.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla');
                ctx.beginPath();
                ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                ctx.fill();

                // Trail effect
                if (scale > 0.5) {
                    ctx.strokeStyle = this.color.replace(')', `, ${opacity * 0.3})`).replace('hsl', 'hsla');
                    ctx.lineWidth = size / 2;
                    ctx.beginPath();
                    ctx.moveTo(x2d, y2d);
                    const prevZ = this.z + this.speedZ;
                    const prevScale = 1000 / (1000 + prevZ);
                    const prevX = (this.x - canvas.width / 2) * prevScale + canvas.width / 2;
                    const prevY = (this.y - canvas.height / 2) * prevScale + canvas.height / 2;
                    ctx.lineTo(prevX, prevY);
                    ctx.stroke();
                }
            }
        }

        const initParticles = () => {
            particles = [];
            const particleCount = 150;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle3D());
            }
        };

        const animate = () => {
            time += 0.01;

            // Create gradient background
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
            );
            gradient.addColorStop(0, 'rgba(10, 10, 30, 0.95)');
            gradient.addColorStop(1, 'rgba(5, 5, 15, 0.98)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
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
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default ThreeDBackground;
