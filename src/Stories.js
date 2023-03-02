import React, { useEffect, useState } from 'react'
import Card from './StoryCard';

function Stories() {
    const [ story, setStory ] = useState([])

    useEffect(() => {
        fetch('https://news-proxy-230704.appspot.com/topstories')
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                setStory(json)
            })
    }, []);

    //this is example code to create cards, with imported code from StoryCard component, for display. 
    const storyData = story.map((s) => {
        return(
            <Card 
                key={s.id}
                by={s.by}
                score={s.score}
                title={s.title}
                kids={!s.kids ? '' : s.kids[0]}
            />
        )
    } );

    return(
        <span className='cards'>{storyData}</span>
    )
}

export default Stories