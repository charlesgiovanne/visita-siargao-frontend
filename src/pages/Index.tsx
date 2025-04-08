import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Video Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Video element with proper responsive styling */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative h-full w-full overflow-hidden">
            <video
              className="absolute h-full w-full object-cover"
              style={{ objectPosition: 'center center' }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/videos/Wake_Up_in_SIARGAO_Philippines_Tourism_Ad-n5f7pi0JDCo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"></div>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-8 md:py-0">
        {/* Left: Title & Paragraph */}
        <div className="md:w-2/3 text-left text-white pt-20 md:pt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gradient-text">
            Siargao
          </h1>
          <p className="text-base sm:text-lg md:text-xl mt-4 max-w-xl mt-2">
            Discover the surfing paradise of the Philippines with pristine beaches, crystal clear waters, and unforgettable experiences.
          </p>
          
          {/* Social proof */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br from-green-${400 + i*100} to-cyan-${400 + i*100}`}></div>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm text-white/80">Join 10k+ travelers exploring Siargao</p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="mt-10 md:mt-0 flex flex-col items-center gap-4 text-center">
          {/* Primary Action - Discover More */}
          <Link
            to="/discover"
            className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white 
                      bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg shadow-lg transition-all 
                      duration-300 hover:shadow-xl hover:scale-105"
          >
            Discover More 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Secondary Action - View Travel Guide */}
          <Link 
            to="/guide" 
            className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white 
                      bg-transparent border border-white rounded-lg shadow-lg transition-all 
                      duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-cyan-500 
                      hover:shadow-xl hover:scale-105"
          >
            View Travel Guide
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <div className="md:hidden pb-6"></div>
        </div>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-center justify-center">
          <div className="w-1.5 h-3 bg-white/80 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
