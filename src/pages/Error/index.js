import React from 'react';
import { Link } from 'react-router-dom';

// MY IMPORTS
import './style.css';

export default function Error(){
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h3>Desculpe, página não encontrada</h3>
            <span>A página solicitada não pode ser encontrada</span>
            <Link to='/'>CONHEÇA NOSSAS PAGINAS</Link>
        </div>
    );
}