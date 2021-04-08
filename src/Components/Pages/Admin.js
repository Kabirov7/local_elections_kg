import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from "../../util/Firebase";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
	return {name, calories, fat, carbs, protein};
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AdminTable() {
	const [applicants, setApplicants] = useState([]);
	const classes = useStyles();
	useEffect(() => {
		const db = firebase.firestore();
		db.collection("applicants")
			.onSnapshot((querySnapshot) => {
				let currApplicants = [];
				querySnapshot.forEach((doc) => {
					currApplicants.push(doc.data());
				});
				setApplicants(currApplicants);
			});
	}, [])

	// debugger
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="a dense table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Name</TableCell>
						<TableCell align="right">Party</TableCell>
						<TableCell align="right">Centralized</TableCell>
						<TableCell align="right">Num</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{applicants.map((applicant) => (
						<TableRow key={applicant.name + " " + applicant.lastName}>
							<TableCell component="th" scope="row">
								{applicant.name} {applicant.lastName}
							</TableCell>
							<TableCell align="right">{applicant.party}</TableCell>
							<TableCell align="right">{(applicant.centralized)? "YES" : "NO"}</TableCell>
							<TableCell align="right">{applicant.applicants_num}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}