import React, {useEffect, useState} from "react";
import Scatter2d from "../form/scatter2d";
import firebase from "../../util/Firebase";
import SelectBox from "../form/selectBox";
import {Grid} from "@material-ui/core";
import ScatterLine from "../form/scatter1d";
import AvtoPortrait from "./AvtoPortrait";
import {makeStyles} from "@material-ui/core/styles";
import ShareBtn from "../form/shareBtns";
import Scatter2Dimensional from "../form/scatter2dimensional";


const useStyles = makeStyles((theme) => ({
	mainHeader: {
		textAlign: "center",
		padding: 0,
		fontSize: 28,
		margin: "0 0 15px 0",
		['@media (max-width:780px)']: {
			fontSize: 25
		},
		['@media (max-width:500px)']: {
			fontSize: 23
		},
		['@media (max-width:350px)']: {
			fontSize: 20
		}
	},
	subHeader: {
		textAlign: "center",
		padding: 0,
		paddingBottom: 15,
		fontSize: 22,
		margin: "0 0 15px 0",
		['@media (max-width:780px)']: {
			fontSize: 19
		},
		['@media (max-width:500px)']: {
			fontSize: 17
		},
		['@media (max-width:350px)']: {
			fontSize: 15
		}
	},
	paragraph: {
		fontSize: 25,
		fontWeight: 400,
		padding: 0,
		margin: "10px 0",
		['@media (max-width:780px)']: {
			fontSize: 20
		},
		['@media (max-width:500px)']: {
			fontSize: 17
		},
		['@media (max-width:350px)']: {
			fontSize: 13
		}
	},
	description: {
		fontSize: 20,
		fontWeight: 400,
		padding: "10px 0 0 0 ",
		margin: "10px 0",
		['@media (max-width:780px)']: {
			fontSize: 17
		},
		['@media (max-width:500px)']: {
			fontSize: 15
		},
		['@media (max-width:350px)']: {
			fontSize: 13
		},
	},
	shareText: {
		marginTop: 70,
		marginBottom: 70,
		fontSize: 22,
		textAlign: "center",
		['@media (max-width:780px)']: {
			fontSize: 20
		},
		['@media (max-width:500px)']: {
			fontSize: 17
		},
		['@media (max-width:350px)']: {
			fontSize: 13
		}
	},
	scatterLineHeader: {
		padding: 0,
		margin: 0,
		marginTop: 50,
		marginBottom: 30,
		fontSize: 25,
		textAlign: "center",
		['@media (max-width:780px)']: {
			fontSize: 22
		},
		['@media (max-width:500px)']: {
			fontSize: 19
		},
		['@media (max-width:350px)']: {
			fontSize: 15
		}
	}
}));

const Scatters = props => {
	const [regionsParties, setRegionsParties] = useState(null);
	const [applicants, setApplicants] = useState([]);
	const [scatterLineTexts, setScatterLineTexts] = useState(null);
	const [applicantsForScatter2d, setApplicantsForScatter2d] = useState([]);
	const [applicantsForScatterLine, setApplicantsForScatterLine] = useState([]);
	const [axises, setAxises] = useState({});
	const [axisesRange, setAxisesRange] = useState([]);
	const [myAxises, setMyAxises] = useState({});
	const [axisX, setAxisX] = useState(null);
	const [axisY, setAxisY] = useState(null);
	const [nearestApplicant, setNearestApplicant] = useState(null)
	const [nearestByTwoAxis, setNearestByTwoAxis] = useState(null)
	const [nearestApplicantsLine, setNearestApplicantsLine] = useState({})
	const [uniqueParties, setUniqueParties] = useState(null);
	const [averageParties, setAverageParties] = useState(null);
	const [metaParties, setMetaParties] = useState({parties: {}, parties_meta: {}})

	const classes = useStyles();

	const {currentAxises, region} = props;
	const euclidian_distance = require('euclidean-distance')


	useEffect(() => {

		setAxisesRange([
			'Жарандык укуктар',
			"Экономика",
			'Сөз эркиндиги',
			'Аялдардын укугу',
			'Коррупция',
			'Криминал',
			'Батыш менен карым-катнаш',
			'Орусия менен карым-катнаш',
			'Кытай менен карым-катнаш',
			'Атамбаев',
			'Жээнбеков',
			'Жапаров',
			'Матраимовдор'
		])

		const db = firebase.firestore();

		db.collection("meta").doc("meta_parties")
			.onSnapshot((doc) => {
				setMetaParties({parties: doc.data().parties, parties_meta: doc.data().parties_meta});
			});

		db.collection("fields").doc("regions_parties")
			.onSnapshot((doc) => {
				const localParties = doc.data().regions_parities.map(item => {
					if (item.region == region) {
						return item.parties
					}
				}).filter(Boolean)[0]
				setRegionsParties(localParties);
			});

		db.collection("questions").doc("axises_kg")
			.onSnapshot((doc) => {
				setAxises(doc.data().axises);
			});

		db.collection("texts").doc("scatter_kg")
			.onSnapshot((doc) => {
				setScatterLineTexts(doc.data().line_scatter);
			});

		db.collection("applicants")
			.onSnapshot((querySnapshot) => {
				let currApplicants = [];
				querySnapshot.forEach((doc) => {
					currApplicants.push(doc.data());
				});
				setApplicants(currApplicants);
			});

		setMyAxises(currentAxises);


	}, [])

	useEffect(() => {
		let uniqueParties = [...new Set(applicants.map(item => item.party))];
		let allParties = {};
		let countAnswers = {};
		let sortParties = {}
		uniqueParties.map((party, key) => {
			allParties[key] = party
			countAnswers[key] = 0
			sortParties[key] = []

		})

		setUniqueParties(allParties)
		applicants.map((applicant, index) => {
			let partyKey = getKeyByValue(allParties, applicant.party)
			countAnswers[partyKey] += 1
			sortParties[partyKey].push(applicant)
		})

		const parties = uniqueParties.map((party, index) => {
			let currentAxises = {};
			let keyParty = getKeyByValue(allParties, party)
			Object.keys(axises).map((key, index) => currentAxises[key] = 0);
			let average = {
				party: keyParty
			}

			let currentParties = sortParties[keyParty]
			currentParties.map((item, id) => {
				Object.keys(currentAxises).map((key) => {
					currentAxises[key] += item.axises[key]
				})
			})

			Object.keys(axises).map((key) => {
				currentAxises[key] = currentAxises[key] / countAnswers[keyParty]

			})

			return {party: party, axises: currentAxises}

		})

		const myRegion = regionsParties;
		const filteredParties = parties.map((item, i) => {
			if (myRegion.indexOf(item.party) != -1) {
				return item
			}
		}).filter(Boolean)

		setAverageParties(filteredParties)
	}, [applicants])

	useEffect(() => {
		if (axisX && axisY && averageParties) {
			let people = averageParties.map((el, i) => {
				let partyKey = getKeyByValue(metaParties.parties, el.party);
				let partyColor = metaParties.parties_meta[partyKey].color
				let person = {
					name: el.party,
					symbolSize: 12,
					data: [[el.axises[axisX.axis], el.axises[axisY.axis]]],
					type: 'scatter',
					symbol: 'circle',
					color: `#${partyColor}`,
					emphasis: {
						label: {
							show: true,
							formatter: el.party,
							position: 'top'
						}
					}
				}
				return person
			})

			people.push({
				name: "Мен",
				symbolSize: 12,
				data: [[myAxises[axisX.axis], myAxises[axisY.axis]]],
				type: 'scatter',
				symbol: 'emptyCircle',
				color: `#d902ff`,
				emphasis: {
					label: {
						show: true,
						formatter: "Мен",
						position: 'top'
					}
				}
			})
			setApplicantsForScatter2d(people)


		}

		if (axisX && axisY) {
			let minDistance = Infinity;
			averageParties.map((party, index) => {
				let distance = euclidian_distance([myAxises[axisX.axis], myAxises[axisY.axis]], [party.axises[axisX.axis], party.axises[axisY.axis]])
				if (distance < minDistance) {
					minDistance = distance;
					let nearest = {distance: distance, party: party}
					setNearestByTwoAxis(nearest);
				}
			})
		}


		let peopleLine = axisesRange.map(axis => {
			axis = getKeyByValue(axises, axis)
			let scatterType = averageParties.map((party, index) => {
				let partyKey = getKeyByValue(metaParties.parties, party.party);
				let partyColor = metaParties.parties_meta[partyKey].color
				let person = {
					name: party.party,
					symbolSize: 12,
					data: [party.axises[axis]],
					type: 'scatter',
					symbol: 'circle',
					color: `#${partyColor}`,
					emphasis: {
						label: {
							show: true,
							formatter: party.party,
							position: 'top'
						}
					}
				}
				return person
			})
			scatterType.push({
				name: "Мен",
				symbolSize: 12,
				data: [myAxises[axis]],
				type: 'scatter',
				symbol: 'emptyCircle',
				color: `#d902ff`,
				emphasis: {
					label: {
						show: true,
						formatter: "Мен",
						position: 'top'
					}
				}
			})
			return {axisName: axises[axis], data: scatterType}
		});

		setApplicantsForScatterLine(peopleLine)

		const allKeyses = Object.keys(axises).sort();

		const myArray = allKeyses.map(key => myAxises[key]);

		if (averageParties) {
			let minDistance = Infinity;
			let nearestPartyDistance = averageParties.map((party, index) => {
				let arrayParty = [];
				allKeyses.map((key, el) => {
					arrayParty.push(party.axises[key])
				})

				let currentDistance = euclidian_distance(arrayParty, myArray)
				if (currentDistance < minDistance) {
					minDistance = currentDistance;
					let partyKey = getKeyByValue(metaParties.parties, party.party)
					let url = metaParties.parties_meta[partyKey].url;
					let nearestApplicant = {
						distance: currentDistance,
						party: party,
						url: url
					}

					setNearestApplicant(nearestApplicant)
				}
			})
		}

		let applicantsForLine = {};
		let nearestByAxis = Object.keys(axises).map(key => {
			let minDistance = Infinity;
			averageParties.forEach((party, i) => {
				let currentDistance = euclidian_distance([party.axises[key]], [myAxises[key]])
				if (currentDistance < minDistance) {
					minDistance = currentDistance
					let nearest = {
						distance: currentDistance,
						party: party
					}
					applicantsForLine[key] = nearest
				}
			})
		})

		setNearestApplicantsLine(applicantsForLine)
	}, [averageParties, axisX, axisY, axises]);


	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	const returnAxisX = (answer) => {
		const axis = getKeyByValue(axises, answer)
		setAxisX({title: answer, axis: axis})
	}

	const returnAxisY = (answer) => {
		const axis = getKeyByValue(axises, answer)
		setAxisY({title: answer, axis: axis})
	}

	return (
		<div>
			<Grid container
						direction="column"
						justify="space-around"
						alignItems="center">
				<h2 className={classes.mainHeader}>Сизге жакын
					партия:<br/>{nearestApplicant ? nearestApplicant.party.party : ""}</h2><br/>
				<img style={{width: "60%"}} src={nearestApplicant ? nearestApplicant.url : ""} alt=""/>
			</Grid>

			<h2 style={{marginTop: 50}} className={classes.mainHeader}>
				Жоопторуңузга жараша аныкталган саясий автопортретиңиз:
			</h2>
			<AvtoPortrait nearestParty={nearestApplicant && nearestApplicant.party.party} axises={axises}
										currentAxises={myAxises}/>


			<h5 className={classes.scatterLineHeader}>Кеңири жыйынтык:</h5>
			{applicantsForScatterLine.map((item, i) => {
				let currentAxis = getKeyByValue(axises, item.axisName)
				let currentApplicant = nearestApplicantsLine[currentAxis]
				if (currentAxis != "domestic_policy") {
					return (
						<div style={{marginBottom: 80}}>
							<ScatterLine plus={scatterLineTexts && scatterLineTexts[currentAxis].plus}
													 minus={scatterLineTexts && scatterLineTexts[currentAxis].minus}
													 parties={item.data}
													 distance={myAxises[currentAxis]}
													 axisName={item.axisName}/>
							<p
								className={classes.description}>{scatterLineTexts && scatterLineTexts[currentAxis].description} — {currentApplicant ? currentApplicant.party.party : ""}</p>
						</div>
					)
				}
			})}
			<h2 className={classes.mainHeader}>Поиграйтесь с результатами! Выведите их на график!</h2>
			<h3 className={classes.subHeader}>Выберите два явления, которые вы хотите отобразить:</h3>
			<Grid container direction="row"
						justify="space-around"
						alignItems="center"
						spacing={2}>
				<Grid item>
					<SelectBox title={"Тандаңыз жебе Х"} exist={(axisY) ? axisY.title : ""} answers={Object.values(axises).sort()}
										 returnAnswer={returnAxisX}/>
				</Grid>
				<Grid item>
					<SelectBox title={"Тандаңыз жебе Y"} exist={(axisX) ? axisX.title : ""} answers={Object.values(axises).sort()}
										 returnAnswer={returnAxisY}/>
				</Grid>
			</Grid>
			<div style={{marginTop: 50}}>
				{nearestByTwoAxis ? <Scatter2Dimensional
					myAxisX={myAxises[axisX.axis]}
					myAxisY={myAxises[axisY.axis]}
					parties={applicantsForScatter2d}
					axisX={axises[axisX.axis]} axisY={axises[axisY.axis]}/> : <div></div>}
			</div>

			<div style={{marginBottom: 50}}>
				{nearestByTwoAxis ?
					<h2 style={{textAlign: "left"}} className={classes.mainHeader}>
						Эки жебенин негизиндеги сизге жакын партия: {nearestByTwoAxis ? nearestByTwoAxis.party.party : ""}
					</h2> :
					""}
			</div>
		</div>
	)
}

export default Scatters;