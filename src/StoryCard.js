import React from 'react';

function Card({by, score, title, kids}) {
    return(
        <div>
            <div className='card'>
                <h1>{by}</h1>
                <p>{score}</p>
                <p>{title}</p>
                <p className='kids'>{kids}</p>
            </div>
        </div>
    )
}

export default Card;