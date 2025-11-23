import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = [];

        // Initialize drops at random y positions
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * height;
        }

        const characters = "0123456789ABCDEF<>{}[]/\\*&^%$#@!";

        const draw = () => {
            // Translucent black background to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                // Randomly vary color slightly for depth
                ctx.fillStyle = Math.random() > 0.9 ? '#80ff80' : '#00cc00';

                ctx.fillText(text, i * 20, drops[i]);

                // Move drop UP (decreasing y)
                drops[i] -= 20;

                // Reset to bottom if off screen randomly
                if (drops[i] < 0 && Math.random() > 0.975) {
                    drops[i] = height;
                }
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        />
    );
};

export default MatrixBackground;
