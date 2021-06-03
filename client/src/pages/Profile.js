import React, { useContext } from 'react'
import _ from 'lodash'
import UserProvider from '../contexts/UserProvider'
import Frost from '../components/Frost'
import Terminal from '../components/Terminal'
import Login from '../pages/Login'
import '../styles/tweetForm.scss'

function Profile() {
    const userData = useContext(UserProvider.context)
    const headerText = 'Twitter Profile'
    const bodyText = 'Click on any of the available options'
    const buttonText = 'Back'
    const addButton = false
    const twitterData = true

    return (
        <>
            { _.isEmpty(userData) ? <Login/> :
            <div id='resize'>
                <Frost headerText={headerText} bodyText={bodyText} buttonText={buttonText} addButton={addButton} twitterData={twitterData}>
                </Frost>
                <Terminal/>
            </div>
            }
        </>
    )
}

export default Profile