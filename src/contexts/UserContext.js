import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        const savedUser = localStorage.getItem('studyPlanner-user');
        return savedUser ? JSON.parse(savedUser) : {
            name: 'Jsuario',
            avatar: 'JS',
            concurso: 'BB - 2026'
        };
    });

    const updateUser = (newUserData) => {
        const updatedUser = { ...user, ...newUserData };
        setUser(updatedUser);
        localStorage.setItem('studyPlanner-user', JSON.stringify(updatedUser));
    };

    const updateAvatar = (avatar) => {
        updateUser({ avatar });
    };

    const updateName = (name) => {
        updateUser({ name });
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            updateUser, 
            updateAvatar, 
            updateName
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);