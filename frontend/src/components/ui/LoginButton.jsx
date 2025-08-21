import React from 'react'

const LoginButton = () => {
    return (

        <button
            className="relative cursor-pointer py-2 px-3 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4  focus:outline-offset-4 overflow-hidden"
        >
            <span className="relative z-20">Login</span>

            <span
                className="absolute left-[-75%] top-0 h-full w-[50%] bg-purple-500/50 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"
            ></span>

            <span
                className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-purple-500 absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"
            ></span>
            <span
                className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-purple-500 absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"
            ></span>
            <span
                className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-purple-500 absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"
            ></span>
            <span
                className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-purple-500 absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"
            ></span>
        </button>

    )
}

export default LoginButton