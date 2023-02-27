import React, {useState, useEffect} from "react";
import PICTURES from './data/pictures'

//display a picture on display based on it's index

function Gallery() {
    const [index, setIndex] = useState(0);

    //grab local data saved in the global PICTURES file
    //the useEffect sends a callback with a closer that keeps it's variable defined to what they were when they were created. 
    //SO, we have to use alternative syntax in for the setter function to make sure React always pulls the latest stored value in the internal React engine
    useEffect(() => {
        const interval = setInterval(() => {  
            setIndex(storedIndex => {
                return (storedIndex + 1) % PICTURES.length     //forces useEffect to update and return the new value being stored with the state, by using another callback function within the setIndex function
                })     
        }, 3000)

        return () => {  //clean up code to run when a component is unmounting/leaving the dom. running this code when hiding the gallery in the app.js file to avoid a memory leak.  this will kill the queued setInterval
            clearInterval(interval)  //interval is the unique id
        }
    }, [])


    return (
        <div className="Gallery">
            <img src={PICTURES[index].image} alt='gallery' />
        </div>
    )
}

export default Gallery