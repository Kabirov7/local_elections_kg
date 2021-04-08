import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "../../App.css"


const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	li: {
		fontSize: "15px",
	},
	title:{
		fontWeight: 700,
		padding: 0,
		// margin: "25px 0 10px 0",

		fontSize: 17,
		['@media (max-width:780px)']: {
			fontSize: 15
		},

		['@media (max-width:500px)']: {
			fontSize: 14
		},

		['@media (max-width:350px)']: {
			fontSize: 13
		}
	}
}));

const SelectBox = (props) => {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const {index, response, returnAnswer, exist, answers} = props

	useEffect(() => {
		if (response) {
			setValue(response)
		}
	}, [response])


	const handleChange = (event) => {
		setValue(event.target.value);
		returnAnswer(event.target.value)
	};

	const handleClose = (event) => {
		setOpen(false)
	};

	const handleOpen = (event) => {
		setOpen(true)
	}

	return (
		<div>
			<p className={classes.title}>{props.title}</p>
			<FormControl className={classes.formControl} disabled={props.locked ? true : false}>
				<InputLabel id="controlled-open-select-label">Тандоо</InputLabel>
				<Select
					labelId="controlled-open-select-label"
					id={"select" + index}
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={value}
					onChange={handleChange}>
					{answers.map((el, i) => {
						if (el != exist) {
							return <MenuItem className={classes.li} key={i} value={el}>
								{el}
							</MenuItem>
						}
					})}
				</Select>
			</FormControl>
		</div>
	)

}

export default SelectBox;