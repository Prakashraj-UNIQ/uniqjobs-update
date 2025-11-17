'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const toggleNav = () => setIsNavOpen((prev) => !prev);

    return (
        <div className="overflow-hidden">
            <div className="fixed sm:static w-full flex justify-between items-center bg-black px-4 sm:px-6 py-4 lg:px-24 z-1004">
                <div className="relative block xl:hidden z-1005">
                    <button
                        id="toggle-button"
                        className={`icon nav-icon-2 ${isNavOpen ? 'open' : ''}`}
                        onClick={toggleNav}
                        aria-label="Toggle navigation"
                        aria-expanded={isNavOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
                <div className="text-2xl text-white z-1004 font-primary font-bold">
                    <Link href="/">
                        Uniq<span className="text-brandRed"> Jobs</span>
                    </Link>
                </div>


                <div className="flex-1 overflow-hidden px-4">
                </div>

                <div className="hidden xl:flex justify-center items-center">
                    <p className="hidden xl:block text-white text-center text-xl font-primary font-medium tracking-lg border-r border-white/50 pr-5">
                        Empowering Careers{' '}
                        <span className="text-brandRed font-medium"> Since 2007</span>
                    </p>
                    <div className="ml-10">
                        <ul className="flex space-x-5">
                            <li>
                                <a
                                    href="https://www.facebook.com/share/1H6HomtGnP/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brandRed transform"
                                    aria-label="Facebook"
                                >
                                    <svg
                                        fill="#000000"
                                        className="w-9 h-9 bg-white rounded-full fill-black hover:bg-blue-600 hover:fill-white transition duration-300 ease-in-out"
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path>
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://www.instagram.com/uniqtechs?igsh=MXM2dDRnYW16cncyNQ=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <svg
                                        className="w-9 h-9 p-1 bg-white rounded-full fill-black hover:bg-pink-600 hover:fill-white transition duration-300 ease-in-out"
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
                                        <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://youtube.com/@uniqtechnologiesofficial?si=TjCFfum3corJj1K_"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                >
                                    <svg
                                        className="w-9 h-9 fill-white hover:fill-red-600 hover:fill-primary-600 hover:bg-white rounded-full transition duration-300 ease-in-out"
                                        viewBox="-143 145 512 512"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polygon points="78.9,450.3 162.7,401.1 78.9,351.9" />
                                        <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M241,446.8c0,44.1-44.1,44.1-44.1,44.1H29.1c-44.1,0-44.1-44.1-44.1-44.1v-91.5c0-44.1,44.1-44.1,44.1-44.1h167.8c44.1,0,44.1,44.1,44.1,44.1V446.8z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://t.me/uniqtechnologies"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram"
                                >
                                    <svg
                                        className="w-9 h-9 fill-white hover:fill-sky-400 hover:bg-white rounded-full transition duration-300 ease-in-out"
                                        viewBox="0 0 32 32"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16 0.5c-8.563 0-15.5 6.938-15.5 15.5s6.938 15.5 15.5 15.5c8.563 0 15.5-6.938 15.5-15.5S24.563 0.5 16 0.5zM23.613 11.119l-2.544 11.988c-0.188 0.85-0.694 1.056-1.4 0.656l-3.875-2.856-1.869 1.8c-0.206 0.206-0.381 0.381-0.781 0.381l0.275-3.944 7.181-6.488c0.313-0.275-0.069-0.431-0.482-0.156l-8.875 5.587-3.825-1.194c-0.831-0.262-0.85-0.831 0.175-1.231l14.944-5.763c0.694-0.25 1.3 0.169 1.075 1.219z" />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://maps.app.goo.gl/thg9aZn4NXCxH1MR6?g_st=aw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Google Maps"
                                >
                                    <svg
                                        className="w-9 h-9 p-2 bg-white rounded-full fill-black hover:bg-amber-400 hover:fill-white transition duration-300 ease-in-out"
                                        viewBox="0 0 64 64"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z" />
                                        <path d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <MobileMenu isNavOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
        </div>
    );
}
