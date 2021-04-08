import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	fromControl: {
			width: '70%',
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
	}

}));

const MyTextField = (props) => {

	const classes = useStyles();
	const [value, setValue] = React.useState('');

	const {index, response, returnAnswer, label, disabled, title} = props

	useEffect(() => {
		if (response) {
			setValue(response)
		}
	}, [response])

	const handleChange = (event) => {
		setValue(event.target.value)
		returnAnswer(event.target.value, index)
	}

	return (
		<div>
			<form noValidate autoComplete="off">
				<p classes={classes.typography} variant="h6" component="h6">
					{title}
				</p>
				<TextField
					disabled={disabled && true}
					id={"textField"}
					value={value}
					label={label && label}
					onChange={handleChange}
				/>
			</form>
		</div>
	)
}

export default MyTextField;
