import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MarqueeRow = ({ items, direction = "left", speed = 20 }) => {
    const rowRef = useRef(null);
    const q = gsap.utils.selector(rowRef);

    useEffect(() => {
        const row = rowRef.current;
        const width = row.scrollWidth;
        const duration = width / speed;

        gsap.to(row, {
            x: direction === "left" ? "-50%" : "calc(0% - 100px)", // Adjusted for continuous flow logic if needed, but simple wrap is better
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % (width / 2)) // Infinite wrap logic
            },
            ease: "none",
            repeat: -1,
            duration: duration,
        });

        // Simpler approach for pure CSS-like infinite scroll using GSAP
        // Actually, let's use a simpler standard marquee animation:
        gsap.context(() => {
            gsap.to(".marquee-inner", {
                xPercent: direction === "left" ? -50 : 0,
                x: direction === "right" ? "-50%" : 0, // Inverted logic for right scroll start point
                ease: "none",
                duration: 20,
                repeat: -1,
            });
            if (direction === "right") {
                gsap.fromTo(".marquee-inner",
                    { xPercent: -50 },
                    { xPercent: 0, ease: "none", duration: 20, repeat: -1 }
                );
            }
        }, rowRef);

    }, [direction, speed]);

    // Simple CSS animation alternative for smoothness without complex JS math
    return (
        <div className="w-full overflow-hidden whitespace-nowrap py-4" ref={rowRef}>
            <div className="marquee-inner inline-block" style={{ display: 'flex' }}>
                <div className="flex gap-4 px-2">
                    {items.map((item, i) => (
                        <span key={i} className="skill-tag px-6 py-3 bg-gray-900/80 text-gray-300 rounded-full text-lg border border-gray-700/50 hover:border-blue-500 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer">
                            {item}
                        </span>
                    ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex gap-4 px-2">
                    {items.map((item, i) => (
                        <span key={`dup-${i}`} className="skill-tag px-6 py-3 bg-gray-900/80 text-gray-300 rounded-full text-lg border border-gray-700/50 hover:border-blue-500 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer">
                            {item}
                        </span>
                    ))}
                </div>
                {/* Triplicate to ensure full screen coverage */}
                <div className="flex gap-4 px-2">
                    {items.map((item, i) => (
                        <span key={`dup2-${i}`} className="skill-tag px-6 py-3 bg-gray-900/80 text-gray-300 rounded-full text-lg border border-gray-700/50 hover:border-blue-500 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);

    const allSkills = [
        "PHP (OOP)", "JavaScript (ES6+)", "ReactJS", "HTML5 & CSS3", "Ajax", "jQuery", "Bootstrap",
        "Custom WordPress Themes", "Plugin Development", "Gutenberg Blocks", "WooCommerce", "WP-CLI",
        "Multisite", "ACF", "Rest API", "MySQL", "Git", "Webpack", "Tailwind CSS", "GSAP"
    ];

    // Split into two rows
    const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
    const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

    return (
        <section id="skills" ref={sectionRef} className="py-24 bg-dark text-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    My Arsenal
                </h2>
                <p className="text-gray-400 text-center mt-4 text-lg">
                    Always expanding, never settling.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                <MarqueeRow items={row1} direction="left" speed={25} />
                <MarqueeRow items={row2} direction="right" speed={25} />
            </div>
        </section>
    );
};

export default Skills;
