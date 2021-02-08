import React, { useState, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Navbar from "../../components/Navbar/Navbar";
import TextInputLabel from "../../components/TextInputLabel/TextInputLabel";
import TextInputPassword from "../../components/TextInputLabel/TextInputPassword";
import axios from "axios";
import "./Settings.css";
import { useToasts } from "react-toast-notifications";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(
	`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

function Settings() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [errorMsgOldPassword, seterrorMsgOldPassword] = useState("");
	const [errorMsgPassword1, seterrorMsgPassword1] = useState("");
	const [errorMsgPassword2, seterrorMsgPassword2] = useState("");
	const [errorMsgDontMatch, seterrorMsgDontMatch] = useState("");

	// Logout clears JWT from localStorage

	const headers = { jwt_token: localStorage.token };

	const { addToast } = useToasts();

	const submit = () => {
		const data = {
			oldpassword: oldPassword,
			newpassword: newPassword,
			newpassword2: confirmNewPassword,
		};

		axios
			.patch("/update-password", data, { headers })
			.then(() =>
				addToast(
					"Password succesfully changed! Please log in using your new password.",
					{
						appearance: "success",
					}
				)
			)
			.catch((err) => createErrorMsgs(err));
	};

	const createErrorMsgs = (err) => {
		seterrorMsgOldPassword(err.response.data.oldpassword);
		seterrorMsgPassword1(err.response.data.password1Empty);
		seterrorMsgPassword2(err.response.data.password2Empty);
		seterrorMsgDontMatch(err.response.data.passwordsDontMatch);
	};

	return (
		<>
			<div style={{ paddingBottom: "5rem" }}>
				<Navbar />
			</div>
			<div
				className="create-podcast-container"
				// style={{ width: "50%", margin: "auto" }}
			>
				{/* {errorMsg && <FlashMessage message={errorMsg} />} */}

				{/* <div style={{ marginTop: "0", paddingTop: "5rem", color: "#fff" }}>
					<h1>Update Payment Settings</h1>
					<Elements stripe={stripePromise}>
						<InjectedCheckoutForm />
					</Elements>
				</div> */}

				<div
					style={{
						marginBottom: "1rem",
						paddingTop: "0rem",
					}}
				>
					<h1>Change Password</h1>
				</div>
				<div style={{ marginTop: "1rem" }}>
					<TextInputLabel
						color="black"
						label="Old Password"
						// placeholder="old password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<p style={{ color: "red", marginBottom: ".5rem" }}>
						{errorMsgOldPassword}
					</p>
				</div>
				<div style={{ marginTop: ".5rem" }}>
					<TextInputLabel
						color="black"
						label="New Password"
						// placeholder="old password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<p style={{ color: "red", marginBottom: ".5rem" }}>
						{errorMsgPassword1}
					</p>
				</div>
				<div style={{ marginTop: ".5rem" }}>
					<TextInputLabel
						color="black"
						label="Confirm New Password"
						// placeholder="old password"
						value={confirmNewPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
					/>
					<p style={{ color: "red", marginBottom: ".5rem" }}>
						{errorMsgPassword2 || errorMsgDontMatch}
					</p>
				</div>
				<div
					style={{ margin: "0 auto" }}
					className="update-profile-button-container"
				>
					<PrimaryButton
						style={{ width: "100%" }}
						title="Update Profile"
						fx={submit}
					/>
				</div>
			</div>
		</>
	);
}

export default Settings;
