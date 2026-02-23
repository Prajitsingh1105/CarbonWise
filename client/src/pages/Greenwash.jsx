import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const Greenwashing = () => {
  const [claim, setClaim] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const highlightKeywords = (text, keywords = []) => {
    let highlighted = text;

    keywords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlighted = highlighted.replace(
        regex,
        '<span class="text-red-400 font-bold">$1</span>'
      );
    });

    return highlighted;
  };

  const handleAnalyze = async () => {
    if (!claim.trim()) {
      setError("Please enter a marketing claim.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post("http://localhost:5000/api/ai", {
        marketingClaim: claim,
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("AI analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Greenwashing Detection
      </h1>

      <motion.div
        className="p-6 mb-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <textarea
          className="w-full p-4 rounded-xl bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={4}
          placeholder="Enter a marketing claim to analyze..."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        ></textarea>

        <button
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl shadow-md text-white font-semibold transition transform hover:scale-105"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Claim"}
        </button>

        {error && (
          <p className="mt-2 text-red-400 font-semibold">{error}</p>
        )}
      </motion.div>

      {result && (
        <motion.div
          className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Claim:</h3>
            <p
              className="text-black italic"
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(
                  claim,
                  result.detectedKeywords
                ),
              }}
            ></p>
          </div>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center">
              <CountUp
                start={0}
                end={result.confidenceScore || 0}
                duration={1.5}
                suffix="%"
                className="text-3xl font-bold text-green-400"
              />
            </div>
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                result.warning ? "bg-red-600" : "bg-green-500"
              }`}
            >
              {result.warning ? " High Risk" : " Low Risk"}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-1">Explanation:</h3>
            <p className="text-black">{result.explanation}</p>
          </div>

          {result.rawAI && (
            <div className="mt-4 p-4 bg-gray-200/50 rounded-lg text-sm">
              <h4 className="font-semibold mb-1">Raw AI Output:</h4>
              <pre className="whitespace-pre-wrap">{result.rawAI}</pre>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Greenwashing;