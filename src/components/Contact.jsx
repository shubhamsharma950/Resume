import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-dark to-black text-white px-4 border-t border-gray-900">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="p-6 bg-gray-900 rounded-xl flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400 mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">Phone</h3>
                        <p className="text-gray-400 hover:text-white transition-colors">+91-7000569505</p>
                    </div>

                    <a href="mailto:sharma.shubham950@gmail.com" className="p-6 bg-gray-900 rounded-xl flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400 mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <p className="text-gray-400 hover:text-white transition-colors">sharma.shubham950@gmail.com</p>
                    </a>

                    <a href="https://www.linkedin.com/in/shubham-sharma-developer" target="_blank" rel="noopener noreferrer" className="p-6 bg-gray-900 rounded-xl flex flex-col items-center hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400 mb-4">
                            <Linkedin size={24} />
                        </div>
                        <h3 className="font-semibold mb-2">LinkedIn</h3>
                        <p className="text-gray-400 hover:text-white transition-colors">Connect on LinkedIn</p>
                    </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <MapPin size={16} />
                    <span>Indore, MP 452001</span>
                </div>

                <footer className="mt-20 pt-8 border-t border-gray-900 text-center text-gray-600">
                    <p>© {new Date().getFullYear()} Shubham Sharma. All rights reserved.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
