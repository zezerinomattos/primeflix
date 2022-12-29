import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success("FILME REMOVIDO COM SUCESSO!");
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
                    {filmes.length === 0 && <span>Você não possui nem um filme salvo :( </span>}

                        <ul className='lista-filmes'>
                        
                            {filmes.map((filme) => {
                                return (
                                    <li key={filme.id}>
                                        <span>{filme.title}</span>
                                        <div className='links'>
                                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                            <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
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