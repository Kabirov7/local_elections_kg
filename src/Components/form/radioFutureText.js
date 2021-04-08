import React, {useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "./TextField";
import RadioButton from "./radioButton";
import MyTextField from "./TextField";

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: "30px",
		margin: "0 auto",
		textAlign: "left",
		// width: "80%",

	},
	typography: {
		fontWeight: 300,
		fontFamily: 'Roboto, sans-serif',
		padding: 0,
		margin: 0,
		fontSize: 20,
		['@media (max-width:780px)']: {
			fontSize: 15
		},
		['@media (max-width:500px)']: {
			fontSize: 13
		},
		['@media (max-width:350px)']: {
			fontSize: 11
		}
	},
	radio: {
		fontSize: "15px",
		color: "black"

	}
}));

const RadioFututureText = (props) => {
	const [value, setValue] = React.useState('');
	const [value_2, setValue_2] = React.useState(null);
	const classes = useStyles();
	const {title, lang, id, answers, ans, index, values, returnAnswer} = props;

	const handleChange = (answer) => {
		setValue(answer);
		// returnAnswer("answ_" + (1 + answers.indexOf(event.target.value)), index)
	};

	const handleChange_2 = (answer) => {
		setValue_2(answer);
		// returnAnswer("answ_" + (1 + answers.indexOf(event.target.value)), index)
	};

	useEffect(() => {
		if (ans) {
			const currentAnswer = Object.values(ans)[0].split("_")[1] - 1
			setValue(answers[currentAnswer])
		}
	}, [ans])

	useEffect(() => {
		(value == "answ_1") ?
			returnAnswer(value, index)
			:
			returnAnswer(undefined, index)

	}, [value])

	useEffect(() => {
		returnAnswer(value + "==" + value_2, index)
		if ((value + "==" + value_2) == "answ_2==") returnAnswer(undefined, index);
	}, [value_2])

	return (
		<div className={classes.formControl}>
			<RadioButton
				key={index}
				title={title}
				answers={answers}
				returnAnswer={handleChange}
				id={index}
				index={index}
				values={answers}/>
			{value === "answ_2" && <MyTextField returnAnswer={handleChange_2} index={index}
																					title={lang == "ru" ? "Под каким номером вы выдвигаетесь" : "Сиз кайсы номерге көрсөтүлгөнсүз"}/>}
		</div>
	);
}

export default RadioFututureText;