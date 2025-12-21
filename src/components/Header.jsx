import React, { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import MagneticButton from './MagneticButton';

const Header = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Glitch/ Cyber reveal effect
            tl.from("#intro-name", {
                duration: 1.5,
                y: 100,
                opacity: 0,
                skewX: 10,
                ease: "power4.out",
                stagger: {
                    amount: 0.3
                }
            })
                .to("#intro-name", {
                    duration: 0.1,
                    skewX: -10,
                    ease: "power4.out",
                    repeat: 3,
                    yoyo: true
                }, "-=1")
                .to("#intro-name", {
                    duration: 0.1,
                    skewX: 0,
                });

            tl.from("#intro-role", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5")
                .from("#intro-desc", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(".cta-btn", {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.4");
        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <header className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden bg-dark text-white" ref={comp}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/10 pointer-events-none" />

            <div className="z-10 max-w-4xl mx-auto">
                <h1 id="intro-name" className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Shubham Sharma
                </h1>
                <h2 id="intro-role" className="text-2xl md:text-3xl font-medium text-gray-300 mb-8 tracking-wide">
                    FULL STACK WORDPRESS DEVELOPER (REACTJS + PHP)
                </h2>
                <p id="intro-desc" className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                    Experienced and detail-oriented Web Developer with 5+ years of professional experience.
                    Specializing in ReactJS integrated with WordPress to build robust, scalable, and user-centric web applications.
                </p>

                <div className="flex gap-4 justify-center">
                    <MagneticButton>
                        <a href="#contact" className="cta-btn block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-600/30">
                            Contact Me
                        </a>
                    </MagneticButton>
                    <MagneticButton>
                        <a href="#experience" className="cta-btn block px-8 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-full font-medium transition-all backdrop-blur-sm">
                            View Work
                        </a>
                    </MagneticButton>
                </div>
            </div>
        </header>
    );
};

export default Header;
