import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {
	FacebookShareButton,
	TwitterShareButton,
	VKShareButton,
} from "react-share";
import {
	FacebookIcon,
	TwitterIcon,
	VKIcon,
} from "react-share";


import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		gridTemplateRows: "auto"
	}
}));
const ShareBtn = (props) => {
	const classes = makeStyles()
	const {nearest, texts, url} = props;
	const textForShare = "Мага жакын партия — " + nearest + "." + "\n\n" + texts.join('. ') + "\n\n" + `Кайсы партиялардын позициясы мага жана сага жакын экенин билип ал:`

	return (
		<Grid container direction="row"
					justify="space-between"
					alignItems="center">
			<Grid item>
				<FacebookShareButton
					url={url}
					quote={textForShare}
				>
					<div>
						<FacebookIcon
							style={{borderRadius: "50%"}}
							size={"2.1rem"}
						/>
					</div>
				</FacebookShareButton>
			</Grid>
			<Grid item>
				<TwitterShareButton
					url={url}
					title={textForShare}
				>
					<div>
						<TwitterIcon
							style={{borderRadius: "50%"}}
							size={"2.1rem"}
						/>
					</div>
				</TwitterShareButton>
			</Grid>
			<Grid item>
				<VKShareButton
					url={url}
					title={textForShare}
				>
					<div>
						<VKIcon
							style={{borderRadius: "50%"}}
							size={"2.1rem"}
						/>
					</div>
				</VKShareButton>
			</Grid>
		</Grid>
	)
}

export default ShareBtn;
