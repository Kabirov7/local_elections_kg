import React, {useEffect} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: "30px",
		margin: "0 auto",
		textAlign: "left",
		fontFamily: 'Roboto, sans-serif',

	},
	typography: {
		fontWeight: 300,
		padding: 0,
		paddingBottom: 10,
		fontFamily: 'Roboto, sans-serif',
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
		fontSize: 15,
		color: "black",
		fontWeight: 200,
		fontFamily: 'Roboto, sans-serif',

		padding: 0,
		margin: 0,
		['@media (max-width:780px)']: {
			fontSize: 13
		},
		['@media (max-width:500px)']: {
			fontSize: 11
		},
		['@media (max-width:350px)']: {
			fontSize: 9
		}

	}
}));
const RadioButton = (props) => {
	const [value, setValue] = React.useState('');
	const classes = useStyles();
	const {title, id, answers, ans, index, values, returnAnswer} = props;

	const handleChange = (event) => {
		setValue(event.target.value);
		returnAnswer("answ_" + (1 + answers.indexOf(event.target.value)), index)
	};

	useEffect(() => {
		if (ans) {
			const currentAnswer = Object.values(ans)[0].split("_")[1] - 1
			setValue(answers[currentAnswer])
		}
	}, [ans])

	return (
		<div className={classes.formControl}>
			<p className={classes.typography}>
				{title}
			</p>
			<div>
				<FormControl error={true} style={{margin: 0, padding: 0}} const='fieldset'>
					<RadioGroup aria-label={title}
											name={title} value={value} onChange={handleChange}>
						{answers.map((item, i) =>
							<FormControlLabel
								key={i}
								value={item}
								control={<Radio/>}
								label={
									<p className={classes.radio}
									>{item}</p>
								}/>)
						}

					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

export default RadioButton;