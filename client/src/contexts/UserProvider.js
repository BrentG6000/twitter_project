import React, { createContext, useState, useEffect } from 'react'

const context = createContext(null)

const UserProvider = props => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        loadData()
    }, [user])

    async function loadData() {
        try {
        console.log('test')    
        const response = await fetch('/user')
        
        const data = await response.json()
        await setUser(data)
        
        } 
        catch (e) {
            console.log(e)
        }
    }

    return (
        <context.Provider value={user}>
            {props.children}
        </context.Provider>
    )
}

UserProvider.context = context

export default UserProvider