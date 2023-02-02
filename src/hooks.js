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