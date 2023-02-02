import React from "react";
import { useFetch } from "./hooks";

//this file is to display the use of a custom hook, that essentially works the same way as the Joke.js file, but with cleaner and repeatable code. 
//the useFetch hook is saved in the hooks.js file so it can be reused in other components. 
//the useFetch is called within a const that destructures the properties directly, instead of in a separate variable. 


function JokeWithCustomHook() {
    const {setup, punchline} = useFetch('https://official-joke-api.appspot.com/jokes/random', {})

    return(
        <div>
            <h3>Random Joke with Custom Hook Code</h3>
            <p>{setup}</p>
            <p><em>{punchline}</em></p>
        </div>
    )
    
}

export default JokeWithCustomHook;