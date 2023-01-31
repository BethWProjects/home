import React, { useEffect, useState } from "react";

function Joke() {
    //declare a useState function to track the joke state, this will be an object captured from the data fetch, so set initial state to an object. 
    const [joke, setJoke] = useState({})

    //declare the useEffect function
    //it is a callback function that mounts to the component, like the componentDidMount, so it is useful for fetching data
    //useEffect applies after every render
    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/jokes/random')
        //write code that handles the response for the request
        //enter the returned json as the parameter to the setJoke state
            .then(response => response.json())
            .then(json => {
                console.log('joke json', json)
                setJoke(json)
            })
    }, []);
    //^^ add an empty array as a second arguement to useEffect, to say: this useEffect hook does not have to fire after initial fire, avoiding an infinite loop.  By default, useEffect and setState will trigger refresh on click, by assigning the second argument you avoid the refresh on the useEffect and avoid an infinite loop.

    //example json object being returned: 
    // {
    //     id: 261
    //     punchline: "Boo jeans."
    //     setup: "What kind of pants do ghosts wear?"
    //     type: "general"
    // }
    //destructure the setup and punchline variables from the joke object
    const { setup, punchline } = joke; 

    return(
        <div>
            <h3>Random Joke</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
    
}

export default Joke;