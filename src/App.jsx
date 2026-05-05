import { useState, useMemo } from "react";
import { Search, Gamepad2, X, Maximize2, Monitor, LayoutGrid, Info, ArrowLeft, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gamesData from "./data/games.json";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGame, setSelectedGame] = useState(null);

  const toggleFullscreen = () => {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  const categories = useMemo(() => {
    const cats = gamesData.map((g) => g.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-primary overflow-hidden relative">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-10" />

      {/* Navbar / Header */}
      <header className="flex items-end justify-between px-10 pt-10 pb-6 border-b border-border bg-primary z-20 sticky top-0">
        <div className="cursor-pointer" onClick={() => setSelectedGame(null)}>
          <h1 className="text-8xl font-black tracking-tighter leading-none m-0 flex items-baseline">
            UNBLOCKED<span className="text-accent">.</span>HUB
          </h1>
          <p className="text-zinc-500 font-mono text-xs tracking-[0.3em] uppercase mt-4">
            System Status: Online // {new Date().toLocaleDateString().replace(/\//g, '.')}
          </p>
        </div>

        <div className="flex-1 max-w-lg mx-auto px-10 hidden xl:block">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
            <input
              type="text"
              placeholder="SEARCH_GAME_PROTOCOL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-border py-4 pl-10 font-mono text-sm focus:outline-none focus:border-accent transition-all placeholder:text-white/10 uppercase font-bold tracking-widest"
            />
          </div>
        </div>

        <div className="flex gap-12 mb-2">
          <div className="text-right">
            <span className="block text-zinc-600 text-[10px] uppercase font-black tracking-widest">Active nodes</span>
            <span className="text-3xl font-black italic">{gamesData.length}</span>
          </div>
          <div className="text-right">
            <span className="block text-zinc-600 text-[10px] uppercase font-black tracking-widest">Library status</span>
            <span className="text-3xl font-black italic underline decoration-accent underline-offset-8">STABLE</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-80 border-r border-border bg-primary hidden lg:flex flex-col z-10 shrink-0">
          <nav className="p-10 space-y-8">
            <ul className="space-y-8">
              {categories.map((cat, idx) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`group flex flex-col items-start text-left w-full transition-all ${
                      selectedCategory === cat ? "text-accent" : "text-white"
                    }`}
                  >
                    <span className="text-zinc-600 font-mono text-[10px] tracking-widest group-hover:text-accent/50 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-5xl font-black italic uppercase transition-all tracking-tighter ${
                      selectedCategory === cat ? "translate-x-2" : "group-hover:translate-x-2"
                    }`}>
                      {cat}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto p-8">
            <div className="bg-surface p-6 border border-border">
              <p className="text-[10px] font-mono text-zinc-500 uppercase leading-relaxed tracking-wider">
                Local storage initialized...<br />
                JSON manifest loaded...<br />
                Sandboxed environment active.<br />
                Ready for user input.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-10 relative">
          <AnimatePresence mode="wait">
            {!selectedGame ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-7xl mx-auto"
              >
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-4">
                      {selectedCategory}
                      <span className="text-accent text-lg font-mono">[{filteredGames.length}]</span>
                    </h2>
                    <div className="h-1 w-20 bg-accent rounded-full mb-4 shadow-[0_0_10px_rgba(0,255,0,0.5)]" />
                    <p className="text-white/40 font-mono text-sm italic tracking-wide">
                      // Initialize game protocols and select a module.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-surface border border-border rounded-lg text-white/60">
                      <LayoutGrid size={18} />
                    </button>
                  </div>
                </div>

                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map((game, index) => (
                      <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        onClick={() => setSelectedGame(game)}
                        className="relative group cursor-pointer border-2 border-zinc-800 hover:border-white transition-all bg-zinc-900 overflow-hidden aspect-[4/5] flex flex-col"
                      >
                        <div className="absolute top-3 left-3 z-10 bg-white text-black px-2 py-1 font-black text-[10px] italic uppercase tracking-widest group-hover:bg-accent group-hover:text-white transition-colors">
                          Iframe Ready
                        </div>
                        
                        <div className="flex-1 relative overflow-hidden bg-zinc-950">
                          <img 
                            src={game.thumbnail} 
                            alt={game.title} 
                            className="w-full h-full object-cover opacity-10 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        <div className="p-8 pt-0 z-10">
                          <span className="text-zinc-600 font-mono text-xs mb-2 block uppercase tracking-tighter font-black">
                            id: {game.id.padStart(3, '0')}-{game.category.toLowerCase().slice(0, 3)}
                          </span>
                          <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter group-hover:text-accent transition-colors break-words">
                            {game.title.split(' ').map((word, i) => (
                              <span key={i} className="block">{word}</span>
                            ))}
                          </h2>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Placeholder Card */}
                    <div className="relative border-2 border-dashed border-zinc-800 bg-transparent flex items-center justify-center aspect-[4/5]">
                      <div className="text-center p-6">
                        <span className="text-zinc-800 font-black text-6xl uppercase tracking-tighter leading-none block">
                          MORE<br />COMING
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Search size={48} className="text-white/10 mb-4" />
                    <h3 className="text-xl font-mono text-white/40">NO RESULTS FOUND</h3>
                    <p className="text-sm text-white/20 font-mono mt-2 uppercase tracking-widest">Query returned zero modules.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3 italic">
                        {selectedGame.title}
                        <span className="text-xs font-mono py-1 px-2 bg-white/5 border border-white/10 rounded text-accent uppercase tracking-widest not-italic">
                          {selectedGame.category}
                        </span>
                      </h2>
                      <p className="text-white/40 text-xs font-mono uppercase tracking-widest mt-1">Executing Game Module Protocol...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={toggleFullscreen}
                      className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-white/5 border border-border rounded-lg text-white/60 hover:text-white transition-all text-sm font-mono tracking-widest"
                    >
                      <Maximize2 size={16} />
                      FULLSCREEN
                    </button>
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="p-2 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent hover:text-primary transition-all shadow-lg shadow-accent/5"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-black rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl">
                  <iframe 
                    src={selectedGame.iframeUrl} 
                    className="w-full h-full border-none shadow-inner"
                    title={selectedGame.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 m-2 rounded-tl-lg pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/40 m-2 rounded-br-lg pointer-events-none" />
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">Game Intelligence</h4>
                    <p className="text-white/70 leading-relaxed italic">{selectedGame.description}</p>
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5 font-mono text-[10px] tracking-widest text-white/30 uppercase">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded">
                        <Monitor size={14} className="text-accent" />
                        Optimization: High
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded">
                        <Gamepad2 size={14} className="text-accent" />
                        Inputs: Mouse/Keyboard
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface/30 border border-white/5 p-6 rounded-2xl">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">Related Simulations</h4>
                    <div className="space-y-4">
                      {gamesData
                        .filter(g => g.id !== selectedGame.id && g.category === selectedGame.category)
                        .slice(0, 2)
                        .map(g => (
                          <div 
                            key={g.id} 
                            onClick={() => setSelectedGame(g)}
                            className="flex items-center gap-4 group cursor-pointer"
                          >
                            <img src={g.thumbnail} className="w-16 h-16 rounded-lg object-cover opacity-60 group-hover:opacity-100 transition-opacity border border-white/5" alt={g.title} />
                            <div>
                              <h5 className="text-sm font-bold group-hover:text-accent transition-colors">{g.title}</h5>
                              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-mono">{g.category}</p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer / Status Bar */}
      <footer className="h-14 bg-zinc-100 text-black flex items-center px-10 justify-between z-20 shrink-0 font-black">
        <div className="flex items-center gap-10">
          <span className="text-[10px] uppercase tracking-widest flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.5)]"></span> 
            SYSTEM CORE ONLINE
          </span>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400">
            Region: GLOBAL-AIS-01
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs hover:bg-accent cursor-pointer transition-colors">A</div>
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs underline underline-offset-2 hover:bg-accent cursor-pointer transition-colors">B</div>
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs hover:bg-accent cursor-pointer transition-colors">X</div>
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs hover:bg-accent cursor-pointer transition-colors">Y</div>
        </div>
        <div className="hidden md:block text-[10px] uppercase tracking-widest italic">
          Build 5.5.02 // Unblocked Engine
        </div>
      </footer>
    </div>
  );
}
