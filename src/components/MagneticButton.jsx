import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const MagneticButton = ({ children, className = "" }) => {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Magnetic strength
        const xTo = x * 0.35;
        const yTo = y * 0.35;

        gsap.to(buttonRef.current, {
            x: xTo,
            y: yTo,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
        >
            {children}
        </div>
    );
};

export default MagneticButton;
