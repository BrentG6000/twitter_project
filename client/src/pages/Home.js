import React from 'react'
import Frost from '../components/Frost'

function Home() {
    const headerText = `Welcome to Twitter Logger!`
    const bodyText =`Here you can log into a Twitter Account and record tweets into a database`
    const buttonText = 'Begin'
    const addButton = 'true'

    const buttonLink = "/Login"
    return (
        <div id='resize'>
        <Frost headerText={headerText} bodyText={bodyText} buttonText={buttonText} addButton={addButton} buttonLink={buttonLink}/>
        </div>
    )
}

export default Home