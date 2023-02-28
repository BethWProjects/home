import React, {useState, useEffect} from 'react';
import MATRIX_FRAMES from './data/matrix';

function Matrix() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
       setInterval(
            () => {
                setIndex(storedIndex => {
                    return (storedIndex + 1) % MATRIX_FRAMES.length
                })
            }, 700);
    }, []);

    return(
        <div className='Matrix'>
            <img src={MATRIX_FRAMES[index]} alt="matrix-animation" />
        </div>
    )
}

export default Matrix;
