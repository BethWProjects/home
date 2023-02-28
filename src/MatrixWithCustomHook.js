import React, {useState} from 'react';
import MATRIX_FRAMES from './data/matrix';
import { useDynamicTransition } from './hooks';

const MILLISECONDS = 100;
const minimumDelay = 1 * MILLISECONDS;
const minimumIncrement = 1;

function MatrixWithCustomHook() {
    const [delay, setDelay] = useState(100)
    const [increment, setIncrement] = useState(1);

   const index = useDynamicTransition({ 
    delay, increment, length: MATRIX_FRAMES.length
   })

    const updateDelay = event => {
        let delay = Number(event.target.value) * MILLISECONDS
        setDelay(delay < minimumDelay ? minimumDelay : delay)
    }

    const updateIncrement = event => {
        let increment = Number(event.target.value)
        setIncrement(increment < minimumIncrement ? minimumIncrement : increment)
    }

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

export default MatrixWithCustomHook;