export default function Home() {
    return (
        <section className="relative bg-black text-white min-h-screen flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden">

            {/* Text Content */}
            <div className="max-w-3xl text-center md:text-left space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Supercharge Your <br />
                    Business With AI That <br />
                    Works Like a Charm.
                </h1>
                <p className="text-gray-400 max-w-md">
                    Goodbye inefficiencies, our AI boosts productivity and drives smarter
                    decisions without hassle.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center md:justify-start">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border border-gray-700 rounded-full hover:border-white transition">
                        Learn More
                    </button>
                </div>
            </div>

            {/* 3D Gradient Shape Placeholder */}
            <div className="absolute bottom-0 md:right-10 flex flex-col items-center">
                <div className="w-[300px] h-[300px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-40" />
                <div className="absolute -top-20">
                    <img
                        src="/assets/3d-shape.png"
                        alt="3D Shape"
                        className="w-[350px] animate-pulse"
                    />
                </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-20 left-10 bg-purple-900/30 p-4 rounded-xl backdrop-blur-lg border border-purple-500">
                <p className="font-semibold">Noise Reduction</p>
                <button className="text-sm text-purple-300 underline">View</button>
            </div>

            <div className="absolute bottom-20 right-10 bg-purple-900/30 p-4 rounded-xl backdrop-blur-lg border border-purple-500">
                <p className="font-semibold">Smart Heat Control</p>
            </div>
        </section>
    );
}
