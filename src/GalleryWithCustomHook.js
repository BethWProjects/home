import React, {useState} from "react";
import PICTURES from './data/pictures'
import { useDynamicTransition } from "./hooks";

//display a picture on display based on it's index

const SECONDS = 1000; 
const minimumDelay = 1 * SECONDS; 
const minimumIncrement = 1; 

function GalleryWithCustomHook() {
    const [delay, setDelay] = useState(3 * SECONDS); 
    const [increment, setIncrement] = useState(1); 

    const index = useDynamicTransition({
        delay, increment, length: PICTURES.length
    });  //call the custom hook with the matching params
    
    const updateDelay = event => {
        let delay = Number(event.target.value) * SECONDS; 
        setDelay(delay < minimumDelay ? minimumDelay : delay ); 
    }

    const updateIncrement = event => {
        const increment = Number(event.target.value)

        setIncrement(increment < minimumIncrement ? minimumIncrement : increment)
    }

    return (
        <div className="Gallery">
            <img src={PICTURES[index].image} 
            alt='gallery' 
            />
            <div className="multiform">
                <div>
                Gallery transition delay (seconds): <input type="number" onChange={updateDelay}/>
                </div>
            </div>
            <div className="">
                Gallery increment: 
                <input type="number" onChange={updateIncrement} />
            </div>
        </div>
    )
}

export default GalleryWithCustomHook;
