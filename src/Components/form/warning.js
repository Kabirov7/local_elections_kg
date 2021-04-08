import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	typography: {
		fontSize: 14,
		marginTop: "10px",
		width: "70%",
		color:"#ff0000",
		fontWeight: 300,
		padding: 0,
		['@media (max-width:780px)']: {
			fontSize: 11
		},
		['@media (max-width:500px)']: {
			fontSize: 9
		},
		['@media (max-width:350px)']: {
			fontSize: 7
		}
	}
}));
export default function WarningText(props) {
	const {text} = props
	const classes = useStyles();

	return (
		<div style={{padding:0,margin:0}} className={classes.typography}>
			<p style={{padding:0,margin:0}}>
				{text}
			</p>
		</div>
	)
}