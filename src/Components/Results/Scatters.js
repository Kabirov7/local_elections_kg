import React, {useState, useEffect, useContext} from "react";
import Scatter2d from "../form/scatter2d";
import Scatter1d from "../form/scatter1d";

const Scatters = (props) => {
	const [allApplicants, setAllApplicants] = useState()

	const {applicants} = props

	useEffect(() => {
		setAllApplicants(applicants)
	}, [])


	useEffect(() => {
	}, [applicants])
	return (
		<div>
			<Scatter2d/>
			{/*<Scatter1d/>*/}
		</div>
	)
}

export default Scatters;