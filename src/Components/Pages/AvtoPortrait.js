import React, {useEffect, useState} from "react";
import firebase from "../../util/Firebase";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import ShareBtn from "../form/shareBtns";

const useStyles = makeStyles((theme) => ({
	avtoportretContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		columnGap: 30,
		['@media (max-width:300px)']: {
			gridTemplateColumns: "1fr"
		}
	},
	header: {
		fontWeight: 700,
		fontFamily: 'Roboto, sans-serif',

		padding: 0,
		margin: "25px 0 10px 0",

		fontSize: 23,
		['@media (max-width:780px)']: {
			fontSize: 20
		},

		['@media (max-width:500px)']: {
			fontSize: 17
		},

		['@media (max-width:350px)']: {
			fontSize: 14
		}

	},
	paragraph: {
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
	shareText: {
		marginTop: 70,
		marginBottom: 70,
		fontSize: 22,
				fontFamily: 'Roboto, sans-serif',

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
}));


const AvtoPortrait = (props) => {
	const [texts, setTexts] = useState(null);
	const [axisesName, setAxisesName] = useState([])
	const [url, setUrl] = useState([])
	const [textsForShare, setTextsForShare] = useState({});
	const [axises, setAxises] = useState([]);
	const {nearestParty, currentAxises} = props;
	const classes = useStyles();

	useEffect(() => {
		const db = firebase.firestore();
		db.collection("texts").doc("matrix_kg")
			.onSnapshot((doc) => {
				setTexts(doc.data().matrix_answers);
			});

		db.collection("questions").doc("axises_kg")
			.onSnapshot((doc) => {
				setAxises(doc.data().axises);
			});

		db.collection("meta").doc("url_kg")
			.onSnapshot((doc) => {
				setUrl(doc.data().url);
			});
		const axisesName = [
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
		]
		setAxisesName(axisesName)
	}, [])


	useEffect(() => {
		let textsShare = {}
		if (axises && texts) {
			axisesName.map((item, index) => {
				let axisKey = getKeyByValue(axises, item);
				let currentAxis = currentAxises[axisKey];
				let text;
				if (currentAxis >= -2 && currentAxis <= -1.11) {
					text = texts[axisKey].m_2_m_1
				} else if (currentAxis >= -1.1 && currentAxis <= -0.61) {
					text = texts[axisKey].m_1_m_06
				} else if (currentAxis >= -0.60 && currentAxis <= -0.21) {
					text = texts[axisKey].m_06_m02
				} else if (currentAxis >= -0.2 && currentAxis <= 0.21) {
					text = texts[axisKey].m_02_p_02
				} else if (currentAxis >= 0.21 && currentAxis <= 0.6) {
					text = texts[axisKey].p_02_p_06
				} else if (currentAxis >= 0.61 && currentAxis <= 1.1) {
					text = texts[axisKey].p_06_p_1
				} else if (currentAxis >= 1.11 && currentAxis <= 2) {
					text = texts[axisKey].p_1_p_2
				}
				textsShare[axisKey] = text
			})
			setTextsForShare(textsShare)

		}
	}, [texts, axises])

	function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
	}

	return (<div>
		<div className={classes.avtoportretContainer}>
			{texts && axisesName.map((item, index) => {
				let axisKey = getKeyByValue(axises, item);
				debugger
				return (
					<div>
						<h4 className={classes.header}>{item}:</h4>
						<p className={classes.paragraph}>{textsForShare[axisKey]}</p>
					</div>
				)
			})}
		</div>
		<div className={classes.shareText}>
			<h5>Жыйынтыкты социалдык тармактарда бөлүшүңүз:</h5>
			<ShareBtn nearest={nearestParty} url={url} texts={[textsForShare["japarov"], textsForShare["matraimov"]]}/>
		</div>
	</div>)
}

export default AvtoPortrait;