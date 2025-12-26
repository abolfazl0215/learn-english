import {
  ChevronLeft,
  BookOpen,
  Sparkles,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm font-medium">
              Master English Vocabulary
            </span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Learn English
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              The Smart Way
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Build your vocabulary with structured learning paths and
            interactive exercises
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 transition-all duration-300 cursor-not-allowed opacity-60">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Grammar
              </h3>
              <p className="text-white/50 mb-4">
                Master English grammar rules and structures
              </p>
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/books"
            prefetch={true}
            className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            <div className="relative z-10 text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform group-hover:rotate-3">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                4000 Essential Words
              </h3>
              <p className="text-white/70 mb-6">
                Learn the most important words in English through 6
                levels
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-4 transition-all">
                <span>Start Learning</span>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <>
      <HomePage />
    </>
  );
}
