import React, {useState, useEffect} from "react";
import PICTURES from './data/pictures'

//display a picture on display based on it's index

const SECONDS = 1000; //constant assigned to millisecond multiple
const minimumDelay = 1 * SECONDS; //constant to keep the minimum to 1, so when a user changes the delay number it doesn't reset to 0 and cause a glitch
const minimumIncrement = 1; //set a minimum increment value to apply to a ternary below in updateIncrement function

function Gallery() {
    const [index, setIndex] = useState(0);
    const [delay, setDelay] = useState(3 * SECONDS); //initial value of delay time
    const [increment, setIncrement] = useState(1); //initial value for increment setting

    //grab local data saved in the global PICTURES file
    //the useEffect sends a callback with a closer that keeps it's variable defined to what they were when they were created. 
    //SO, we have to use alternative syntax in for the setter function to make sure React always pulls the latest stored value in the internal React engine
    //this useEffect is the dynamic example for users to enter an interval time manually:
    useEffect(() => {
        console.log('delay', delay, 'increment', increment)
        const interval = setInterval(() => {  
            setIndex(storedIndex => {
                return (storedIndex + increment) % PICTURES.length     //forces useEffect to update and return the new value being stored with the state, by using another callback function within the setIndex function.  Added dynamic increment value for input
                })     
        }, delay) // we want it to rerun when the delay changes, so change to delay hook vs 3000

        return () => {  //clean up code to run when a component is unmounting/leaving the dom. running this code when hiding the gallery in the app.js file to avoid a memory leak.  this will kill the queued setInterval
            clearInterval(interval)  //interval is the unique id
        }
    }, [delay, increment]) //[] triggers one render of useEffect, we want it to rerun when the delay changes to insert the delay hook into array, and then the increment hook as well
    
    const updateDelay = event => {
        let delay = Number(event.target.value) * SECONDS; // the value of delay when entered.  Convert target string to a number on input and then multiply by 1000 to update to milliseconds conversion
        setDelay(delay < minimumDelay ? minimumDelay : delay ); // use a ternary to trigger a minimum of 1, to avoid glitch '0' value when updating number, blocking the user from going below the minimum
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

export default Gallery
