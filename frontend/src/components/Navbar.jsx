import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold">Moodstory.io</div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
                <a href="#" className="hover:text-purple-400">Home</a>
                <a href="#" className="hover:text-purple-400">Service</a>
                <div className="relative group">
                    <button className="hover:text-purple-400">Tools +</button>
                    <div className="absolute hidden group-hover:block bg-gray-900 p-2 rounded-lg mt-2">
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Tool 1</a>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-800">Tool 2</a>
                    </div>
                </div>
                <a href="#" className="hover:text-purple-400">Feature</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-800">
                    <Search size={18} />
                </button>
                <button className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-700">
                    Login
                </button>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>
    );
}
