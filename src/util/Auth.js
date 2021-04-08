import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const AuthContext = createContext();

export const AuthProvider = (( {children} ) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(setCurrentUser)
	},[]);

	return(
		<AuthContext.Provider
		value={{currentUser}}
		>
			{children}
		</AuthContext.Provider>
	)


})