import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import firebase from "../../util/Firebase";
import Button from "@material-ui/core/Button";
import {FormControlLabel, makeStyles, Switch} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	typography: {
		fontSize: "24px",
		fontFamily: 'Roboto, sans-serif',

	}
}));
const UploadFile = (props) => {
	const [image, setImage] = useState(null);
	const [isImage, setIsImage] = useState(null);
	const [progress, setProgress] = useState(null);
	const [optionalPhoto, setOptionalPhoto] = useState(false)


	const classes = useStyles();
	const {title, index, returnAnswer, lang} = props;

	const handleChange = e => {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
			const file = e.target.files[0]
			const file_name = file.lastModified + file.name + "___" + new Date()
			firebase.storage().ref(`images/${file_name}`).put(e.target.files[0])
				.on(
					"state_changed",
					snapshot => {
						let currentProgress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						setProgress(currentProgress);
					},
					error => {
						console.log(error)
					},
					() => {
						firebase.storage()
							.ref("images")
							.child(file_name)
							.getDownloadURL()
							.then(url => {
								console.log(url)
								returnAnswer(url, index)
								setIsImage(url)
							})
					}
				)
		}

	}

	useEffect(() => {
		(!optionalPhoto) ?
			returnAnswer(false, index) :
			returnAnswer("abondon", index)

	}, [optionalPhoto])

	const handleChangeOptional = e => {
		setOptionalPhoto(!optionalPhoto)

	}

	return (
		<div>
			<p classes={classes.typography} variant="h6" component="h6">
				{title}
			</p>
			{!isImage && <FormControlLabel
				control={
					<Switch
						checked={optionalPhoto}
						onChange={handleChangeOptional}
						name="checkedB"
						color="primary"
					/>
				}
				label={(lang == "ru") ? "Отказаться" : "Баш таруу"}
			/>}
			<br/>
			{!optionalPhoto && <Button
				style={{marginBottom: 15}}
				color="primary"
				variant="contained"
				component="label"
			>
				Upload File
				<input
					type="file"
					onChange={handleChange}
					hidden
				/>
			</Button>}
			<br/>
			{!optionalPhoto && progress && <Box className={classes.uploadLine} position="relative" display="inline-flex">
				<CircularProgress variant="determinate" {...{value: progress}} />
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<p variant="caption" component="div" color="textSecondary">{`${Math.round(
						progress
					)}%`}</p>
				</Box>
			</Box>}
		</div>
	)
}

export default UploadFile;
