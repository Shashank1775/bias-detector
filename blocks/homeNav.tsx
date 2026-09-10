import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="shadow-md h-[9vh] flex items-center justify-between px-10 bg-gray-900 fixed top-0 left-0 right-0 z-50">
      {/* Left Section - Logo and Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold text-blue-400 pr-3">AI</Link>
        <nav className="flex space-x-4">
          <a href="/home" className="text-white hover:text-blue-400 font-bold">Home</a>
          <div className="relative group">
            <div className="flex items-center gap-1 hover:text-blue-400">
              <a href="/bias-detection" className="text-white hover:text-blue-400 font-bold">Bias Detection</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M4.293 7.793a1 1 0 0 1 1.414 0L12 14.086l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 15.5a2 2 0 0 1-2.828 0L4.293 9.207a1 1 0 0 1 0-1.414"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="absolute hidden group-hover:flex flex-col bg-gray-800 shadow-lg mt-2 rounded-md w-48">
              <a href="/text-bias" className="block px-4 py-2 text-white hover:bg-blue-700 font-bold">Text Bias Analyzer</a>
              <a href="/speech-bias" className="block px-4 py-2 text-white hover:bg-blue-700 font-bold">Speech Bias Detector</a>
              <a href="/video-bias" className="block px-4 py-2 text-white hover:bg-blue-700 font-bold">Video Bias Scanner</a>
            </div>
          </div>
          <div className="relative group">
            <div className="flex items-center gap-1 hover:text-blue-400">
              <a href="/misinformation" className="text-white hover:text-blue-400 font-bold">Misinformation Detection</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M4.293 7.793a1 1 0 0 1 1.414 0L12 14.086l6.293-6.293a1 1 0 1 1 1.414 1.414L13.414 15.5a2 2 0 0 1-2.828 0L4.293 9.207a1 1 0 0 1 0-1.414"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="absolute hidden group-hover:flex flex-col bg-gray-800 shadow-lg mt-2 rounded-md w-48">
              <a href="/fact-checking" className="block px-4 py-2 text-white hover:bg-blue-700 font-bold">Fact-Checker</a>
              <a href="/hate-speech" className="block px-4 py-2 text-white hover:bg-blue-700 font-bold">Hate Speech Detector</a>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Right Section - Features and Login */}
      <div className="flex items-center space-x-6">
        <nav className="flex space-x-4">
          <a href="/features" className="text-white hover:text-blue-400 font-bold">Features</a>
          <a href="/about" className="text-white hover:text-blue-400 font-bold">About</a>
        </nav>
        <a href="/login" className="text-white hover:text-blue-400 font-bold">Log In</a>
      </div>
    </div>
  );
}
