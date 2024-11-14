import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const[error, setError] = useState(null)
    const [filteredAnime, setFilteredAnime] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const navigate = useNavigate()

    const fetchAnime = async(query = '') =>{
        setLoading(true);
        setError(null)
        try{
            const response = await fetch(`https://api.jikan.moe/v4/anime`);
        
            
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAnimeList(data.data || []);
            setFilteredAnime(data.data || []);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchAnime();
    },[]);

    const handleAnimeClick = (anime) =>{
        navigate(`/anime/${anime.mal_id}`, {state: {anime}});
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        const filtered = animeList.filter(anime =>
            anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnime(filtered);
    };
    const handleGenreFilter = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        const filtered = animeList.filter(anime => 
            genre === '' || anime.genres.some(g => g.name === genre)
        );
        setFilteredAnime(filtered);
    };
    if(loading) return <div>Loading ...</div>
    if (error) return <div>Error : {error}</div>
    return(
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'> Anime List</h1>
            <div className="head-container">
                <form onSubmit={handleSearch} className='mb-4'>
                    <input type="text" placeholder='Search for an anime'value={searchTerm} onChange={(e) =>{setSearchTerm(e.target.value)}} className='border border-gray-300  rounded p-2 mr-2' />
                    <button type="submit" className='bg-blue-500    text-white rounded p-2'>Search</button>
                 </form>
                 <select onChange={handleGenreFilter} className='border border-gray-300 rounded p-2 mr-2'>
                    <option value=''>All Genres</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Comedy'>Comedy</option>
                    {/* Add more genres as needed */}
                </select>
            </div>
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {filteredAnime.map((item) => (
                    <li key={item.mal_id} className='border rounded p-4'>
                        <h2 className='font-semibold'>{item.title}</h2>
                        {item.images && item.images.jpg ? ( // Check if images and jpg exist
                            <img 
                                src={item.images.jpg.small_image_url} 
                                alt={item.title} 
                                className='mt-2' 
                            />
                        ) : (
                            <div className='mt-2 text-gray-500'>Image not available</div> // Fallback if no image
                        )}
                        <div className='mt-2'>
                            <button 
                                onClick={() => handleAnimeClick(item)} 
                                className='bg-blue-500 text-white rounded p-2 mr-2'
                            >
                                View Details
                            </button>
                            {item.url && ( // Check if the URL exists
                                <a 
                                    href={item.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className='bg-green-500 text-white rounded p-2'
                                >
                                    Watch Now
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AnimeList;