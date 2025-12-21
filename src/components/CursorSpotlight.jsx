import React, { useEffect, useState } from 'react';

const CursorSpotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setOpacity(1);
        };

        const handleMouseLeave = () => {
            setOpacity(0);
        };

        const handleMouseEnter = () => {
            setOpacity(1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{ opacity }}
        >
            <div
                className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
                style={{
                    left: position.x - 150,
                    top: position.y - 150,
                    width: '300px',
                    height: '300px',
                    transform: 'translate(0, 0)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default CursorSpotlight;
