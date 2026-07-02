import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  FaPlay, 
  FaPlus, 
  FaCheck, 
  FaInfoCircle, 
  FaSearch, 
  FaBell, 
  FaVolumeMute, 
  FaVolumeUp, 
  FaTimes, 
  FaThumbsUp, 
  FaRegThumbsUp, 
  FaChevronLeft, 
  FaChevronRight,
  FaChevronDown,
  FaSignOutAlt
} from "react-icons/fa";

// Import local assets
import trend1 from "../assets/trend1.webp";
import trend2 from "../assets/trend2.webp";
import trend3 from "../assets/trend3.webp";
import trend4 from "../assets/trend4.webp";

function Browse() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playingMovie, setPlayingMovie] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize My List from local storage
  const [myList, setMyList] = useState(() => {
    try {
      const saved = localStorage.getItem("netflix-mylist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save My List to local storage
  useEffect(() => {
    localStorage.setItem("netflix-mylist", JSON.stringify(myList));
  }, [myList]);

  // Track window scroll to toggle solid navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock Movie Database
  const moviesDatabase = [
    {
      id: "wednesday",
      title: "Wednesday",
      backdrop: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
      cast: "Jenna Ortega, Gwendoline Christie, Riki Lindhome, Jamie McShane",
      genres: ["Dark", "Fantasy", "Mystery", "Teen Drama"],
      matchScore: 98,
      rating: "TV-14",
      year: 2022,
      duration: "1 Season",
      category: "Trending"
    },
    {
      id: "stranger-things",
      title: "Stranger Things",
      backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      cast: "Winona Ryder, David Harbour, Millie Bobby Brown, Finn Wolfhard",
      genres: ["Sci-Fi", "Horror", "Drama", "Nostalgia"],
      matchScore: 97,
      rating: "TV-14",
      year: 2022,
      duration: "4 Seasons",
      category: "Popular"
    },
    {
      id: "extraction-2",
      title: "Extraction 2",
      backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission: extracting the battered family of a ruthless Georgian gangster.",
      cast: "Chris Hemsworth, Golshifteh Farahani, Tornike Gogrichiani",
      genres: ["Explosive", "Action Thriller", "Suspenseful"],
      matchScore: 95,
      rating: "R",
      year: 2023,
      duration: "2h 3m",
      category: "Action"
    },
    {
      id: "the-witcher",
      title: "The Witcher",
      backdrop: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
      cast: "Henry Cavill, Anya Chalotra, Freya Allan",
      genres: ["Fantasy", "Sword & Sorcery", "Action-Adventure"],
      matchScore: 94,
      rating: "TV-MA",
      year: 2023,
      duration: "3 Seasons",
      category: "Popular"
    },
    {
      id: "red-notice",
      title: "Red Notice",
      backdrop: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "An FBI profiler pursuing the world's most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who's always one step ahead.",
      cast: "Dwayne Johnson, Ryan Reynolds, Gal Gadot",
      genres: ["Witty", "Buddy Comedy", "Action-Adventure"],
      matchScore: 92,
      rating: "PG-13",
      year: 2021,
      duration: "1h 57m",
      category: "Comedy"
    },
    {
      id: "our-planet",
      title: "Our Planet",
      backdrop: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1472214222541-d510753a4707?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "Experience our planet's natural beauty and examine how climate change impacts all living creatures in this ambitious documentary of spectacular scope.",
      cast: "David Attenborough",
      genres: ["Nature", "Science & Tech", "Inspiring"],
      matchScore: 99,
      rating: "TV-G",
      year: 2019,
      duration: "2 Seasons",
      category: "Documentary"
    },
    {
      id: "squid-game",
      title: "Squid Game",
      backdrop: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
      cast: "Lee Jung-jae, Park Hae-soo, Wi Ha-jun",
      genres: ["Suspenseful", "Thriller", "Drama"],
      matchScore: 96,
      rating: "TV-MA",
      year: 2021,
      duration: "1 Season",
      category: "Trending"
    },
    {
      id: "glass-onion",
      title: "Glass Onion: A Knives Out Mystery",
      backdrop: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description: "World-famous detective Benoit Blanc heads to Greece to peel back the layers of a mystery involving a tech billionaire and his eclectic crew of friends.",
      cast: "Daniel Craig, Edward Norton, Janelle Monáe, Kate Hudson",
      genres: ["Satirical", "Mystery", "Comedy"],
      matchScore: 91,
      rating: "PG-13",
      year: 2022,
      duration: "2h 19m",
      category: "Comedy"
    },
    {
      id: "formula-1",
      title: "Formula 1: Drive to Survive",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description: "Drivers, managers and team owners live life in the fast lane — both on and off the track. Experience the drama, adrenaline and rivalries of Formula 1 racing.",
      cast: "Lewis Hamilton, Max Verstappen, Daniel Ricciardo",
      genres: ["Sports", "Exciting", "Docuseries"],
      matchScore: 95,
      rating: "TV-MA",
      year: 2024,
      duration: "6 Seasons",
      category: "Documentary"
    },
    {
      id: "the-gray-man",
      title: "The Gray Man",
      backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1608889174636-9d33b5c775d7?q=80&w=400",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "When a shadowy CIA agent uncovers agency secrets, he becomes the target of a rogue, sociopathic former colleague who puts a bounty on his head.",
      cast: "Ryan Gosling, Chris Evans, Ana de Armas",
      genres: ["Action Thriller", "Fast-Paced", "Slick"],
      matchScore: 93,
      rating: "PG-13",
      year: 2022,
      duration: "2h 2m",
      category: "Action"
    },
    {
      id: "avatar-water",
      title: "Avatar: The Way of Water",
      backdrop: trend1,
      thumbnail: trend1,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race.",
      cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
      genres: ["Sci-Fi", "Action", "Visual Spectacle"],
      matchScore: 97,
      rating: "PG-13",
      year: 2022,
      duration: "3h 12m",
      category: "Trending"
    },
    {
      id: "leo",
      title: "Leo",
      backdrop: trend2,
      thumbnail: trend2,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      description: "A mild-mannered cafe owner becomes a local hero, but old secrets resurface when gangsters from his past claim he is their long-lost brother.",
      cast: "Vijay, Sanjay Dutt, Arjun Sarja",
      genres: ["Gory", "Action", "Thriller"],
      matchScore: 94,
      rating: "R",
      year: 2023,
      duration: "2h 44m",
      category: "Popular"
    },
    {
      id: "the-archies",
      title: "The Archies",
      backdrop: trend3,
      thumbnail: trend3,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description: "In 1960s India, Archie and the gang navigate romance, friendship and the future of Riverdale when developers threaten a beloved park.",
      cast: "Agastya Nanda, Khushi Kapoor, Suhana Khan",
      genres: ["Musical", "Heartfelt", "Nostalgic"],
      matchScore: 88,
      rating: "TV-PG",
      year: 2023,
      duration: "2h 23m",
      category: "Comedy"
    },
    {
      id: "leave-world-behind",
      title: "Leave the World Behind",
      backdrop: trend4,
      thumbnail: trend4,
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description: "A family's getaway to a luxurious rental home takes an ominous turn when a cyberattack knocks out their devices — and two strangers appear at their door.",
      cast: "Julia Roberts, Ethan Hawke, Mahershala Ali",
      genres: ["Dystopian", "Thriller", "Suspenseful"],
      matchScore: 92,
      rating: "R",
      year: 2023,
      duration: "2h 21m",
      category: "Trending"
    }
  ];

  // Featured Movie for the Big Hero Banner
  const featuredMovie = moviesDatabase[0]; // "Wednesday"

  // Toggle dynamic movie adding/removal from My List
  const toggleMyList = (movie, e) => {
    if (e) e.stopPropagation();
    const exists = myList.find((item) => item.id === movie.id);
    if (exists) {
      setMyList(myList.filter((item) => item.id !== movie.id));
    } else {
      setMyList([...myList, movie]);
    }
  };

  const isInMyList = (movieId) => {
    return myList.some((item) => item.id === movieId);
  };

  // Search filter implementation
  const filteredMovies = moviesDatabase.filter((movie) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query) ||
      movie.genres.some((g) => g.toLowerCase().includes(query)) ||
      movie.cast.toLowerCase().includes(query)
    );
  });

  // Groups movies by specific categories
  const getMoviesByCategory = (cat) => {
    return moviesDatabase.filter((movie) => movie.category === cat);
  };

  // Safe Guard logout action
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen font-sans antialiased overflow-x-hidden select-none">
      
      {/* 1. Header/Navbar */}
      <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4 transition-colors duration-300 ${
        isScrolled ? "bg-[#141414]/95 shadow-md shadow-black/30" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
      }`}>
        <div className="flex items-center gap-10">
          {/* Netflix Logo */}
          <div className="text-3xl md:text-4xl font-extrabold tracking-tighter text-red-600 cursor-pointer transition-transform hover:scale-105" onClick={() => { setSearchQuery(""); setSearchExpanded(false); }}>
            NETFLIX
          </div>
          {/* Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 text-sm text-gray-300">
            <li className="cursor-pointer text-white font-medium hover:text-gray-300 transition-colors">Home</li>
            <li className="cursor-pointer hover:text-white transition-colors">TV Shows</li>
            <li className="cursor-pointer hover:text-white transition-colors">Movies</li>
            <li className="cursor-pointer hover:text-white transition-colors">New & Popular</li>
            <li className="cursor-pointer hover:text-white transition-colors" onClick={() => {
              if (myList.length > 0) {
                // Focus / scroll to My List row
                const element = document.getElementById("my-list-row");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }
            }}>My List</li>
          </ul>
        </div>

        {/* Right Nav Utilities */}
        <div className="flex items-center gap-5">
          {/* Search bar */}
          <div className="flex items-center gap-2 border border-transparent focus-within:border-gray-500 focus-within:bg-black/50 p-1.5 px-3 rounded transition-all duration-300">
            <FaSearch 
              className="cursor-pointer text-gray-300 hover:text-white text-lg transition-transform hover:scale-110" 
              onClick={() => setSearchExpanded(!searchExpanded)} 
            />
            <input
              type="text"
              placeholder="Titles, genres, cast..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                searchExpanded || searchQuery ? "w-40 md:w-60 opacity-100" : "w-0 opacity-0 pointer-events-none"
              }`}
            />
            {searchQuery && (
              <FaTimes 
                className="cursor-pointer text-gray-400 hover:text-white text-xs" 
                onClick={() => setSearchQuery("")} 
              />
            )}
          </div>

          <div className="text-gray-300 cursor-pointer hover:text-white relative transition-transform hover:scale-105 hidden sm:block">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] text-white font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-90"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-sm uppercase">
                {user?.email ? user.email.charAt(0) : "N"}
              </div>
              <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${profileDropdownOpen ? "rotate-180" : ""}`} />
            </div>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded bg-[#141414] border border-zinc-800 shadow-xl overflow-hidden py-1 z-50">
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <div className="px-4 py-2 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                    Manage Profiles
                  </div>
                  <div className="px-4 py-2 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                    Account Settings
                  </div>
                  <div className="px-4 py-2 hover:bg-zinc-800 text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                    Help Center
                  </div>
                </div>
                <div 
                  className="border-t border-zinc-800 py-1 hover:bg-zinc-900 cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 font-medium transition-colors"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Sign Out of Netflix
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Main Page Layout (Standard Browse Categories vs Search Grid) */}
      {searchQuery.trim().length > 0 ? (
        // Search Results State
        <div className="px-6 md:px-16 pt-28 pb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-400">
            Search results for: <span className="text-white">"{searchQuery}"</span>
          </h2>
          {filteredMovies.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">Your search for "{searchQuery}" did not have any matches.</p>
              <p className="mt-2 text-sm">Suggestions: Try a different movie title, genre, or actor name.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
              {filteredMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="group relative cursor-pointer bg-zinc-900 rounded-md overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:z-10"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img 
                    src={movie.thumbnail} 
                    alt={movie.title} 
                    className="w-full aspect-video object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="p-3">
                    <p className="text-sm font-semibold truncate group-hover:text-red-500 transition-colors">{movie.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span className="text-green-500 font-semibold">{movie.matchScore}% Match</span>
                      <span className="border border-zinc-700 px-1 rounded text-[10px]">{movie.rating}</span>
                      <span>{movie.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Standard Netflix Browse layout
        <>
          {/* 2A. Big Hero Banner */}
          <div className="relative h-[80vh] md:h-[95vh] w-full bg-black">
            {/* Background image & gradient masks */}
            <div className="absolute inset-0">
              <img 
                src={featuredMovie.backdrop} 
                alt={featuredMovie.title} 
                className="w-full h-full object-cover opacity-85"
              />
              {/* Vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/10 to-black/30"></div>
            </div>

            {/* Featured Movie details */}
            <div className="absolute bottom-16 md:bottom-28 left-6 md:left-16 max-w-2xl z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#E50914] text-white text-[11px] font-bold tracking-wider px-2 py-0.5 rounded">ORIGINAL SERIES</span>
                <span className="text-green-500 font-bold text-sm">{featuredMovie.matchScore}% Match</span>
                <span className="text-gray-300 text-sm border border-zinc-700 px-1.5 rounded">{featuredMovie.rating}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
                {featuredMovie.title}
              </h1>
              <p className="text-sm md:text-lg text-gray-200 leading-relaxed font-light drop-shadow-md max-w-xl">
                {featuredMovie.description}
              </p>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <button 
                  className="flex items-center gap-3 bg-white text-black hover:bg-white/80 font-bold px-6 py-2.5 md:px-8 md:py-3.5 rounded text-sm md:text-base cursor-pointer shadow-lg hover:scale-105 transition-all"
                  onClick={() => setPlayingMovie(featuredMovie)}
                >
                  <FaPlay className="text-black text-lg" />
                  Play
                </button>
                <button 
                  className="flex items-center gap-3 bg-gray-500/50 hover:bg-gray-500/70 text-white font-bold px-6 py-2.5 md:px-8 md:py-3.5 rounded text-sm md:text-base cursor-pointer shadow-lg hover:scale-105 transition-all backdrop-blur-sm"
                  onClick={() => setSelectedMovie(featuredMovie)}
                >
                  <FaInfoCircle className="text-white text-lg" />
                  More Info
                </button>
                <button 
                  className="ml-auto border border-gray-500 text-gray-300 hover:text-white hover:border-white h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-all bg-black/40"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <FaVolumeMute className="text-sm md:text-base" /> : <FaVolumeUp className="text-sm md:text-base" />}
                </button>
              </div>
            </div>
          </div>

          {/* 2B. Movie Rows Section */}
          <div className="relative z-10 pl-6 md:pl-16 pb-24 -mt-20 flex flex-col gap-12">
            
            {/* Dynamic "My List" Row - Only visible if there are items */}
            {myList.length > 0 && (
              <Row 
                id="my-list-row"
                title="My List" 
                movies={myList} 
                onCardClick={setSelectedMovie} 
                onPlayClick={setPlayingMovie}
                onListToggle={toggleMyList}
                isInList={isInMyList}
              />
            )}

            {/* Trending Now */}
            <Row 
              title="Trending Now" 
              movies={getMoviesByCategory("Trending")} 
              onCardClick={setSelectedMovie} 
              onPlayClick={setPlayingMovie}
              onListToggle={toggleMyList}
              isInList={isInMyList}
            />

            {/* Popular on Netflix */}
            <Row 
              title="Popular on Netflix" 
              movies={getMoviesByCategory("Popular")} 
              onCardClick={setSelectedMovie} 
              onPlayClick={setPlayingMovie}
              onListToggle={toggleMyList}
              isInList={isInMyList}
            />

            {/* Action Thrillers */}
            <Row 
              title="Action & Adventure" 
              movies={getMoviesByCategory("Action")} 
              onCardClick={setSelectedMovie} 
              onPlayClick={setPlayingMovie}
              onListToggle={toggleMyList}
              isInList={isInMyList}
            />

            {/* Comedies */}
            <Row 
              title="Comedies" 
              movies={getMoviesByCategory("Comedy")} 
              onCardClick={setSelectedMovie} 
              onPlayClick={setPlayingMovie}
              onListToggle={toggleMyList}
              isInList={isInMyList}
            />

            {/* Documentaries */}
            <Row 
              title="Award-winning Documentaries" 
              movies={getMoviesByCategory("Documentary")} 
              onCardClick={setSelectedMovie} 
              onPlayClick={setPlayingMovie}
              onListToggle={toggleMyList}
              isInList={isInMyList}
            />
          </div>
        </>
      )}

      {/* 3. Deep-Dive Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm">
          <div className="relative bg-[#181818] rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl shadow-black/80 transition-all scale-100 border border-zinc-800 animate-fadeIn">
            
            {/* Modal Hero Banner */}
            <div className="relative aspect-video w-full">
              <img 
                src={selectedMovie.backdrop} 
                alt={selectedMovie.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent"></div>
              
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full cursor-pointer transition-colors border border-zinc-700/50"
                onClick={() => setSelectedMovie(null)}
              >
                <FaTimes className="text-base" />
              </button>

              {/* Title & Floating Play Actions */}
              <div className="absolute bottom-6 left-6 md:left-12">
                <h2 className="text-2xl md:text-5xl font-bold mb-4 drop-shadow-md">{selectedMovie.title}</h2>
                <div className="flex items-center gap-3">
                  <button 
                    className="flex items-center gap-3 bg-white text-black hover:bg-white/80 font-bold px-6 py-2 rounded text-sm md:text-base cursor-pointer shadow-lg hover:scale-105 transition-all"
                    onClick={() => {
                      setPlayingMovie(selectedMovie);
                      setSelectedMovie(null);
                    }}
                  >
                    <FaPlay className="text-black text-xs md:text-sm" />
                    Play
                  </button>
                  <button 
                    className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-400 hover:border-white bg-black/40 hover:bg-black/60 transition-colors"
                    onClick={(e) => toggleMyList(selectedMovie, e)}
                  >
                    {isInMyList(selectedMovie.id) ? <FaCheck className="text-green-500 text-sm" /> : <FaPlus className="text-white text-sm" />}
                  </button>
                  <button className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-400 hover:border-white bg-black/40 hover:bg-black/60 transition-colors">
                    <FaRegThumbsUp className="text-white text-sm hover:text-green-500 transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Info Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12 text-sm text-gray-300">
              
              {/* Main Metadata Details (Left 2/3) */}
              <div className="md:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs md:text-sm">
                  <span className="text-green-500 font-bold text-sm">{selectedMovie.matchScore}% Match</span>
                  <span>{selectedMovie.year}</span>
                  <span className="border border-zinc-700 px-1.5 py-0.2 rounded text-[11px] font-semibold text-white">{selectedMovie.rating}</span>
                  <span>{selectedMovie.duration}</span>
                  <span className="border border-zinc-700 text-zinc-400 px-1 text-[10px] font-bold">HD</span>
                </div>
                
                <p className="text-sm md:text-base leading-relaxed text-gray-100">
                  {selectedMovie.description}
                </p>
              </div>

              {/* Cast & Tag Details (Right 1/3) */}
              <div className="flex flex-col gap-4 text-xs md:text-sm border-l border-zinc-800/80 pl-0 md:pl-6">
                <div>
                  <span className="text-gray-500">Cast: </span>
                  <span className="text-gray-200 font-light">{selectedMovie.cast}</span>
                </div>
                <div>
                  <span className="text-gray-500">Genres: </span>
                  <span className="text-gray-200 font-light">{selectedMovie.genres.join(", ")}</span>
                </div>
                <div>
                  <span className="text-gray-500">This show is: </span>
                  <span className="text-gray-200 font-light">{selectedMovie.category}, Suspenseful, Cinematic</span>
                </div>
              </div>
            </div>

            {/* "More Like This" Recommendations Grid */}
            <div className="p-6 md:p-12 pt-0 border-t border-zinc-800/50 mt-4">
              <h3 className="text-xl font-bold mb-6 text-white">More Like This</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {moviesDatabase
                  .filter((m) => m.id !== selectedMovie.id && (m.category === selectedMovie.category || m.genres.some((g) => selectedMovie.genres.includes(g))))
                  .slice(0, 6)
                  .map((recMovie) => (
                    <div 
                      key={recMovie.id} 
                      className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shadow-md flex flex-col group cursor-pointer hover:border-zinc-500 transition-colors"
                      onClick={() => setSelectedMovie(recMovie)}
                    >
                      <div className="relative aspect-video">
                        <img src={recMovie.backdrop} alt={recMovie.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 py-0.5 text-[10px] border border-zinc-800">{recMovie.duration}</div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-500 font-bold text-xs">{recMovie.matchScore}% Match</span>
                            <span className="border border-zinc-700 px-1 rounded text-[9px]">{recMovie.rating}</span>
                          </div>
                          <h4 className="font-bold text-sm text-white mb-2 line-clamp-1">{recMovie.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">{recMovie.description}</p>
                        </div>
                        <button 
                          className="w-full py-1.5 mt-auto bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-semibold text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingMovie(recMovie);
                            setSelectedMovie(null);
                          }}
                        >
                          Play Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. Fullscreen Video Player */}
      {playingMovie && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
          {/* Top Navbar overlay in Video Player */}
          <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
            <button 
              className="bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center gap-2 p-2 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer border border-zinc-800 hover:scale-105"
              onClick={() => setPlayingMovie(null)}
            >
              <FaTimes className="text-sm" />
              Exit Player
            </button>
            <div className="text-white drop-shadow-md">
              <p className="text-xs text-gray-400">Watching</p>
              <h2 className="text-base font-bold">{playingMovie.title}</h2>
            </div>
          </div>
          
          {/* HTML5 video player */}
          <video 
            src={playingMovie.videoUrl} 
            autoPlay 
            controls 
            className="w-full h-full object-contain"
            onEnded={() => setPlayingMovie(null)}
          />
        </div>
      )}

    </div>
  );
}

// 5. Scrollable Movies Row Component
function Row({ title, movies, onCardClick, onPlayClick, onListToggle, isInList }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentRef = rowRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
      // Run once initially
      checkScrollPosition();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, [movies]);

  return (
    <div className="flex flex-col gap-2 group relative">
      <h2 className="text-lg md:text-2xl font-bold text-gray-200 transition-colors duration-200 hover:text-white cursor-pointer w-max">
        {title}
      </h2>

      {/* Horizontal Carousel Track */}
      <div className="relative">
        
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button 
            className="absolute left-[-20px] md:left-[-40px] top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r border-zinc-800/40 rounded-l"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft className="text-xl transition-transform hover:scale-125" />
          </button>
        )}

        {/* Scrolling Slider List */}
        <div 
          ref={rowRef}
          className="flex items-center gap-4 overflow-x-auto overflow-y-hidden hide-scrollbar py-4 scroll-smooth"
        >
          {movies.map((movie) => {
            const isFavorite = isInList(movie.id);
            return (
              <div 
                key={movie.id}
                className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] aspect-video rounded-md overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:scale-105 hover:z-10 hover:border-zinc-500 group/card"
                onClick={() => onCardClick(movie)}
              >
                {/* Movie Backdrop Thumbnail */}
                <img 
                  src={movie.backdrop} 
                  alt={movie.title} 
                  className="w-full h-full object-cover group-hover/card:opacity-75 transition-opacity"
                  loading="lazy"
                />

                {/* Hover Details Panel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-1.5">
                    {/* Inline Actions */}
                    <button 
                      className="bg-white hover:bg-gray-200 text-black rounded-full h-7 w-7 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayClick(movie);
                      }}
                    >
                      <FaPlay className="text-black text-[10px] ml-0.5" />
                    </button>
                    <button 
                      className="bg-black/60 hover:bg-black/80 border border-gray-400 hover:border-white text-white rounded-full h-7 w-7 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      onClick={(e) => onListToggle(movie, e)}
                    >
                      {isFavorite ? <FaCheck className="text-green-500 text-xs" /> : <FaPlus className="text-white text-xs" />}
                    </button>
                    <button 
                      className="ml-auto bg-black/60 hover:bg-black/80 border border-gray-400 hover:border-white text-white rounded-full h-7 w-7 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardClick(movie);
                      }}
                    >
                      <FaInfoCircle className="text-white text-xs" />
                    </button>
                  </div>

                  {/* Text Details */}
                  <h4 className="font-bold text-sm text-white line-clamp-1 truncate">{movie.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-300">
                    <span className="text-green-500 font-semibold">{movie.matchScore}% Match</span>
                    <span className="border border-zinc-700 px-1 rounded-sm">{movie.rating}</span>
                    <span>{movie.duration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button 
            className="absolute right-[-20px] md:right-[-45px] top-0 bottom-0 w-10 md:w-12 bg-black/60 hover:bg-black/85 text-white flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-l border-zinc-800/40 rounded-r"
            onClick={() => scroll("right")}
          >
            <FaChevronRight className="text-xl transition-transform hover:scale-125" />
          </button>
        )}

      </div>
    </div>
  );
}

export default Browse;
