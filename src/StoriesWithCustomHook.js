import React from 'react'
import { useFetch } from './hooks';

function StoriesWithCustomHook() {
    const story = useFetch('https://news-proxy-230704.appspot.com/topstories', [])

    //this code example maps and displays the jsx within one component
    return(
        <div className='stories'>
            <h3>Stories</h3>
            {
                story.map(s => {
                    const {id, by, time, title, url} = s;

                    return(
                        <div key={id}>
                            <a href={url}>{title}</a>
                            <div>{by} - {new Date(time * 1000).toLocaleString()}</div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default StoriesWithCustomHook