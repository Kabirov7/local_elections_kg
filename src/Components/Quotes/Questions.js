import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import MySelectBox from "../form/select";
import MyTextField from "../form/TextField";
import firebase from "../../util/Firebase";
import SuperSelect from "../form/superSelect";
import UploadFile from "../form/upload_file";
import RadioButton from "../form/radioButton";
import Grid from '@material-ui/core/Grid';
import WarningText from "../form/warning";
import {Button, LinearProgress, List} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: "30px",
		margin: "0 auto",
		width: "70%",
	},
	typography: {
		fontSize: "24px"
	},
	pagination: {
		padding: 0,
		margin: "30px 0",
	},
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
}));

const Questions = (props) => {
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	// const [allAnswers, setAllAnswers] = useState([]);
	const [axises, setAxsises] = useState({});
	const [results, setResults] = useState();
	const [isWhatchResults, setIsWhatchResults] = useState(null)
	const [progress, setProgress] = useState(0);
	const [unAnswered, setUnAnswered] = useState([])
	const [showUnAnswered, setShowUnAnswered] = useState(null)
	const [answeredIds, setAnsweredIds] = useState(null)

	const [firstQuestions, setFirstQuestions] = useState(0);
	const [questionsOnThePage, setQuestionsOnThePage] = useState(30);

	const [currentQuestions, setCurrentQuestions] = useState([])


	const classes = useStyles();

	const {persons, sex, allAnswers, lang, returnAxisesAverage, returnAllAnswers} = props;


	useEffect(() => {
		const db = firebase.firestore();
		let curr_questions = (lang == "ru") ? "all_questions" : "all_questions_kg";
		db.collection("questions").doc(curr_questions)
			.onSnapshot((doc) => {
				setQuestions(doc.data().questions);
			});

		let curr_axises = (lang == "ru") ? "axises" : "axises_kg";
		db.collection("questions").doc(curr_axises)
			.onSnapshot((doc) => {
				setAxsises(doc.data().axises);
				setResults(Object.keys(doc.data().axises).forEach(v => doc.data().axises[v] = 0))
			});
	}, [])

	const getAnsweredQuestions = (object) => {
		let ids = object.map((item, id) => item && Object.keys(item)[0])
			.filter(Boolean);

		return ids.map(item => parseInt(item))
	}

	useEffect(() => {
		let answeredIds = getAnsweredQuestions(answers);
		setProgress((answeredIds.length * 100) / questions.length)

		let allIds = questions.map((item, id) => id);
		allIds = allIds.map(i => (answeredIds.includes(i)) && i)
		allIds = allIds.slice(firstQuestions, firstQuestions + questionsOnThePage)
		setUnAnswered(allIds)

		if (answeredIds.length == questions.length & (questions != false)) {
			let answers_values = answers.map((item, id) => questions[id].values[item[id]])
			let axises_keys = Object.keys(axises);
			let all_axises = {};
			axises_keys.forEach(v => all_axises[v] = 0)

			let count_axises = {};
			axises_keys.forEach(v => count_axises[v] = 0)

			answers_values.map((el, id) => {
				Object.keys(el).forEach(key => {
					all_axises[key] += el[key];
					count_axises[key] += 1;
				})
			})

			let axises_average = {};
			Object.keys(all_axises).map((key, id) => {
				axises_average[key] = (all_axises[key]) ? all_axises[key] / count_axises[key] : 0;
			})

			setResults(axises_average);
			setIsWhatchResults(true)

		}
	}, [answers])

	const whatchResults = () => {
		returnAxisesAverage(results);
	}

	const topFunction = () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
	const checkAnswered = () => {
		let answeredIds = getAnsweredQuestions(answers);

		let allIds = questions.map((item, id) => id);
		allIds = allIds.map(i => (answeredIds.includes(i)) && i)
		allIds = allIds.slice(firstQuestions, firstQuestions + questionsOnThePage)


		setUnAnswered(allIds)
		setShowUnAnswered(true)

		if (allIds.indexOf(false) != -1) {
			const el = document.getElementById(`question${allIds.indexOf(false) + firstQuestions}`)
			if (el) {
				el.scrollIntoView({
					behavior: "smooth",
					block: "start"
				})
			}
		} else {
			setFirstQuestions(firstQuestions + questionsOnThePage);
			setShowUnAnswered(null)
			topFunction();
		}
	}

	const previous = () => {
		setFirstQuestions(firstQuestions - questionsOnThePage);
		topFunction();
	}

	const returnAxisAnswer = (answer, index) => {
		const tmp = [...answers]
		tmp[index] = {[index]: answer}
		setAnswers(tmp)
		returnAllAnswers(tmp)
	}
	return (
		<div>
			<LinearProgress style={{position: 'sticky', top: 0}} variant="determinate" value={(progress) ? progress : 0}/>
			<div style={{textAlign: "left",}}>
				{questions.slice(firstQuestions, firstQuestions + questionsOnThePage).map((item, index) => (
					<div id={"question" + (index + firstQuestions)}>
						<RadioButton
							key={index + firstQuestions}
							title={item.title}
							answers={item.answers[sex]}
							returnAnswer={returnAxisAnswer}
							id={index}
							ans={answers[firstQuestions + index]}
							index={index + firstQuestions}
							values={item.values}/>
						{!unAnswered.includes(index + firstQuestions) && (showUnAnswered) &&
						<WarningText text="Бул суроого жооп бериңиз"/>}
					</div>
				))}
			</div>
			<div className={classes.pagination}>
				{isWhatchResults && <button className={classes.button}
																		onClick={() => whatchResults()}>
					Жыйынтыктары
				</button>}
				<br/>
				{(firstQuestions + questionsOnThePage > questionsOnThePage) ?
					<button className={classes.button}
									onClick={() => previous()}>
						Буга чейинки барак
					</button>
					:
					<div></div>
				}
				{(firstQuestions + questionsOnThePage < questions.length) ?
					<div style={{margin: 1}}>
						<button className={classes.button}
										onClick={() => checkAnswered()}>
							Кийинки барак{/*Следующая страница*/}
						</button>
					</div>
					:
					<div></div>
				}
			</div>

		</div>
	)
}

export default Questions;