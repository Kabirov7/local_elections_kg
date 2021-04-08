import {Chart} from "react-google-charts";
import * as React from "react";
import {render} from "react-dom";


const Scatter2Dimensional = (props) => {

	const {
		axisX, myAxisX, myAxisY, axisY, parties
	} = props

	console.log("parties => ", parties)
	const data = [
		['ID', axisX, axisY, 'Партия'],
		["Мен", myAxisX, myAxisY, "Мен"]
	]
	const validParties = parties.map((item, id) => {
		let ID = item.name.slice(0, 3).toLocaleUpperCase();
		let X = item.data[0][0];
		let Y = item.data[0][1];
		data.push(["", X, Y, item.name])

	})

	console.log("data =>", data)
	const series = {}
	parties.map(item => series[item.name] = {color: item.color})


	const options = {
		title:
			'Ближайшая партия по 2ум осям',
		legend: {position: 'top', maxLines: 1000, alignment: "start"},
		hAxis: {title: axisX,  viewWindow: { min:-3, max: 3 }},
		vAxis: {title: axisY,  viewWindow: { min:-3, max: 3 }},
		series: series,

		sizeAxis: {minValue: 0, maxSize: 7},
		bubble: {
			textStyle: {
				auraColor: 'none'
			},
		},
	}
	return (
		<Chart
			width={'100%'}
			height={'400px'}
			chartType="BubbleChart"
			loader={<div>Loading Chart</div>}
			data={data}
			colors={parties.map(item => item.color)}
			options={options}
			rootProps={{'data-testid': '3'}}
		/>
	);
};

export default Scatter2Dimensional;