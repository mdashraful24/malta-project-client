import { NavLink } from "react-router";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
                    }
                >
                    About
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/highlight"
                    className={({ isActive }) =>
                        `block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
                    }
                >
                    Highlight
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/auth/login"
                    className={({ isActive }) =>
                        `hidden lg:block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : ""}`
                    }
                >
                    Login
                </NavLink>
            </li>
        </>
    );

    useEffect(() => {
        let scrollTimer;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // Clear previous timer
            clearTimeout(scrollTimer);

            // User is scrolling
            setIsScrolling(true);

            // If scrolling down and not at top, hide navbar
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
            // If scrolling up, show navbar
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }

            // Update last scroll position
            setLastScrollY(currentScrollY);

            // Set a timer to show navbar when scrolling stops
            scrollTimer = setTimeout(() => {
                setIsVisible(true);
                setIsScrolling(false);
            }, 150); // 150ms delay after scrolling stops
        };

        // Throttle the scroll event for better performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    controlNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
        };
    }, [lastScrollY]);

    return (
        <div
            className={`bg-base-100 shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible
                    ? 'translate-y-0'
                    : '-translate-y-full'
                } ${isScrolling ? 'shadow-sm' : 'shadow-md'
                }`}
        >
            <div className="navbar container mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a href="/" className="text-xl font-semibold">
                        Malta
                    </a>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                <div className="navbar-end lg:hidden">
                    <NavLink
                        to="/auth/login"
                        className={({ isActive }) =>
                            `btn ${isActive ? "text-orange-700 font-medium" : ""}`
                        }
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;