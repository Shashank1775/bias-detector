'use client'

import InfoSection from "@/blocks/InfoSection";
import AboutBias from "@/blocks/aboutBias";
import AboutHate from "@/blocks/aboutHate";
import AboutMis from "@/blocks/aboutMisinformation";
import TextBoxDetector from "@/blocks/detectors/textBoxDetector";
import HomeNav from "@/blocks/homeNav";
import { useState, useEffect } from "react";

// Words cycled by the typewriter effect in the hero heading.
const WORDS = ["Community", "Platform", "Solution", "World", "Universe"];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  useEffect(() => {
    const word = WORDS[wordIndex];
    const typingSpeed = deleting ? 100 : 150;
    let delay = 0;
  
    if (!deleting && charIndex === word.length) {
      delay = 1000; // 1 second pause before deleting
    } else if (deleting && charIndex === 0) {
      delay = 500; // 500ms pause before switching words
    }
  
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < word.length) {
        setDisplayedWord(word.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayedWord(word.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        // Only switch the word after the deletion is finished
        setDeleting(!deleting);
        if (deleting && charIndex === 0) {
          setWordIndex((prev) => (prev + 1) % WORDS.length);
        }
      }
    }, typingSpeed + delay);
  
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <>
      <HomeNav />
      <div className="bg-gray-900 w-[screen] flex flex-col items-center justify-center">
          <div className="items-center w-[130vh] flex justify-center h-[40vh] text-spacing-8 flex-col tracking-wider mt-70">
            <h1 className="text-7xl font-black text-center text-white leading[120%]">All-in-One Platform to Create an Unbiased</h1>
            <div className="min-h-[9vh] mt-6">
              <h1 className="text-7xl font-black text-center tracking-tight text-blue-400">{displayedWord}</h1>
            </div>
            <div className="w-[70vh] text-center mt-6">
              <p className="text-white">
                The AI-Powered Bias &amp; Misinformation Detection Platform uses Claude to detect bias, misinformation, hate speech, and stereotypes in text and explain exactly which passages triggered each finding.
              </p>
            </div>
            <div className="mt-12">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <span className="text-lg font-semibold">Get Started</span>
              </button>
            </div>
          </div>
          <div className="mt-30 bg-gray-900">
            <TextBoxDetector />
          </div>
          <div className="mt-30">
            <InfoSection />
          </div>
          <div className="w-full bg-gray-800 h-[120vh] mt-24">
            <div>
              <AboutBias />
              <AboutMis />
              <AboutHate />
            </div>
          </div>
      </div>
    </>
  );
}
