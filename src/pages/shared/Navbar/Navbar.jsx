import { NavLink } from "react-router";

const Navbar = () => {
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
                    to="/auth"
                    className={({ isActive }) =>
                        `hidden lg:block text-lg py-0.5 ${isActive ? "text-orange-700 font-medium" : "border"
                        }`
                    }
                >
                    Login
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="bg-base-100 shadow-md">
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
                    <a className="btn">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
