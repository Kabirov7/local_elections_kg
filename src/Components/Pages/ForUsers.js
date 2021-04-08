import React, {useState, useEffect, useContext} from "react";
import Scatters from "../Results/Scatters";
import firebase from "../../util/Firebase";

const ForUsers = () => {
	const [applicants, setApplicants] = useState([])
	const [appsAxises, setAppsAxises] = useState([])

	useEffect(() => {
		const db = firebase.firestore();
		db.collection("applicants")
			.onSnapshot((querySnapshot) => {
				let currApplicants = [];
				querySnapshot.forEach((doc) => {
					currApplicants.push(doc.data());
				});
				setApplicants(currApplicants);
			});
	}, [])

	return (
		<div>
			<Scatters applicants={applicants}/>
		</div>
	)
}

export default ForUsers;