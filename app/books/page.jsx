"use client";
import { ChevronLeft } from "lucide-react";
import { wordsData } from "../../utils/wordsData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Books = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="min-h-screen relative p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-medium group transition-all cursor-pointer">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Choose Your Level
          </h1>
          <p className="text-white/60 text-lg">
            Select a book to start your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wordsData.map((book) => (
            <button
              key={book.book}
              onClick={() => router.push(`/units/${book.book}`)}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 text-left cursor-pointer">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`}></div>

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${book.color} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                  <span className="text-3xl font-bold text-white">
                    {book.book}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  Book {book.book}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${book.color} text-white text-sm font-semibold`}>
                    {book.level}
                  </div>
                </div>

                <p className="text-white/50 text-sm mb-6">
                  30 Units • 900 Words
                </p>

                <div className="flex items-center gap-2 text-white/70 group-hover:text-white group-hover:gap-4 transition-all font-medium">
                  <span>Explore Units</span>
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
