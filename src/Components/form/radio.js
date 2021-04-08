import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TextField, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	fromControl: {
			width: '70%',
	},
	typography: {
			fontSize:"19px"
	}

}));

const MyRadio = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState('');

	const { title, response, returnAnswer, index, answers} = props

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
				<Typography classes={classes.typography} variant="h6" component="h6">
					{title}
				</Typography>


			</form>
		</div>
	)
}

export default MyRadio;
