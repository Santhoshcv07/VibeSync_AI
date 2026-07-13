export function PlatformRow() {
  return (
    <section className="w-full py-12 border-t border-white/5 bg-[#090314]/50 backdrop-blur-sm relative z-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          <p className="text-[13px] font-medium text-white/50 tracking-wide">Loved by users. Trusted by millions.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16 opacity-60 hover:opacity-80 transition-opacity duration-500">
            {/* Spotify */}
            <div className="flex items-center gap-2 text-white">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              <span className="font-bold text-[24px] tracking-tight mt-0.5">Spotify</span>
            </div>

            {/* Netflix */}
            <div className="flex items-center text-white">
              <span className="font-bold text-[28px] tracking-tighter transform scale-y-[1.15]">NETFLIX</span>
            </div>

            {/* YouTube */}
            <div className="flex items-center gap-1.5 text-white">
              <svg className="w-[30px] h-[30px]" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="font-bold text-[24px] tracking-tighter mt-0.5 ml-0.5">YouTube</span>
            </div>

            {/* Pinterest */}
            <div className="flex items-center gap-1.5 text-white">
              <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.622 0 12.017 0z"/></svg>
              <span className="font-bold text-[24px] tracking-tight mt-0.5 ml-0.5">Pinterest</span>
            </div>

            {/* Google Books */}
            <div className="flex items-center text-white">
              <span className="text-[23px] font-normal tracking-tight mt-0.5"><span className="font-semibold tracking-normal">Google</span> Books</span>
            </div>

            {/* Goodreads */}
            <div className="flex items-center text-white">
              <span className="text-[26px] font-serif tracking-tight lowercase mt-0.5">goodreads</span>
            </div>

            {/* Amazon */}
            <div className="flex items-center text-white relative">
              <span className="text-[26px] font-bold tracking-tighter lowercase mt-0.5">amazon</span>
              <svg className="absolute -bottom-[2px] left-[5%] w-[85%] h-[12px] text-white" viewBox="0 0 100 20" fill="currentColor">
                <path d="M 0 10 C 30 25, 70 25, 95 5 C 70 18, 30 18, 0 10 Z" />
                <polygon points="90,0 100,5 92,12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
