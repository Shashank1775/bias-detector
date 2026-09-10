export default function AboutHate() {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-700 via-gray-800 to-gray-900 h-auto md:h-[60vh] flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-6 justify-between items-center">
                {/* Image Section */}
                <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg mb-6 md:mb-0">
                    <img 
                        src="https://via.placeholder.com/800x400" 
                        alt="Hate Speech Detection" 
                        className="w-full h-auto object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                </div>
                
                {/* Text Section */}
                <div className="w-full md:w-1/2 p-4 flex flex-col text-center md:text-left">
                    <h1 className="text-sm text-gray-400 mb-2">Hate Speech Detection</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Addressing Hate Speech with AI</h2>
                    <article className="mt-4 md:mt-8">
                        <p className="text-gray-200 leading-7 md:leading-8 text-base md:text-lg">
                            Our platform is committed to detecting and addressing hate speech across a wide range of text and speech. Using advanced machine learning and natural language processing, we identify harmful language and discriminatory content, helping to create a safer online environment. Whether it&apos;s in news articles, social media posts, or political speeches, our AI models flag hate speech, offering context and suggesting more neutral alternatives. Stay informed, promote inclusion, and contribute to a more positive digital space.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
