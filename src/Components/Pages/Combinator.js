import React, {useContext, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import FieldsPage from "../Applicant/FieldsPage";
import Questions from "../Quotes/Questions";
import firebase from "../../util/Firebase";
import {AuthContext, AuthProvider} from "../../util/Auth";
import {AuthContextUsers, AuthProviderUsers} from "../../util/AuthUsers";
import {Button} from "@material-ui/core";
import WarningText from "../form/warning";
import RadioButton from "../form/radioButton";
import Scatters from "./Scatters";
import {HashRouter as Router} from "react-router-dom";

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

const Combinator = (props) => {
	const [fields, setFields] = useState([]);
	const [axisesAverage, setAxisesAverage] = useState(null);
	const [allAnswers, setAllAnswers] = useState(null);
	const [allFields, setAllFields] = useState([]);
	const [warning, setWarning] = useState(null);
	const [language, setLanguage] = useState('kg');
	const [final, setFinal] = useState(null);
	const [finalAnswers, setFinalAnswers] = useState(null);
	const [status, setStatus] = useState("start")

	const classes = useStyles();

	const {page_for} = props;

	const {currentUser} = useContext(AuthContextUsers)
	const {currentUser_applicant} = useContext(AuthContext)

	useEffect(() => {
		const db = firebase.firestore();
		db.collection("fields").doc(page_for+"_kg")
			.onSnapshot((doc) => {
				setAllFields(doc.data().questions);
			});
	}, [])


	useEffect(() => {
		if (axisesAverage) {
			let human;
			if (page_for == "applicant") {
				const name = fields[0];
				const lastName = fields[1];
				const number = currentUser_applicant.phoneNumber;
				const region = fields[2].split("=>")[0];
				const party = fields[2].split("=>")[1];
				const photoUrl = fields[3];
				const centralized = (fields[4] == "answ_1") ? true : false;
				const applicants_num = fields[4].split("==")[1] ? fields[4].split("==")[1] : false;

				human = {
					name: name,
					lastName: lastName,
					number: number,
					region: region,
					party: party,
					photoUrl: photoUrl,
					axises: axisesAverage,
					centralized: centralized,
					applicants_num: applicants_num
				}

			} else if (page_for == "user") {
				const sex = fields[0];
				const age = fields[1];
				const mail = currentUser.email;
				const region = fields[2];
				const axises = axisesAverage;
				human = {
					sex: sex,
					age: age,
					mail: mail,
					region: region,
					axises: axises,
					allAnswers:allAnswers,
				}

			}
			const db = firebase.firestore();
			let userUID = (page_for == "applicant") ? currentUser_applicant.uid : currentUser.uid
			db.collection(page_for + "s").doc(userUID).set(human)
			setFinalAnswers(human)
			setStatus("final")
		}
	}, [axisesAverage])

	const checkFields = () => {
		let currentFields = fields.filter(Boolean);
		currentFields = currentFields.map(item => item.length >= 2);
		if ((currentFields.indexOf(false) === -1) && (currentFields.length == allFields.length) && currentFields.length > 0) {
			setStatus("questions")
		} else {
			setWarning(true)
		}
	}
	const returnFields = (answer) => {
		setFields(answer)
	}

	const returnAxisesAverage = (answer) => {
		setAxisesAverage(answer)
	}

	const returnAllAnswers = (answer) => {
		setAllAnswers(answer)
		console.log(answer)
	}

	const returnLanguage = (answer) => {
		setLanguage(["ru", "kg"][answer.split("_")[1] - 1])

	}

	const backToQuestions = () => {
		setStatus("questions")
	}


	return (
		<div className="App">
			{!language ? <RadioButton
					title={"Какой язык?"}
					answers={["ru", "kg"]}
					values={["ru", "kg"]}
					returnAnswer={returnLanguage}
				/> :
				<div>{(status == "start") ?
					<div>
						{warning && <WarningText text={"Өтунүч, бардык бөлүктөрдү толтуруп чыгыңыз"}/>}
						<FieldsPage
							type_people={"user"}
							returnFields={returnFields} lang={language}/>
						<button className={classes.button}
										onClick={() => checkFields()}>
							{(language == "ru") ? "Суроолорго өтүү" : "Суроолор"}
						</button>
						<br/>
						<button className={classes.buttonExit}
										onClick={() => firebase.auth().signOut()}>
							{(language == "ru") ? "Чыгуу" : "Чыгуу"}
						</button>
					</div>
					:
					(status == "questions") ?
						<Questions sex={(fields[0] == "male") ? "he" : (fields[0] == "female") ? "she" : "other"}
											 lang={language}
											 allAnswers={allAnswers}
											 returnAxisesAverage={returnAxisesAverage}
											 returnAllAnswers={returnAllAnswers}
											 persons="applicants"/>
						:
						(page_for == "applicant") ?
							<div>
								<h1>  {(language == "ru") ? "Спасибо! Ваши результаты сохранены." : "Рахмат"}</h1>
								<img
									src="https://st.depositphotos.com/1724162/4091/i/600/depositphotos_40912841-stock-photo-cats-eyes.jpg"
									alt="kitty"/>
							</div> :
							<div>
								<Scatters region={finalAnswers.region} currentAxises={axisesAverage}/>

							</div>
				}</div>
			}


		</div>
	);
}

export default Combinator;