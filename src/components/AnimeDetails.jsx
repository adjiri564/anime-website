import {useLocation} from 'react-router-dom';

const AnimeDetails = () =>{
    const location = useLocation()
    const {anime} = location.state;

    return(
        <div className='max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md'>
            <h1 className='text-3xl font-bold mb-4'>{anime.title}</h1>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} className='w-full h-auto rounded-lg mb-4' />
            <p className='text-lg font-semibold'>Episodes: {anime.episodes}</p>
            <p className='mt-2 text-gray-700'>{anime.synopsis}</p>
        </div>
    )
}
export default AnimeDetails