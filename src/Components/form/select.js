import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: "30%",
		maxWidth: 300
	},
	typography: {
		fontWeight: 300,

		padding: 0,
		paddingBottom: 10,
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
	}
}));

export default function MySelectBox(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState('');
	const [subAnswers, setSubAnswers] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	const {title, answers, returnAnswer, index, answersValue} = props;

	const handleChange = (event) => {
		const answerValue = answers.map(item => {
			if (item.title == event.target.value) {
				return item.value;
			}
		}).filter(Boolean)[0];
		setValue(event.target.value);
		returnAnswer(answerValue, index);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	return (<div style={{paddingTop:40}}>
			<p className={classes.typography}>
				{title}
			</p>
			<FormControl className={classes.formControl}>
				<Select
					labelId="demo-controlled-open-select-label"
					id="demo-controlled-open-select"
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={value}
					onChange={handleChange}
				>
					{/*<MenuItem value={"None"}><em>None</em></MenuItem>*/}
					{answers.map((item, id) => (
						<MenuItem value={item.title}>
							{item.title}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}