import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//MY IMPORTS
import './style.css';
import api from '../../services/api';


function Home(){

    const [filmes, setFilmes] = useState([]);

    async function loadFilmes(){
        const response = await api.get('movie/now_playing', {
            params:{
                api_key: '1ebe03ef5a131d724309a9c616bec52a',
                language: 'pt-BR',
                page: 1,
            }
        })
        //console.log(response.data.results.slice(0, 10));
        setFilmes(response.data.results.slice(0, 10));
    }

    useEffect(() => {
        loadFilmes();
    }, []);

    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Home;


//URL da API = https://api.themoviedb.org/3/movie/now_playing?api_key=1ebe03ef5a131d724309a9c616bec52a