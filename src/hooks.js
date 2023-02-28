import React, { useState, useEffect } from 'react'

//create a custom hook and set parameters for the fetch url and initialValue for state
//create a function for useState that passes the initialValue parameter and naming convention for result and setResult for values. 
//notice: custom useFetch hook is setup as a plain function, which takes in input and returns some output
//this can be plugged into an function component, and makes hooks reusable and therefore more powerful

export const useFetch = (url, initialValue) => {
    const [result, setResult ] = useState(initialValue);

useEffect(() => {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log('json', json)
            setResult(json)
        })
}, [])

    return result

}

//create custom hook by
//1: isolate unique differences and make them parameters (ie increment, delay, length)
//2: figure out end result of the hooks based logic (what values are changing?), leading you to
//3: return the values that are changing as the result of the hook (ie the index in this example below).  This can also be mulitiple values within an array or an object.
export const useDynamicTransition = ({ increment, delay, length }) => { 
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {  
            setIndex(storedIndex => {
                return (storedIndex + increment) % length   
                })     
        }, delay) 

        return () => clearInterval(interval)
    }, [delay, increment]);

    return index;
}