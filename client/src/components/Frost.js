import React from 'react'
import Button from './Button'
import DataTags from './DataTags'
import '../styles/frost.scss'

function Frost({ headerText, bodyText, buttonText, addButton, buttonLink, twitterData}) {
    return (
    <div className='frost'>
        { twitterData ?  
            <div className='insideFrostContainer'>
                <h2>{headerText}</h2>
                <p>{bodyText}</p>
                {twitterData ? <DataTags /> : <div></div>}
                {addButton ?
                    <Button buttonText={buttonText} buttonLink={buttonLink}/> : <p></p>}
            </div> :
            <div className='insideFrostContainer'>
            <h2>{headerText}</h2>
            <p>{bodyText}</p>
            {twitterData ? <DataTags /> : <div></div>}
            {addButton ?
                <Button buttonText={buttonText} buttonLink={buttonLink}/> : <p></p>}
            </div>
        }
    </div>
    )
}

export default Frost

{/* <div className='insideFrostContainer'>
            <h2>{headerText}</h2>
            <p>{bodyText}</p>
            {twitterData ? <DataTags /> : <div></div>}
            {addButton ?
                <Button buttonText={buttonText} buttonLink={buttonLink}/> : <p></p>}
            </div> */}