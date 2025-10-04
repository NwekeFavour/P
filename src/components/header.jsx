import { Rocket } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div>
            {/* Header */}
            <header className="sticky top-0 border-gray-800 bg-transparent backdrop-blur-md">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Rocket className="w-7 h-7 text-blue-400" />
                    <Link to={"/"} className="text-xl sm:text-2xl font-bold cursor-pointer">TechLaunch NG</Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    <Link to={"/internship"} className="text-gray-400 hover:underline transition">Programs</Link>
                    <Link to={"#about"} className="text-gray-400 hover:underline transition">About</Link>
                    <Link to={"#success"} className="text-gray-400 hover:underline transition">Success Stories</Link>
                </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;