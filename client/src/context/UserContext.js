import React, {createContext, useState, useEffect} from 'react';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);



    useEffect(() => {
        const fetchUser = async () => {
            const user = await fetch('http://localhost:8080/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            .then (res => res.json())
            .then (data => setUser(data.user[0]))
            .catch(err => console.log(err));
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext};
