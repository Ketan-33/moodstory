import { useEffect, useRef, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import LoginButton from "./ui/LoginButton";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { syncUser } from "../utils/syncUser";
import { useUserContext } from "../context/UserContext";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);
    const { setUserId, setUserData } = useUserContext();

    const { isSignedIn, user } = useUser();

    useEffect(() => {
        if (isSignedIn && user) {
            const userData = {
                id: user.id,
                name: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                imageUrl: user.imageUrl,
            };
            setUserId(user.id);
            setUserData(userData)
            // console.log(userData);

            syncUser(userData);
        }
    }, [isSignedIn, user]);


    useEffect(() => {
        if (showInput) {
            inputRef.current?.focus();
        }
    }, [showInput]);
    return (
        <header className="w-full fixed z-30 
            bg-black/10 backdrop-blur-xl 
            text-white px-6 py-2 
            flex justify-between items-center
            transition-all duration-300 shadow-xl">

            {/* Logo */}
            <Link to="/">
                <div className=" text-2xl w-1/4 font-bold">Moodstory.io</div>
            </Link>

            {/* Desktop Menu */}

            <nav className="w-1/2   hidden md:flex justify-center items-center  space-x-14 ">
                {/* <Link href="/" className="hover:text-purple-400">Home</Link> */}
                {/* <a href="#" className="hover:text-purple-400">Service</a>

                    <a href="#" className="hover:text-purple-400">Tools +</a>

                    <a href="#" className="hover:text-purple-400">Feature</a> */}
            </nav>


            {/* Actions */}
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
                            className="bg-purple-900/30 outline-none text-white px-3
                             py-1 rounded w-full"
                            onFocus={() => { }}
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
                <SignedOut>
                    <LoginButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
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

export default Navbar