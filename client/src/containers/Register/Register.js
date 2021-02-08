import React, { useEffect, useState } from "react";
import axios from "axios";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";
import TextInputPassword from "../../components/TextInputLabel/TextInputPassword";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import store from "../../store/store";
import "./Register.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

// documentation for storing password to DB: www.youtube.com/watch?v=vxu1RrR0vbw
// code for login: https://github.com/conorbailey90/node-js-passport-login-postgresql/tree/master/views

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [errorMsgName, seterrorMsgName] = useState("");
	const [errorMsgEmail, seterrorMsgEmail] = useState("");
	const [errorMsgPasswordEmpty, seterrorMsgPasswordEmpty] = useState("");
	const [errorMsgPasswordsDontMatch, seterrorMsgPasswordsDontMatch] = useState(
		""
	);

	const submit = () => {
		const data = {
			name: name,
			email: email,
			password: password,
			password2: password2,
		};

		axios
			.post("/register", data)
			.then((res) => localStorage.setItem("token", res.data.jwtToken))
			.then(() => store.dispatch({ type: "LOGIN" }))
			.catch((err) => createErrorMsgs(err));
	};

	const createErrorMsgs = (err) => {
		seterrorMsgName(err.response.data.name);
		seterrorMsgEmail(err.response.data.email);
		seterrorMsgPasswordEmpty(err.response.data.passwordEmpty);
		seterrorMsgPasswordsDontMatch(err.response.data.passwordsDontMatch);
	};

	return (
		<>
			<div className="register-container">
				<h1 style={{ marginBottom: "2rem", color: "#fff" }}>
					Podcast Hosting Made Easy
				</h1>
				<div>
					<TextInputLabel
						label="Full Name"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{errorMsgName ? <ErrorMessage errorMsg={errorMsgName} /> : null}
				</div>
				<div>
					<TextInputLabel
						label="Email Address"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errorMsgEmail ? <ErrorMessage errorMsg={errorMsgEmail} /> : null}
				</div>
				<div>
					<TextInputPassword
						label="Password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{errorMsgPasswordEmpty ? (
						<ErrorMessage errorMsg={errorMsgPasswordEmpty} />
					) : null}
				</div>
				<div>
					<TextInputPassword
						label="Confirm Password"
						placeholder="Confirm Password"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					{errorMsgPasswordsDontMatch ? (
						<ErrorMessage errorMsg={errorMsgPasswordsDontMatch} />
					) : null}
				</div>
				<div className="register-button">
					<PrimaryButton style={{ width: "100%" }} title="Submit" fx={submit} />
				</div>
				<p style={{ color: "grey", marginTop: "1rem", textAlign: "center" }}>
					<Link
						style={{
							textDecoration: "none",
							color: "grey",
						}}
						to="/login"
					>
						Already have an account? Sign in
					</Link>
				</p>
			</div>
		</>
	);
}

export default Register;
