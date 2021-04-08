import React, {useState, useContext, useCallback, useEffect} from "react";
import firebase, {signInWithGoogle, signInAnonymously} from "../../util/Firebase";
import {withRouter, Redirect} from "react-router";
import {AuthContextUsers} from "../../util/AuthUsers";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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


const ChooseOption = ({history}) => {
	const [page, setPage] = useState(null);
	const [exist, setExist] = useState( false);
	const [language, setLanguage] = useState(null);

	const classes = useStyles();



	const {currentUser} = useContext(AuthContextUsers)

	useEffect(() => {
				const db = firebase.firestore();

		db.collection("users").doc(currentUser.uid)
			.onSnapshot((doc) => {
				setExist(doc.data());
			});
	}, [])

	const returnLanguage = (answer) => {
		setLanguage(["ru", "kg"][answer.split("_")[1] - 1])
	}

	return (
		<div>
		<div className={classes.container}>
			<button
				className={classes.button}
				onClick={() => setPage("passTest")}
			>
				Тесттен өтүү{/*пройти тест*/}
			</button>
			{exist && <button
				className={classes.button}
				onClick={() => setPage("whatchResults")}
			>
				Жыйынтыктары{/*результаты*/}
			</button>}

			{(page == "passTest") ?
				<Redirect to={"/users"}/> :
				(page == "whatchResults") ?
					<Redirect to={"/find"}/> :
					<div></div>}
		</div>
		<div className={classes.container}>
				<button className={classes.buttonExit}
								onClick={() => firebase.auth().signOut()}>

					Чыгуу
				</button>
			<div></div>
			</div>
			</div>
	)
}

export default withRouter(ChooseOption);
