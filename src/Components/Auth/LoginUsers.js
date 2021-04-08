import React, {useState, useContext, useCallback, useEffect} from "react";
import firebase, {signInWithGoogle, signInAnonymously} from "../../util/Firebase";
import {withRouter, Redirect} from "react-router";
import {AuthContextUsers} from "../../util/AuthUsers";
import {Button} from "@material-ui/core";
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
		padding: "7px 40px",
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
	buttonMail: {
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
const LoginUsers = ({history}) => {
	const [phone, setPhone] = useState(null);
	const [otp, setOtp] = useState(null);
	const [sentCode, setSentCode] = useState(null);
	const [texts, setTexts] = useState([]);
	const [language, setLanguage] = useState(null);

	const classes = useStyles();

	const {currentUser} = useContext(AuthContextUsers)

	if (currentUser) {
		return <Redirect to={"/choose_option"}/>
	}

	const returnLanguage = (answer) => {
		setLanguage(["ru", "kg"][answer.split("_")[1] - 1])
	}

	return (
		<div className={classes.container}>

			<button className={classes.buttonMail} onClick={() => signInWithGoogle()}>
				Почта аркылуу кирүү
			</button>
			<button	className={classes.button} onClick={() => signInAnonymously()}>
				Жашыруун кирүү
			</button>
		</div>
	)
}

export default withRouter(LoginUsers);
