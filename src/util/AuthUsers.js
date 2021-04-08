import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const AuthContextUsers = createContext();

export const AuthProviderUsers = (( {children} ) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(setCurrentUser)
	},[]);

	return(
		<AuthContextUsers.Provider
		value={{currentUser}}
		>
			{children}
		</AuthContextUsers.Provider>
	)


})