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
	container:{
		paddingTop: 20,
		paddingBottom: 15
	},
	typography: {
		fontSize: "18px"
	}
}));

const Text = (props) => {
	const {text} = props;
	const classes = useStyles();


	return <div className={classes.container}>
		<p className={classes.typography} variant="h6" component="p">
			{text}
		</p>
	</div>
}

export default Text;