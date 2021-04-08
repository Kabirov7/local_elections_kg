import React from 'react';
import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';
import "../../App.css"
import {Grid} from "@material-ui/core";
import {Chart} from "react-google-charts";

const useStyles = makeStyles((theme) => ({
	plus: {
		textAlign: "right",
		justifySelf: "end"
	},
	container: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		gridGap: 10,
		alignItems: "center",
		justifyItems: "start",
		['@media (max-width:450px)']: {
			gridTemplateColumns: "1fr 1fr",
			gridGap: 5,
		},
	},
	subContainer: {
		display: "grid",
		alignItems: "center",
		justifyItems: "start",
	},
	coordinates: {
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr",
		gridTemplateRows: "1fr",
		justifyContent: "space-evenly",
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 300,
		color: "#474747",
		fontSize: "16px",
		alignItems: "start",
		justifyItems: "center",
	},
	header: {
		textAlign: "center",
		padding: 0,
		fontSize: 25,
		fontFamily: "Roboto, sans-serif",
		margin: "0 0 15px 0",
		['@media (max-width:780px)']: {
			fontSize: 20
		},
		['@media (max-width:500px)']: {
			fontSize: 17
		},
		['@media (max-width:350px)']: {
			fontSize: 17
		}
	},
	paragraph: {
		fontWeight: 400,
		padding: 0,
		fontFamily: "Roboto, sans-serif",
		margin: 0,
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
	label: {
		fontWeight: 200,
		padding: 0,
		fontFamily: "Roboto, sans-serif",
		margin: 0,
		fontSize: 10,
		['@media (max-width:780px)']: {
			fontSize: 8
		},
		['@media (max-width:500px)']: {
			fontSize: 7
		},
		['@media (max-width:350px)']: {
			fontSize: 6
		}
	},
	minus: {
		justifySelf: "start"
	}
}));

export default function ScatterLine(props) {
	const classes = useStyles()
	const emojis = require('emojis-list')
	const {parties, axisName, plus, minus, distance} = props;


	const data = [
		['ID', axisName, "", 'Партия'],
		["Мен", distance, 0, "Мен"]
	]
	const validParties = parties.map((item, id) => {
		let ID = item.name.slice(0, 3).toLocaleUpperCase();
		let X = item.data[0];
		data.push(["", X, 0, item.name])

	})

	const series = {}
	parties.map(item => series[item.name] = {color: item.color})


	const options = {
		title: '',
		height: 150,
		legend: {position: 'top', maxLines: 2, alignment: "start"},
		hAxis: {title: axisName, viewWindow: {min: -2.5, max: 2.5}},
		vAxis: {title: "", viewWindow: {min: 0.1, max: 0.1}},
		series: series,
		sizeAxis: {minValue: 0, maxSize: 7},
		bubble: {
			textStyle: {
				auraColor: 'none'
			},
		},
	}

	const distanceFixed = distance && distance != 0 ? distance.toFixed(2) : 0
	return (
		<div style={{marginBottom: 100}}>
			<h2 className={classes.header}>{axisName + ": " + distanceFixed}</h2>
			<div className={"nameAxis"}>
			</div>
			<div>
				<div className={"arrows"}>
					<div className={classes.coordinates}>
						<p className={classes.paragraph + " " + classes.minus}>{minus}</p>
						<div>
							<div style={{
								width: 2,
								height: 50,
								background: "#2b2b2b",
							}}>

							</div>
						</div>
						<p className={classes.paragraph + " " + classes.plus}>{plus}</p>
					</div>
					<Grid container
								direction="row"
								justify="space-between"
								alignItems="center">
						<p style={{fontSize: 21}}>{emojis[3051]}</p>
						<p style={{transform: "scaleX(-1)", fontSize: 21}}>{emojis[3051]}</p>
					</Grid>
				</div>

				<Chart
					width={'100%'}
					height={'50px'}
					chartType="BubbleChart"
					loader={<div>Loading Chart</div>}
					data={data}
					colors={parties.map(item => item.color)}
					options={options}
					rootProps={{'data-testid': '3'}}
				/>
			</div>
		</div>
	)
}