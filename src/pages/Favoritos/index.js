import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// MY IMPORTS
import './style.css';


function Favoritos(){

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoadig] = useState(true);


    async function loadFilmes(){
        const minhaLista = await localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []);
        setLoadig(false)

    }


    useEffect(() => {
        loadFilmes();
    }, []);


    return(
        <>
            {
                loading ? 
                    <div className='loading'>
                        <h1>Carregando filmes...</h1>
                    </div>
                :
                    <div className='container'>   
                    <h1>Minha Lista</h1>  

                        <ul className='lista-filmes'>
                        
                            {filmes.map((filme) => {
                                return (
                                    <li key={filme.id}>
                                        <span>{filme.title}</span>
                                        <div className='links'>
                                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                            <button>Excluir</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>                
            }           
        </>
    );
}

export default Favoritos;