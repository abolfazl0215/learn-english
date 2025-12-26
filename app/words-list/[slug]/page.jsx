"use client";
import React, { useMemo } from "react";
import { wordsData } from "../../../utils/wordsData";
import { ChevronLeft, Volume2 } from "lucide-react";
import { speakText } from "../../../utils/speakText";
import Link from "next/link";

const WordsList = ({ params }) => {
  const { slug } = React.use(params);

  // ✅ استفاده از useMemo برای محاسبات سنگین
  const { book, unit, unitIndex, bookNumber } = useMemo(() => {
    const [unitName, bookNum] = slug.split("-");
    const foundBook = wordsData.find((b) => +b.book === +bookNum);
    const foundUnitIndex = foundBook?.units.findIndex(
      (u) => u.name === unitName,
    );
    const foundUnit = foundBook?.units[foundUnitIndex];

    return {
      book: foundBook,
      unit: foundUnit,
      unitIndex: foundUnitIndex,
      bookNumber: bookNum,
    };
  }, [slug]);

  return (
    <div className="min-h-screen relative p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* ✅ استفاده از Link به جای button + router.push */}
        <Link
          href={`/units/${bookNumber}`}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-medium group transition-all cursor-pointer">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Units
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${book?.color} text-white text-sm font-semibold`}>
              Book {bookNumber}
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold border border-white/20">
              Unit {unitIndex + 1}
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Vocabulary List
          </h1>
          <p className="text-white/60 text-lg">
            {unit?.words?.length} words to master
          </p>
        </div>

        <div className="grid gap-3">
          {unit?.words?.map((wordObj, index) => (
            <Link
              key={index}
              href={`/word-detail/${bookNumber}-${unitIndex}-${index}`}
              prefetch={true}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${book?.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-bold text-white mb-1">
                      {wordObj.word}
                    </div>
                    {wordObj.phonetic && (
                      <div className="text-sm text-white/40">
                        {wordObj.phonetic}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // ✅ جلوگیری از trigger شدن Link
                      e.stopPropagation();
                      speakText(wordObj.word);
                    }}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group/speaker cursor-pointer">
                    <Volume2 className="w-5 h-5 text-white group-hover/speaker:scale-110 transition-transform" />
                  </button>
                  <ChevronLeft className="w-5 h-5 text-white/40 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordsList;
