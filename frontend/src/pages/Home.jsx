import video from "../assets/video.mp4";

export default function Home() {
    return (
        <section className="relative pt-20 h-screen  text-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-20 overflow-hidden w-full">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Text Content */}
            <div className="max-w-3xl text-center md:text-left space-y-6 bg-black/5 backdrop-blur p-6 sm:p-8 border border-white/30 rounded-xl z-10">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                    Experience Storytelling, <br />
                    Powered by Emotion & Sound.
                </h1>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0">
                    Meet your AI storytelling companion — it listens to your mood, reacts in real-time,
                    and brings tales to life with immersive audio and visuals.
                    Stories that don’t just talk <span className="text-purple-400">— they feel.</span>
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition cursor-pointer">
                        Start Listening
                    </button>
                    <button className="px-6 py-3 border border-gray-700 rounded-full hover:border-white transition">
                        Explore Features
                    </button>
                </div>
            </div>

            {/* 3D Gradient Blob */}
            <div className="absolute bottom-0 right-0 md:right-10 flex items-center justify-center pointer-events-none">
                <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30" />
            </div>

            {/* Floating Cards */}
            <div className="absolute bottom-10 left-4 sm:left-10 bg-purple-900/30 p-4 rounded-xl backdrop-blur-lg border border-purple-500 text-xs sm:text-sm max-w-[200px]">
                <p className="font-semibold">Mood Detection</p>
                <p className="text-gray-300">Understands tone & expressions.</p>
            </div>

            <div className="absolute top-30 right-4 sm:right-10 bg-purple-900/30 p-4 rounded-xl backdrop-blur-lg border border-purple-500 text-xs sm:text-sm max-w-[200px]">
                <p className="font-semibold">Audio-Visual Stories</p>
                <p className="text-gray-300">Dynamic sound & visuals for deeper immersion.</p>
            </div>
        </section>
    );
}
