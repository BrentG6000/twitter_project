import React, { useContext } from 'react'
import UserProvider from '../contexts/UserProvider'
import DataTagProvider from '../contexts/DataTagContext'
import _ from 'lodash'
import ReactTooltip from 'react-tooltip'
import '../index.css'
import '../styles/button.scss'
import '../styles/App.scss'

const LoginMsg = "Uh oh, there's nothing to show! " +
    "Login to see how much of your invaluable personal " +
    "data tech companies have at their disposal."

const DataTags = () => {
    // const pStyle = {
    //     overflow: 'hidden',
    //     textOverflow: 'ellipsis',
    //     margin: 2,
    //     fontSize: 12
    // }
    
    const [selected, setSelected] = useContext(DataTagProvider.context)
    const userData = useContext(UserProvider.context)
    const text = _.isEmpty(userData) ? LoginMsg : "Explore Your Data:"
    
    const options = Object.keys(userData).filter(key => {
        return userData[key] !== null
    })
    const allOptions = ['All', ...options, 'Tweet', 'Latest Tweet', 'Followers', 'Following', 'Tweet Count', 'Favorites']
    let tooltip = ''


    return (
        <div>
            {/* <p style={{margin: "0px 0px 20px 0px"}}>
            {text}
            </p> */}
            { allOptions.map(option => {
                const extraClass = option === selected ? 'selected' : ''
                let buttonName = ''
                let tip = ''
                
                { (() => {
                    switch (option) {
                        case 'displayName': return buttonName = 'Screen Name', tip = 'This displays your screen name (not your @ Twittter handle)'
                        case 'username':  return buttonName = 'Twitter Handle', tip = 'This displays your @ Twitter handle'
                        case 'id': return buttonName = 'ID Number', tip = 'This is the internal number Twitter uses to identify your account'
                        case 'All': return buttonName = 'Profile', tip = 'This shows your entire Twitter profile information'
                        case '_accessLevel': return buttonName = 'Access Level', tip = 'This is the access level to your account that you have given to this app'
                        case 'Tweet': return buttonName = 'Send A Tweet', tip = 'Enter a message into the text box below and click submit to tweet it out'
                        case 'Latest Tweet': return buttonName = 'Latest Tweet', tip = 'This will show the last Tweet your account sent out'
                        case 'Followers': return buttonName = 'Followers', tip = 'The number of follows this Twitter account has'
                        case 'Following': return buttonName = 'Following', tip = 'The number of accounts you follow'
                        case 'Tweet Count': return buttonName = 'Tweet Count', tip = 'The number of tweets that have been sent out by this account'
                        case 'Favorites': return buttonName = 'Favorites', tip = 'The number of tweets you have liked'
                        default: return buttonName = ''
                    }})() }                
                
                return (
                    <div className='dataTagContainer'>
                        { buttonName === '' ? <div></div> :
                                <div
                                    onClick={() => setSelected(option)}
                                    className={`tag ${extraClass}`}
                                    data-tip={ tip }
                                >
                                    <p>
                                        {buttonName}   
                                    </p>
                                    <ReactTooltip place='right' effect='solid'/> 
                                </div>
                        }
                    </div>
                )
            }) }
        </div>
    )
}

export default DataTags