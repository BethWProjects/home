import React, {useState, useEffect} from 'react';
import MATRIX_FRAMES from './data/matrix';

const MILLISECONDS = 100;
const minimumDelay = 1 * MILLISECONDS;
const minimumIncrement = 1;

function MatrixDynamicInput() {
    const [index, setIndex] = useState(0)
    const [delay, setDelay] = useState(100)
    const [increment, setIncrement] = useState(1);

    useEffect(() => {
        // console.log('delay', delay, 'increment', increment)
        const interval = setInterval(
            () => {
             setIndex(storedIndex => {
                return (storedIndex + increment) % MATRIX_FRAMES.length
            })
        }, delay);

        return () => clearInterval(interval)

    }, [delay, increment])

    const updateDelay = event => {
        let delay = Number(event.target.value) * MILLISECONDS
        setDelay(delay < minimumDelay ? minimumDelay : delay)
    }

    const updateIncrement = event => {
        let increment = Number(event.target.value)
        setIncrement(increment < minimumIncrement ? minimumIncrement : increment)
    }

    // console.log('delay', delay, 'increment', increment)
    return (
        <div className='Matrix'>
            <img src={MATRIX_FRAMES[index]} 
            alt="matrix-animation" 
            /> 
            <div className='multiform'>
                <div>
                    Matrix transition delay (seconds): 
                    <input type="number" onChange={updateDelay} />
                </div>
                <div>
                    Matrix increment: 
                    <input type="number" onChange={updateIncrement} />
                </div>
            </div>
        </div>
    )
}

export default MatrixDynamicInput;