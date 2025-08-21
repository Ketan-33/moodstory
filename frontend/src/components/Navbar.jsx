import { useEffect, useRef, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import LoginButton from "./ui/LoginButton";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (showInput) {
            inputRef.current?.focus();
        }
    }, [showInput]);
    return (
        <header className="w-full fixed z-30 
            bg-black/10 backdrop-blur-xl 
            shadow-[0_4px_30px_rgba(0,0,0,0.25)] 
            text-white px-6 py-2 
            flex justify-between items-center
            transition-all duration-300 shadow-xl">

            {/* Logo */}
            <div className=" text-2xl w-1/4 font-bold">Moodstory.io</div>

            {/* Desktop Menu */}

                <nav className="w-1/2   hidden md:flex justify-center items-center space-x-14 ">
                    <a href="#" className="hover:text-purple-400">Home</a>
                    <a href="#" className="hover:text-purple-400">Service</a>

                    <a href="#" className="hover:text-purple-400">Tools +</a>

                    <a href="#" className="hover:text-purple-400">Feature</a>
                </nav>


            {/* Actions */}
<<<<<<< HEAD
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-800/50">
                    <Search size={18} />
                </button>
                <button className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-700">
                    Login
                </button>
=======
            <div className="w-fit flex items-right space-x-4">
                {/* Search Wrapper with fixed width to avoid layout shift */}
                <div className="relative w-48 flex items-center justify-end">
                    {/* Input Field */}
                    <div
                        className={`absolute right-0 transition-all duration-300 ease-in-out overflow-hidden ${showInput ? 'w-48 opacity-100' : 'w-0 opacity-0'
                            }`}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            className="bg-purple-900/30 outline-none text-white px-3 py-1 rounded w-full"
                            onFocus={true}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        className="p-2 rounded-full cursor-pointer transition-colors relative z-10"
                        onClick={() => setShowInput(!showInput)}
                    >
                        <Search size={18} />
                    </button>
                </div>

                <LoginButton />
>>>>>>> dcc6c60761b5e891b8b75ff3e6bfa14b35595880
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden border p-2"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={24} /> : <Menu size={24} />}
            </button>
        </header>
    );
}
