import { useState, useEffect } from 'react';

interface Movie {
    id: number;
    title: string;
    genre: string;
    description: string;
    image: string;
    rating: string;
    year: string;
}

const movies: Movie[] = [
    {
        id: 1,
        title: 'Celestial Horizons',
        genre: 'Sci-Fi / Adventure',
        description: 'An epic journey across the galaxy to uncover the secrets of a dying star and the future of humanity.',
        image: '/movies/celestial-horizons.png',
        rating: '8.9',
        year: '2024'
    },
    {
        id: 2,
        title: 'The Shadow Protocol',
        genre: 'Mystery / Thriller',
        description: 'When a top-tier agent is framed for treason, he must go underground to expose a global conspiracy.',
        image: '/movies/shadow-protocol.png',
        rating: '8.4',
        year: '2024'
    },
    {
        id: 3,
        title: 'Guardians of the Forest',
        genre: 'Animation / Fantasy',
        description: 'A young sprite and her majestic companion must protect their magical home from an encroaching darkness.',
        image: '/movies/guardians-forest.png',
        rating: '9.2',
        year: '2024'
    }
];

const fetchMovies = async (): Promise<Movie[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/movies');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.warn('Backend connection failed, using mock data:', error);
        return movies;
    }
};

const Homepage = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            setIsLoading(true);
            const data = await fetchMovies();
            setMoviesList(data);
            setIsLoading(false);
        };
        loadMovies();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-purple-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-2xl font-bold">C</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            CINEMA<span className="text-purple-500">PRO</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Movies</a>
                        <a href="#" className="hover:text-white transition-colors">TV Shows</a>
                        <a href="#" className="hover:text-white transition-colors">Categories</a>
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                    </div>
                    <button className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95">
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Love</span> In One Place
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed font-light">
                        Stream the latest blockbusters, critically acclaimed series, and exclusive originals in stunning 4K HDR. Start your journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-600/20 transform hover:-translate-y-1">
                            Start Free Trial
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-sm">
                            Browse Collections
                        </button>
                    </div>
                </div>
            </section>

            {/* Movie Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
                        <div className="h-1 w-20 bg-purple-600 rounded-full" />
                    </div>
                    <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider">
                        View All →
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        // Skeleton Loaders
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-[500px] w-full bg-white/5 animate-pulse rounded-3xl" />
                        ))
                    ) : (
                        moviesList.map((movie) => (

                            <div
                                key={movie.id}
                                className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10"
                            >
                                {/* Image Container */}
                                <div className="aspect-[2/3] overflow-hidden relative">
                                    <img
                                        src={movie.image}
                                        alt={movie.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-transparent opacity-60" />

                                    {/* Overlay Info */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-sm font-bold">{movie.rating}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{movie.genre}</span>
                                        <span className="text-white/20">•</span>
                                        <span className="text-xs text-gray-400">{movie.year}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{movie.title}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6 font-light">
                                        {movie.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                        <button className="px-5 py-2.5 bg-white/5 hover:bg-white text-white hover:text-black text-sm font-bold rounded-xl transition-all border border-white/10">
                                            Details
                                        </button>
                                        <button className="w-10 h-10 flex items-center justify-center bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white rounded-xl transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-black/20 py-16 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2 mb-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center font-bold text-white">C</div>
                        <span className="font-bold tracking-tight text-white">CINEMA<span className="text-purple-500">PRO</span></span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-8 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] font-medium">
                        © 2024 CinemaPro. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
