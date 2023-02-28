import React, {useState, useEffect} from 'react';
import MATRIX_FRAMES from './data/matrix';

//display Matrix images based on it's index position, set to a hardcoded interval

function Matrix() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
       setInterval(
            () => {
                setIndex(storedIndex => {
                    return (storedIndex + 1) % MATRIX_FRAMES.length
                })
            }, 1000);
    }, []);

    return(
        <div className='Matrix'>
            <img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
        </div>
    )
}

export default Matrix;
