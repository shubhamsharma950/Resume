import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ children, className }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;

        gsap.to(cardRef.current, {
            rotationY: x,
            rotationX: -y,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`${className} group transform-gpu preserve-3d`}
        >
            {children}
        </div>
    );
};

const Experience = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".exp-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const jobs = [
        {
            company: "Nextiva",
            role: "Sr. WordPress VIP Developer",
            period: "09/2024 - 11/2024",
            details: [
                "Developed and maintained enterprise-level WordPress VIP websites with a strong focus on scalability, security, and performance.",
                "Built custom themes and plugins following WordPress VIP coding standards, PHPCS rules, and best practices.",
                "Implemented Gutenberg custom blocks using React, ESNext, and WordPress block-editor APIs.",
                "Worked with modern PHP (7/8), Composer, and object-oriented programming to build modular, maintainable codebases.",
                "Migrated legacy shortcodes and PHP templates into modern Gutenberg block structures."
            ]
        },
        {
            company: "Metafic",
            role: "Sr. WordPress Developer",
            period: "02/2024 - 08/2024",
            details: [
                "Developed scalable and secure WordPress websites and custom plugins, ensuring clean architecture and reusable code components.",
                "Built and maintained custom Gutenberg blocks using ReactJS to enhance the content editing experience for non-technical users.",
                "Designed and implemented interactive UI features using ReactJS (Hooks, JSX, Context API) within WordPress front-end and back-end interfaces.",
                "Integrated and consumed REST APIs for real-time data interaction and third-party service compatibility."
            ]
        }
    ];

    return (
        <section id="experience" ref={sectionRef} className="py-24 bg-dark text-white px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Work History
                </h2>

                <div className="space-y-12 perspective-1000">
                    {jobs.map((job, index) => (
                        <TiltCard key={index} className="exp-item relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                            <div className="md:grid md:grid-cols-12 gap-8">
                                <div className="md:col-span-4 text-left md:text-right mb-4 md:mb-0">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.company}</h3>
                                    <p className="text-blue-400 font-medium">{job.period}</p>
                                </div>

                                <div className="hidden md:block md:col-span-1 relative flex justify-center">
                                    <div className="w-0.5 h-full bg-gray-700/50 absolute top-0"></div>
                                    <div className="w-4 h-4 rounded-full bg-blue-500 z-10 mt-2 box-content border-4 border-gray-900 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                </div>

                                <div className="md:col-span-7 border-l-2 border-gray-700/50 md:border-0 pl-6 md:pl-0">
                                    <h4 className="text-xl font-semibold text-gray-200 mb-3">{job.role}</h4>
                                    <ul className="space-y-2 text-gray-400 list-disc list-outside ml-4">
                                        {job.details.map((detail, i) => (
                                            <li key={i} className="leading-relaxed text-sm md:text-base group-hover:text-gray-300 transition-colors">
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
