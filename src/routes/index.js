import { BrowserRouter, Routes, Route } from 'react-router-dom';

// MY IMPORTS
import Home from '../pages/Home';
import Filme from '../pages/Filme';
import Header from '../components/Header';
import Error from '../pages/Error';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home /> }/>
                <Route path='/filme/:id' element={ <Filme /> }/>

                
                <Route path='*' element={ <Error /> }/>
            </Routes>
        </BrowserRouter>
    )
}