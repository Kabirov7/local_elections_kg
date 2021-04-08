import React, {useState, useContext, useCallback, useEffect} from "react";
import firebase from "../../util/Firebase";
import MyTextField from "../form/TextField";
import {withRouter, Redirect} from "react-router";
import {AuthContext} from "../../util/Auth";
import {Button} from "@material-ui/core";
import Text from "../form/text";
import RadioButton from "../form/radioButton";

const Login = ({history}) => {
	const [phone, setPhone] = useState(null);
	const [otp, setOtp] = useState(null);
	const [sentCode, setSentCode] = useState(null);
	const [texts, setTexts] = useState([]);
	const [language, setLanguage] = useState(null);

	const {currentUser} = useContext(AuthContext)

	useEffect(() => {
		const db = firebase.firestore();
		let curr_texts = (language == "ru") ? "login" : "login_kg";
		db.collection("texts").doc(curr_texts)
			.onSnapshot((doc) => {
				setTexts(doc.data().texts);
			});
	}, [language]);

	if (currentUser) {
		return <Redirect to={"/applicants"}/>
	}

	const returnphone = (answer) => {
		setPhone(answer)
	}

	const returnotp = (answer) => {
		setOtp(answer)
	}

	const setUpRecaptcha = () => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
			'size': 'invisible',
			'callback': (response) => {
				onSignInSubmit();
			}

		});
	};

	const onSignInSubmit = () => {
		setUpRecaptcha();
		const phoneNumber = phone;
		const appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setSentCode(true)
			}).catch((error) => {
			console.log(error)
		});

	}

	const onSubmitOtp = (e) => {
		let otpInput = otp;
		let optConfirm = window.confirmationResult;
		optConfirm
			.confirm(otpInput)
			.then(function (result) {
				let user = result.user;
			})
			.catch(function (error) {
				console.log(error);
				alert("Incorrect OTP");
			});
	};
	const returnLanguage = (answer) => {
		setLanguage(["ru", "kg"][answer.split("_")[1] - 1])

	}
	return (
		<div style={{marginTop: 50}}>
			{!language ? < RadioButton
					title={"Какой язык?"}
					answers={["ru", "kg"]}
					values={["ru", "kg"]}
					returnAnswer={returnLanguage}
				/> :
				<div>
					<div id="recaptcha-container"></div>
					<div>
						<img src="https://kloop.kg/wp-content/uploads/2020/10/rZkloop-political-compass.jpg" style={{width: "30%"}}
								 alt=""/>
						{texts.map((item, i) => <Text text={item}/>)}
						<MyTextField
							index={0}
							disabled={sentCode}
							response={phone}
							returnAnswer={returnphone}
							label={"+996555333222"}
							title={(language == "ru") ? "Ваш номер" : "Сиздин бөлмөнүн номери"}/>
						{!(sentCode) &&
						<Button
							style={{marginTop: 15}}
							variant="contained"
							color="primary"
							onClick={() => onSignInSubmit()}
						>
							{(language == "ru") ? "отправить код" : "отправить код КР"}
						</Button>}</div>
					{(sentCode) && <div style={{marginTop: 20}}>
						<MyTextField index={1}
												 response={0}
												 label={(language == "ru") ? "Код из смс" : "код из смс КР" }
												 returnAnswer={returnotp}
												 title={(language == "ru") ? "Напишите код из смс" : "Напишите код из смс КР"  }/>
						<Button
							style={{marginTop: 15}}
							variant="contained"
							color="secondary"
							onClick={() => onSubmitOtp()}>
							{(language == "ru") ? "отправить" : "отправить КР"}
						</Button></div>}
				</div>
			}
		</div>
	)
}

export default withRouter(Login);
