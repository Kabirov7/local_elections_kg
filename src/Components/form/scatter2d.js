import ReactEcharts from "echarts-for-react";
import {makeStyles} from '@material-ui/core/styles';
import 'echarts-gl';
import "../../App.css"
import React, {useState, useEffect, useContext} from "react";

const useStyles = makeStyles((theme) => ({
	formControl: {
		paddingBottom: 0,
	},
}));

const Scatter2d = (props) => {
	const [allApplicants, setAllApplicants] = useState()

	const {applicants} = props;

	const classes = useStyles();

	const getOption = () => ({
		color: applicants.map(el => el.color),
		legend: {
			show: true,
			data: applicants.map(el => el.name),
			orient: "horizontal",
			height: 'auto',
			top: "3%",
			left: 0,
		},
		grid: {
			z: 2,
			top: "30%",
			height: "50%",
			bottom: "10%"
		},
		xAxis: {
			name: 'x',
			min: -2,
			max: 2,

		},
		yAxis: {
			name: 'y',
			min: -2,
			max: 2,

		},
		series: applicants,

	})
	return (
		<div className={classes.formControl}>
			<ReactEcharts style={{height: "600px"}} option={getOption()}/>
		</div>
	);
}

export default Scatter2d;