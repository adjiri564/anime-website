import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';


const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path='/' element ={<AnimeList />}/>
        <Route path='/anime/:id' element ={<AnimeDetails />}/>
      </Routes>
    </Router>
    // <div className='bg-gray-100 min-h-screen p-4'>
    //   <h1 className='text-3xl font-bold text-center mb-6'>Welcome to the Anime Website</h1>
    //   <AnimeList />
    //   {/* <CurrentAnimes /> */}
    // </div>
  )
}

export default App;