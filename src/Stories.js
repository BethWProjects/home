import React, { useEffect, useState } from 'react'

function Stories() {

    useEffect(() => {
        fetch('https://news-proxy-230704.appspot.com/topstories')
            .then(response => response.json())
            .then(json => console.log(json))
    })

    return(
        <div>Stories</div>
    )
}

export default Stories