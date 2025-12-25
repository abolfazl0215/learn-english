"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { wordsData } from "../../../utils/wordsData";
import { ChevronLeft } from "lucide-react";

const Units = ({ params }) => {
  const bookNumber = React.use(params).slug;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const router = useRouter();

  const book = wordsData.find((b) => +b.book === +bookNumber);
  if (!book) {
    return <div>Book not found{bookNumber}</div>;
  }

  return (
    <div className="min-h-screen relative p-4 py-8">

      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.push("/books")}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-8 font-medium group transition-all  cursor-pointer">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Books
        </button>

        <div className="mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${book.color} text-white text-sm font-semibold mb-4`}>
            Level {book.level}
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Book {bookNumber}
          </h1>
          <p className="text-white/60 text-lg">
            Select a unit to begin learning
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {book.units.map((unit, index) => (
            <button
              key={index}
              onClick={() =>
                router.push(`/words-list/${unit.name}-${bookNumber}`)
              }
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${book.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>

              <div className="relative z-10">
                <div className="text-3xl font-bold text-white mb-2">
                  {index + 1}
                </div>
                <div className="text-white/50 text-sm font-medium">
                  Unit
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Units;
