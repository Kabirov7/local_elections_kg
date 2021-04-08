import React, {useContext, useEffect, useState} from 'react';
import firebase from "../../util/Firebase";
import {withRouter, Redirect} from "react-router";

import {AuthContextUsers} from "../../util/AuthUsers";
import {AuthContext} from "../../util/Auth";
import Scatters from "./Scatters";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "grid",
		gridTemplateColumns: '1fr 1fr',
		gridTemplateRows: "1fr",
		['@media (max-width:500px)']: {
			gridTemplateColumns: '1fr',
		},
	},
	button: {
		color: "white",
		backgroundColor: "#000",
		borderStyle: "none",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "13px",
		height: "50%",
		transform: "none",
		padding: "7px 20px",
		textTransform: "uppercase",
		textDecoration: "none",
		transition: "all 0.7s ease 0s",
		placeSelf: "center",
		outline: "none",
		margin: "25px 0 30px 0",
		'&:hover': {
			backgroundColor: "#ffffff",
			color: "#000000",
			border: "#000 1px solid"
		},
		['@media (max-width:780px)']: {
			fontSize: 12
		},
		['@media (max-width:500px)']: {
			fontSize: 11
		},
		['@media (max-width:350px)']: {
			fontSize: 10
		}
	},
	buttonExit: {
		color: "white",
		backgroundColor: "#d03d2f",
		borderStyle: "none",
		fontFamily: "Roboto, sans-serif",
		fontWeight: "bold",
		fontSize: "15px",
		height: "50%",
		transform: "none",
		padding: "7px 40px",
		textTransform: "uppercase",
		textDecoration: "none",
		transition: "all 0.7s ease 0s",
		placeSelf: "center",
		outline: "none",
		margin: "25px 0 30px 0",
		'&:hover': {
			backgroundColor: "#ffffff",
			color: "#d03d2f",
			border: "#d03d2f 1px solid"
		},
		['@media (max-width:780px)']: {
			fontSize: 13
		},
		['@media (max-width:500px)']: {
			fontSize: 12
		},
		['@media (max-width:350px)']: {
			fontSize: 10
		}
	}

}));


const MyResult = (props) => {
	const [usersAnswers, setUsersAnswers] = useState(null);
	const [exist, setExist] = useState(null)
	const [page, setPage] = useState(null)

	const {currentUser} = useContext(AuthContextUsers)
	const {currentUser_applicant} = useContext(AuthContext)

	const classes = useStyles();
	useEffect(() => {
		const db = firebase.firestore();
		// let curr_questions = (lang == "ru") ? "all_questions" : "all_questions_kg";
		db.collection("users").doc(currentUser.uid)
			.onSnapshot((doc) => {
				if (doc.data() == undefined) {
					setExist(true)
				} else {
					setUsersAnswers(doc.data());
				}
			});

	}, [])

	return (
		<div>
			{exist ? <div>
				<h4>Вы ещё не проходили тест</h4>
				<button
					className={classes.button}
					onClick={() => setPage("passTest")}
				>
					пройти тест
				</button>
			</div> : <div></div>}
			{usersAnswers && <Scatters region={usersAnswers.region} currentAxises={usersAnswers.axises}/>}
			{(page == "passTest") ?
				<Redirect to={"/users"}/> :
				<div></div>}
		</div>
	)
}

export default MyResult;