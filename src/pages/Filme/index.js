import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


// MY IMPORTS
import './style.css';
import api from '../../services/api';


function Filme(){
    const [filme, setFilme] = useState({});
    const [loading, setLoadig] = useState(true);

    const navigate = useNavigate();

    const { id } = useParams();

    async function loadFilme(){
        await api.get(`movie/${id}`, {
            params: {
                api_key: '1ebe03ef5a131d724309a9c616bec52a',
                language: 'pt-BR',
            }
        })
        .then((response) => {
            setFilme(response.data);
            setLoadig(false);
        })
        .catch(() => {
            navigate('/', {replace: true});
            return;
        });
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix');

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            alert('ESSE FILME JÁ ESTÁ NA LISTA!');
            return;
        }

        filmeSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmeSalvos));
        alert('FILME SALVO COM SUCESSO!');
    }

    useEffect(() => {
        loadFilme();

    }, []);

    return(
       <>
           {
                loading ? 
                    <div className='loading'>
                        <h1>Carregando filmes...</h1>
                    </div>
                :
                    <div className='filme-info'>
                        <h1>{filme.title}</h1>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                        <h3>Sinopse</h3>
                        <span>{filme.overview}</span>
                        <strong>Avaliação {filme.vote_average} / 10</strong>

                        <div className='area-buttons'>
                            <button onClick={salvarFilme}>Salvar</button>
                            <button><a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a></button>
                        </div>

                    </div>
           }
       </>
    );
}

export default Filme;