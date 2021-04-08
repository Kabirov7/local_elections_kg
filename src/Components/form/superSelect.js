import React, {useEffect, useState} from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		width: "70%"
	},
	typography: {
		fontSize: "19px"
	},
	radio: {
		fontSize: "15px",
		color: "black"

	}
}));


function SuperSelect(props) {
	const [value, setValue] = useState("");
	const [value_2, setValue_2] = useState("");
	const [currentParties, setCurrentParties] = useState([])
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const {title, answers, returnAnswer, index} = props;


	useEffect(() => {
		const parties = answers.map((item, id) => item.answers)
		let indexOf = answers.map((item, id) => item.title == value).indexOf(true)
		setCurrentParties(parties[indexOf])
		setValue_2("")

	}, [value])

	const handleChange = (event) => {
		setValue(event.target.value);
		returnAnswer(undefined, index)
	};

	const handleChange_2 = e => {
		setValue_2(e.target.value);
		const allData = value + "=>" + e.target.value
		returnAnswer(allData, index)

	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<div>
				<p classes={classes.typography} variant="h6" component="h6">
					{title}
				</p>
				<FormControl className={classes.formControl}>
					<Select
						open={open}
						value={value}
						onChange={handleChange}
						onClose={handleClose}
						onOpen={handleOpen}
						input={<Input id="grouped-select"/>}
					>
						{answers.map((item, id) => (
							<MenuItem value={item.title}>
								{item.title}
							</MenuItem>))}
					</Select>
				</FormControl>
				{currentParties && <div style={{paddingTop: 15}}>
					<FormControl error={true} style={{margin: 0, padding: 0}} const='fieldset'>
						<RadioGroup value={value_2} onChange={handleChange_2}>
							{currentParties.map((item, i) =>
								<FormControlLabel
									key={i}
									value={item}
									control={<Radio/>}
									label={
										<p className={classes.radio}>{item}</p>
									}/>)
							}
						</RadioGroup>
					</FormControl>
				</div>}
			</div>
		</div>
	);
}

export default SuperSelect;