export default function AboutBias() {
    return (
        <div className="h-auto md:h-[60vh] flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-6 justify-between items-center">
                {/* Image Section */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg mb-6 md:mb-0">
                    <img 
                        src="https://via.placeholder.com/800x400" 
                        alt="Bias Detection" 
                        className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                </div>
                
                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 flex flex-col text-center md:text-left">
                    <h1 className="text-sm text-gray-400 mb-2">Bias Detection</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Combatting Bias in the Information You See</h2>
                    <article className="mt-4 md:mt-8">
                        <p className="text-gray-200 leading-7 md:leading-8 text-base md:text-lg">
                            Our platform uses advanced AI to detect and combat bias in news and social media. We strive to ensure the information you consume is accurate, unbiased, and free from harmful misinformation. By analyzing content, context, and sources, our system identifies biased language, unbalanced narratives, and misleading information, helping you stay informed without being swayed by external influences.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
