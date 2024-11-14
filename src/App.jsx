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
    
  )
}

export default App;