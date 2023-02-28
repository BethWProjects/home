import React, {useState, useEffect} from 'react';
import MATRIX_FRAMES from './data/matrix';

const MILLISECONDS = 100;
const minimumDelay = 1 * MILLISECONDS

function MatrixDynamicInput() {
    const [index, setIndex] = useState(0)
    const [delay, setDelay] = useState(100)

    useEffect(() => {
        console.log('delay', delay)
        const interval = setInterval(
            () => {
             setIndex(storedIndex => {
                return (storedIndex + 1) % MATRIX_FRAMES.length
            })
        }, delay);

        return () => {
            clearInterval(interval)
        }
    }, [delay])

    const updateDelay = event => {
        let delay = Number(event.target.value) * MILLISECONDS
        setDelay(delay < minimumDelay ? minimumDelay : delay)
    }
    return (
        <div className='Matrix'>Matrix
            <img src={MATRIX_FRAMES[index]} 
            alt="matrix-animation" 
            /> 
            <div className=''>
                <div>
                    Matrix transition delay (seconds): 
                    <input type="number" onChange={updateDelay} />
                </div>
            </div>
        </div>
    )
}

export default MatrixDynamicInput;