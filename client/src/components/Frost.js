import React from 'react'
import Button from './Button'
import DataTags from './DataTags'
import '../styles/frost.scss'

function Frost({ headerText, bodyText, buttonText, addButton, buttonLink, twitterData}) {
    return (
    <div className='frost'>
        
        <div className='insideFrostContainer'>
            <h2>{headerText}</h2>
            <p>{bodyText}</p>
            {twitterData ? <DataTags /> : <div></div>}
            {addButton ?
                <Button buttonText={buttonText} buttonLink={buttonLink}/> : <p></p>}
        </div>
    </div>
    )
}

// { headerText === 'Twitter Profile' : }

export default Frost