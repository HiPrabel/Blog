import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FaGithub, FaLinkedin, FaGooglePlay, FaApple, FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-gray-900 text-white border-t border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 text-center md:text-left">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="mb-4">
                            <Logo width="150px" className="invert" style={{ width: "150px", height: "auto" }} />
                        </div>
                        <p className="text-sm text-gray-400 min-h-[20px]">© 2025. All Rights Reserved.</p>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-blue-400 hover:underline">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-blue-400 hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">
                            Support / Contact
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="https://www.linkedin.com/in/prabel-pandey" className="text-blue-400 hover:underline">
                                    LinkedIn
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:prabel397@gmail.com" className="text-blue-400 hover:underline">
                                    Email Me
                                </a>
                            </li>
                        </ul>

                        <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                            <a href="https://github.com/HiPrabel" className="text-gray-300 hover:text-white" aria-label="GitHub">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/prabel-pandey" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://x.com/Prabel397x" className="text-gray-300 hover:text-white" aria-label="X (Twitter)">
                                <FaXTwitter size={24} />
                            </a>
                        </div>
                    </div>

                    {/* App Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Get the App</h3>
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <a href="https://play.google.com/store/apps" className="flex items-center justify-center space-x-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 w-40 min-h-[42px]">
                                <FaGooglePlay size={20} />
                                <span>Google Play</span>
                            </a>
                            <a href="https://www.apple.com/app-store/" className="flex items-center justify-center space-x-2 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 w-40 min-h-[42px]">
                                <FaApple size={20} />
                                <span>App Store</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
