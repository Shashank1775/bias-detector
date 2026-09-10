export default function AboutMis() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-700 via-gray-800 to-gray-900 h-auto md:h-[60vh] flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-6 justify-between items-center">
                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-sm text-gray-400 mb-2">Misinformation Detection</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Combatting Misinformation with AI
                    </h2>
                    <article className="mt-4 md:mt-8">
                        <p className="text-gray-200 leading-7 md:leading-8 text-base md:text-lg">
                            Misinformation spreads quickly, and its consequences can be severe. Our platform leverages cutting-edge AI models to detect and flag potentially misleading or false information across the internet. Whether it&apos;s in news articles, social media, or blogs, we analyze the content for accuracy and source credibility. By highlighting possible misinformation, we help you make more informed decisions and avoid being misled. Stay vigilant, verify your sources, and promote truth in a digital world filled with noise.
                        </p>
                    </article>
                </div>
                {/* Image Section */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg mt-6 md:mt-0">
                    <img 
                        src="https://via.placeholder.com/800x400" 
                        alt="Misinformation Detection" 
                        className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}
