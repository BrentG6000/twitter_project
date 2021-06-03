import React, { useState, useContext } from 'react'
import UserProvider from '../contexts/UserProvider'
import DataTagProvider from '../contexts/DataTagContext'
import '../styles/tweetForm.scss'

 const Terminal = () => {
    const [selected] = useContext(DataTagProvider.context)
    const userData = useContext(UserProvider.context)
    const [tweet, setTweet] = useState('')
    const selectedData = selected === 'All' ? userData : userData[selected]
    const jsonCode = JSON.stringify(selectedData, null, 4)

    async function postData() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweet: tweet })
        }
        
        try {
            console.log(JSON.parse(requestOptions.body).tweet.length)
            const response = await fetch('http://localhost:5000/tweet', requestOptions)
            const data = await response
        }
        catch (e) {
            console.log(e)
        }
    }

    const Submit = async (event) => {
        event.preventDefault() // Prevent default submission    
        try {
            await postData()      
            alert('Your registration was successfully submitted!')
            setTweet('')
        } catch (e) {
          alert(`Registration failed! ${e.message}`)
        }
      }
    
    return (
        <div className='window'>
            <div className='title-bar'>
                <p style={{ textAlign: 'center', margin: 0}}>
                    Twitter Terminal
                </p>
            </div>
            { (() => { switch (selected) {
                        case 'Tweet': return (
                            <form onSubmit={Submit}>
                                <div className='content'>
                                    <textarea 
                                        className='tweetForm'
                                        placeholder='Enter text here...'
                                        value={tweet}
                                        onChange={(e) => setTweet(e.target.value)}
                                    >   
                                    </textarea>   
                                </div>
                                <button type="submit" className='submit'>Submit</button>
                                <button type="reset" className='submit' onClick={() => setTweet('')}>Clear</button>
                            </form>
                        )
                        case 'Latest Tweet': return (
                            <div className='content'>
                                <p style={{textAlign: 'center'}}>
                                    <div style={{paddingBottom: '5px'}}>
                                        Tweet ID Number:
                                    </div>
                                    <div style={{paddingBottom: '3%'}}>
                                        {JSON.stringify(userData['_json']['status']['id'], null, 4)}
                                    </div>
                                    <div style={{paddingBottom: '5px'}}>
                                        Tweet Time:
                                    </div>
                                    <div style={{paddingBottom: '3%'}}>
                                        {JSON.stringify(userData['_json']['status']['created_at'], null, 4).replace(/^"|"$/g, '')}
                                    </div>         
                                    <div style={{paddingBottom: '5px'}}>
                                        Tweet Text:
                                    </div>
                                    <div style={{paddingBottom: '3%'}}>
                                        {JSON.stringify(userData['_json']['status']['text'], null, 4).replace(/^"|"$|\\/g, '')}
                                    </div>
                                 </p>
                            </div>
                        )
                        case 'Tweet Count': return (
                            <div className='content'>
                                <p style={{textAlign: 'center'}}>
                                    <div style={{paddingBottom: '5px'}}>
                                        Tweet Count:
                                    </div>
                                    <div>
                                        {JSON.stringify(userData['_json']['statuses_count'], null, 4)}
                                    </div>
                                 </p>
                            </div>
                        )
                        case 'Followers': return (
                            <div className='content'>
                                <p style={{textAlign: 'center'}}>
                                    <div style={{paddingBottom: '5px'}}>
                                        Follower Count:
                                    </div>
                                    <div>
                                        {JSON.stringify(userData['_json']['followers_count'], null, 4)}
                                    </div>
                                 </p>
                            </div>
                        )
                        case 'Following': return (
                            <div className='content'>
                                <p style={{textAlign: 'center'}}>
                                    <div style={{paddingBottom: '5px'}}>
                                        Following Count:
                                    </div>
                                    <div>
                                        {JSON.stringify(userData['_json']['friends_count'], null, 4)}
                                    </div>
                                 </p>
                            </div>
                        )
                        case 'Favorites': return (
                            <div className='content'>
                                <p style={{textAlign: 'center'}}>
                                    <div style={{paddingBottom: '5px'}}>
                                        Number of Favorited Tweets:
                                    </div>
                                    <div>
                                        {JSON.stringify(userData['_json']['favourites_count'], null, 4)}
                                    </div>
                                 </p>
                            </div>
                        )
                        default: 
                            return (
                                <div className='content'>
                                    <pre>{jsonCode}</pre>
                                </div>
                            )
                    }})() }
            </div>
)
}

export default Terminal