"use client";
import React, { useState, useMemo, useCallback } from "react";
import { wordsData } from "../../../utils/wordsData";
import { ChevronLeft, Volume2, Check } from "lucide-react";
import { speakText } from "../../../utils/speakText";
import Link from "next/link";

const WordDetailPage = ({ params }) => {
  const { slug } = React.use(params);

  // ✅ Parse params با useMemo
  const { bookNumber, unitIndex, initialWordIndex } = useMemo(() => {
    const [bookNum, unitIdx, wordIdx] = slug.split("-");
    return {
      bookNumber: bookNum,
      unitIndex: +unitIdx,
      initialWordIndex: wordIdx ? +wordIdx : 0,
    };
  }, [slug]);

  const [wordIndex, setWordIndex] = useState(initialWordIndex);
  const [activeTab, setActiveTab] = useState("examples");
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ محاسبات سنگین با useMemo
  const { book, unit, wordObj, totalWords } = useMemo(() => {
    const foundBook = wordsData.find((b) => +b.book === +bookNumber);
    const foundUnit = foundBook?.units[unitIndex];
    const foundWord = foundUnit?.words[wordIndex];
    const total = foundUnit?.words?.length || 0;

    return {
      book: foundBook,
      unit: foundUnit,
      wordObj: foundWord,
      totalWords: total,
    };
  }, [bookNumber, unitIndex, wordIndex]);

  // ✅ استفاده از useCallback برای function optimization
  const toggleAnswer = useCallback((qIndex) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex],
    }));
  }, []);

  const playAudio = useCallback((text) => {
    setIsPlaying(true);
    speakText(text);
    setTimeout(() => setIsPlaying(false), 1000);
  }, []);

  const goToNext = useCallback(() => {
    if (wordIndex < totalWords - 1) {
      setWordIndex(wordIndex + 1);
      setVisibleAnswers({});
      setActiveTab("examples");
    }
  }, [wordIndex, totalWords]);

  const goToPrev = useCallback(() => {
    if (wordIndex > 0) {
      setWordIndex(wordIndex - 1);
      setVisibleAnswers({});
      setActiveTab("examples");
    }
  }, [wordIndex]);

  return (
    <div className="min-h-screen relative p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* ✅ حذف onClick و state اضافی */}
        <Link
          href={`/words-list/${unit?.name}-${bookNumber}`}
          prefetch={true}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-medium group transition-all cursor-pointer">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to List
        </Link>

        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden mb-6">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${book?.color} opacity-5`}></div>

          <div className="relative z-10 p-3 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${book?.color} text-white text-sm font-semibold`}>
                  Book {bookNumber} • Unit {unitIndex + 1}
                </div>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold border border-white/20">
                {wordIndex + 1} / {totalWords}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between md:justify-center gap-6 mb-8">
              <div className="md:text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
                  {wordObj?.word}
                </h1>
                {wordObj?.phonetic && (
                  <div className="text-xl text-white/40 mb-4">
                    {wordObj?.phonetic}
                  </div>
                )}
              </div>
              <button
                onClick={() => playAudio(wordObj?.word)}
                className={`p-5 rounded-2xl bg-gradient-to-br ${
                  book?.color
                } hover:scale-110 transition-all shadow-lg hover:shadow-xl cursor-pointer ${
                  isPlaying ? "scale-110" : ""
                }`}>
                <Volume2 className="w-8 h-8 text-white" />
              </button>
            </div>

            <div className="flex gap-2 mb-8 bg-white/5 rounded-2xl p-2">
              <button
                onClick={() => setActiveTab("examples")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "examples"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/50 hover:text-white/80"
                }`}>
                Examples
              </button>
              <button
                onClick={() => setActiveTab("questions")}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === "questions"
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/50 hover:text-white/80"
                }`}>
                Practice
              </button>
            </div>

            <div className="min-h-[300px]">
              {activeTab === "examples" && (
                <div className="space-y-4">
                  {wordObj?.examples?.map((example, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 py-6 md:p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="text-white/90 text-lg leading-relaxed">
                            {example}
                          </p>
                        </div>
                        <button
                          onClick={() => playAudio(example)}
                          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex-shrink-0 cursor-pointer">
                          <Volume2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "questions" && (
                <div className="space-y-6">
                  {wordObj?.questions?.map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 py-6 md:p-6 border border-white/10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-1">
                          <p className="text-white font-semibold text-lg mb-2">
                            {q?.question}
                          </p>
                        </div>
                        <button
                          onClick={() => playAudio(q?.question)}
                          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex-shrink-0 cursor-pointer">
                          <Volume2 className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleAnswer(idx)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all mb-4 cursor-pointer ${
                          visibleAnswers[idx]
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/15"
                        }`}>
                        {visibleAnswers[idx]
                          ? "Hide Answers"
                          : "Show Answers"}
                      </button>

                      {visibleAnswers[idx] && (
                        <div className="space-y-3 pl-2.5 md:pl-4 border-l-2 border-white/20">
                          {q.answers.map((answer, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-3 bg-white/5 rounded-xl p-3 md:p-4">
                              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <p className="text-white/80 flex-1">
                                {answer}
                              </p>
                              <button
                                onClick={() => playAudio(answer)}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all flex-shrink-0 cursor-pointer">
                                <Volume2 className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={goToPrev}
            disabled={wordIndex === 0}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all ${
              wordIndex === 0
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/10 cursor-pointer"
            }`}>
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          <button
            onClick={goToNext}
            disabled={wordIndex === totalWords - 1}
            className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all ${
              wordIndex === totalWords - 1
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : `bg-gradient-to-r ${book?.color} hover:shadow-xl text-white cursor-pointer`
            }`}>
            Next
            <ChevronLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordDetailPage;
