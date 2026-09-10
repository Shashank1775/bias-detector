import { useState } from "react";

export default function InfoSection() {
    const [currentTopic, setCurrentTopic] = useState('Overview');

    return (
        <div className="p-6 bg-gray-900 min-h-full flex flex-col items-center mb-4 mt-12">
            <div className="w-full bg-gray-900 text-gray-100 shadow-lg rounded-lg overflow-hidden">
            <h1 className="text-4xl font-bold mb-8 text-gray-100 text-center">AI-Powered Bias & Misinformation Detection Platform</h1>

                <div className="flex flex-wrap gap-4 mb-8 items-center justify-center gap-4 ">
                    
                    <div
                        onClick={() => setCurrentTopic('Overview')}
                        className={`p-4 rounded-lg transition-transform transform cursor-pointer hover:scale-105 ml-8 ${currentTopic === 'Overview' ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </div>
                    <div
                        onClick={() => setCurrentTopic('Features')}
                        className={`p-4 rounded-lg transition-transform transform cursor-pointer hover:scale-105 ml-8 ${currentTopic === 'Features' ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                        </svg>
                    </div>
                    <div
                        onClick={() => setCurrentTopic('GettingStarted')}
                        className={`p-4 rounded-lg transition-transform transform cursor-pointer hover:scale-105 ml-8 ${currentTopic === 'GettingStarted' ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div
                        onClick={() => setCurrentTopic('HowItWorks')}
                        className={`p-4 rounded-lg transition-transform transform cursor-pointer hover:scale-105 ml-8 ${currentTopic === 'HowItWorks' ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center">
    <div className="p-6 rounded-lg w-full md:w-[120vh]">
        {currentTopic === 'Overview' && (
            <div className="flex flex-col md:flex-row items-start p-6 rounded-lg mx-auto">
                <div className="flex-1 pr-6 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-500 mb-2">Overview</h2>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">What is it?</h1>
                    <p className="text-gray-300 mb-4">
                        Our AI-Powered Bias & Misinformation Detection Platform analyzes text and speech to identify and explain bias, misinformation, and hate speech. Here&apos;s how it helps:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li className="text-gray-200">Detects bias, stereotypes, and misinformation in articles, social media, and speech.</li>
                        <li className="text-gray-200">Offers neutral, bias-free rewrites and justifications to promote inclusivity.</li>
                        <li className="text-gray-200">Enables users to understand and counter harmful narratives with actionable insights.</li>
                    </ul>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://dummyimage.com/600x400" alt="dummy image" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </div>
        )}

        {currentTopic === 'Features' && (
            <div className="flex flex-col md:flex-row items-start p-6 rounded-lg mx-auto">
                <div className="flex-1 pr-6 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-green-500 mb-2">Options</h2>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">The Features</h1>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li className="text-gray-300">Real-time detection of bias, misinformation, and hate speech in various media.</li>
                        <li className="text-gray-300">AI-powered rewriting tools to offer neutral and fact-checked content suggestions.</li>
                        <li className="text-gray-300">Gamified elements to engage users in identifying bias and misinformation.</li>
                        <li className="text-gray-300">Multilingual support for global impact and inclusive content analysis.</li>
                    </ul>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://dummyimage.com/600x400" alt="Features illustration" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </div>
        )}

        {currentTopic === 'GettingStarted' && (
            <div className="flex flex-col md:flex-row items-start p-6 rounded-lg mx-auto">
                <div className="flex-1 pr-6 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">Get Started</h2>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">How It Works...</h1>
                    <p className="text-gray-300 mb-4">To start using the platform:</p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li className="text-gray-200">Input text or upload speech for analysis.</li>
                        <li className="text-gray-200">Receive instant feedback on bias, misinformation, and hate speech.</li>
                        <li className="text-gray-200">Get suggested rewrites and track your progress with real-time updates.</li>
                    </ul>
                    <p className="text-gray-400">
                        Join us in creating a more neutral and inclusive digital space with actionable insights and tools.
                    </p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://dummyimage.com/600x400" alt="Getting Started illustration" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </div>
        )}

        {currentTopic === 'HowItWorks' && (
            <div className="flex flex-col md:flex-row items-start p-6 rounded-lg mx-auto">
                <div className="flex-1 pr-6 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-red-500 mb-2">The Background</h2>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">Our Technology</h1>
                    <p className="text-gray-300 mb-4">Our platform works by analyzing a wide range of text and speech data using advanced AI models:</p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                        <li className="text-gray-200">RoBERTa and HateXplain detect bias and stereotypes in text.</li>
                        <li className="text-gray-200">LIAR helps identify misinformation with context validation via GPT-4.</li>
                    </ul>
                    <p className="text-gray-400">
                        This cutting-edge technology ensures accurate, real-time analysis for all forms of communication.
                    </p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <img src="https://dummyimage.com/600x400" alt="How It Works illustration" className="w-full h-auto rounded-lg shadow-md" />
                </div>
            </div>
        )}
    </div>
</div>

                </div>
            </div>
    );
}
