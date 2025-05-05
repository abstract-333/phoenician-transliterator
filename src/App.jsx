import React, { useState } from "react";
import { Ship } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import './App.css';
// Phoenician Mapping for English
const phnxMap = {
  a: "𐤀",
  b: "𐤁",
  g: "𐤂", 
  d: "𐤃", 
  h: "𐤄", 
  w: "𐤅", 
  z: "𐤆",
  x: "𐤇", 
  t: "𐤈", 
  y: "𐤉", 
  k: "𐤊", 
  l: "𐤋", 
  m: "𐤌", 
  n: "𐤍",
  s: "𐤎", 
  e: "𐤏", 
  p: "𐤐", 
  c: "𐤑", 
  q: "𐤒", 
  r: "𐤓", 
  sh: "𐤔",
  t2: "𐤕", 
  " ": " ", 
  i: "𐤀𐤉"
};

// Updated Arabic-to-Phoenician mapping including غ (ghain)
const arabicPhnxMap = {
  "ا": "𐤀", 
  "ب": "𐤁", 
  "ج": "𐤂", 
  "د": "𐤃", 
  "ه": "𐤄", 
  "و": "𐤅", 
  "ز": "𐤆",
  "ش": "𐤔", 
  "ط": "𐤈", 
  "ي": "𐤉", 
  "ك": "𐤊", 
  "ل": "𐤋", 
  "م": "𐤌", 
  "ن": "𐤍",
  "س": "𐤎", 
  "ع": "𐤏", 
  "ف": "𐤐", 
  "ق": "𐤒", 
  "ر": "𐤓", 
  "ص": "𐤔", 
  "ة": "𐤕",
  "ت": "𐤕", 
  "غ": "𐤖", 
  "ث" :"𐤕", 
  "ض" : "𐤔",  
  "أ": "𐤀", 
  " " :" ", 
  "ح": "𐤇", 
  "خ" :"𐤇",  
  "ذ": "𐤃", 
  "ظ": "𐤈", 
  "إ":"𐤀",
};

// Function to transliterate English to Phoenician
function transliterateToPhoenician(text) {
  return text
    .toLowerCase()
    .replace(/sh/g, phnxMap.sh) // Replace digraphs first
    .split("")
    .map((char) => {
      if (char === "t") return phnxMap.t2; // Handle duplicate letters like "t"
      return phnxMap[char] || char;
    })
    .join("");
}

// Function to transliterate Arabic to Phoenician
function transliterateArabicToPhoenician(text) {
  return text
    .split("")
    .map((char) => arabicPhnxMap[char] || char) // Apply Arabic to Phoenician map
    .join("");
}

// Language detection function (detects Arabic or English based on character set)
function detectLanguage(text) {
  const arabicRegex = /[\u0600-\u06FF]/; // Regex to detect Arabic characters
  const englishRegex = /^[a-zA-Z\s]*$/; // Regex to detect English characters
  if (arabicRegex.test(text) && englishRegex.test(text)) {
    return "mixed"; // Mixed language (Arabic + English)
  } else if (arabicRegex.test(text)) {
    return "arabic";
  } else if (englishRegex.test(text)) {
    return "english";
  }
  return null; // If neither language is detected
}

export default function PhoenicianTransliterator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState(null); // Track detected language

  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    // Detect the language while typing
    const detectedLanguage = detectLanguage(text);
    setLanguage(detectedLanguage);

    if (detectedLanguage === "mixed") {
      alert("You cannot mix Arabic and English in the input.");
      setInputText(""); // Clear the input if mixed languages are detected
      setOutputText(""); // Clear the output
      return; // Stop further processing
    }

    // Prevent other languages (non-English, non-Arabic)
    if (detectedLanguage === null) {
      alert("Only Arabic and English text is supported for transliteration.");
      setInputText(""); // Clear the input if invalid characters are detected
      setOutputText(""); // Clear the output
      return; // Stop further processing
    }

    let transliterated = "";
    if (detectedLanguage === "arabic") {
      transliterated = transliterateArabicToPhoenician(text);
    } else if (detectedLanguage === "english") {
      transliterated = transliterateToPhoenician(text);
    }

    setOutputText(transliterated);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-800 p-8 relative overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('/images/waves.svg')] opacity-10 bg-cover bg-no-repeat pointer-events-none" /> */}
      <header className="text-center mb-10">
        <Ship className="mx-auto text-[#990024] w-10 h-10 mb-2" />
        <h1 className="text-5xl font-bold text-[#990024] tracking-wide">
          Phoenician Transliteration Tool
        </h1>
        <p className="text-md mt-2 text-[#5a4b3c] italic">
          Sail into the past – Explore the script of a seafaring civilization
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card className="bg-[#fefcf9]/90 shadow-2xl rounded-2xl border-[1px] border-[#d9cdb3]">
          <CardContent className="p-6">
            <label className="block text-lg font-semibold mb-2 text-[#5b4737]">
              Enter Text (English or Arabic):
            </label>
            <Textarea
              rows={6}
              placeholder="Type your message for the ancients..."
              value={inputText}
              onChange={handleTextChange}
              className="rounded-xl border border-gray-300 bg-[#FFFFFF] text-[#3e342b]"
              style={{ direction: language === "arabic" ? "rtl" : "ltr" }} // Set direction based on language
            />
          </CardContent>
        </Card>

        <Card className="bg-[#fefcf9]/90 shadow-2xl rounded-2xl border-[1px] border-[#d9cdb3]">
          <CardContent className="p-6">
            <label className="block text-lg font-semibold mb-2 text-[#5b4737]">
              Phoenician Transliteration:
            </label>
            <div
  className="min-h-[8rem] border border-gray-300 rounded-xl p-4 text-3xl font-[serif] bg-[#FFFFFF] text-[#990024] tracking-wider break-words whitespace-pre-wrap overflow-auto"              style={{ direction: "rtl" }} // Set direction for output
            >
              {outputText ? (
                <>
                  {outputText}
                  
                </>
              ) : (
                "𐤀𐤁𐤂𐤃" // Default display for when there's no transliteration
              )
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center text-sm text-[#5a4b3c] italic">
        Crafted with reverence for the Phoenician legacy — From the shores of Byblos to your screen.
      </footer>

      {/* Spoiler for explaining transliteration */}
      <details className="mt-10 text-center">
        <summary className="cursor-pointer text-[#990024] text-lg">What is Transliteration?</summary>
        <p className="text-[#5a4b3c] mt-2">
          This tool provides a transliteration of text from English or Arabic into Phoenician script. Transliteration is the process of mapping the sounds of one language's letters into the script of another. It is not translation. For example, "John" in English may be transliterated to "جون" in Arabic and to "𐤉𐤏𐤍" in Phoenician.
        </p>
      </details>

      <details className="mt-6 text-center">
        <summary className="cursor-pointer text-[#990024] text-lg">Why Tyrian Purple?</summary>
        <p className="text-[#5a4b3c] mt-2">
          Tyrian Purple, also known as Royal Purple, was a rare and highly valued dye made from sea snails by the ancient Phoenicians. It became a symbol of power and nobility due to its vivid hue and cost of production. This tool uses the color #990024 — a modern nod to that legendary dye — to honor the cultural and historical legacy of the Phoenician civilization.
          <br />
          <a href="https://en.wikipedia.org/wiki/Tyrian_purple" target="_blank" rel="noopener noreferrer" className="text-[#990024] underline">
            Learn more about Tyrian Purple →
          </a>
        </p>
      </details>
      
      <br/>

      <div className="mt-2 text-center text-xs text-gray-500">
        Made with ❤️ by <a href="https://github.com/abstract-333" target="_blank" rel="noopener noreferrer">
          Bashar Hasan (abstract-333)
        </a> 
      </div>
      <div className="mt-2 text-center text-xs text-gray-500">
        © 2025 All rights reserved.
      </div>
    </div>
  );
}
