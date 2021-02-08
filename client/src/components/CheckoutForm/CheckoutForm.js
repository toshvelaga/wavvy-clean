import React, { Component } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";

class CheckoutForm extends Component {
	handleSubmit = async (event) => {
		event.preventDefault();

		const { stripe, elements } = this.props;
		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		const result = await stripe.createToken(card);
		if (result.error) {
			console.log(result.error.message);
		} else {
			console.log(result.token);
			// pass the token to your backend API
		}
	};

	render() {
		return (
			<div>
				<div class="product-info">
					<h3 className="product-title">Pro</h3>
					<h4 className="product-price">$10</h4>
				</div>
				<form onSubmit={this.handleSubmit}>
					<CardSection />
					<button disabled={!this.props.stripe} className="btn-pay">
						Buy Now
					</button>
				</form>
			</div>
		);
	}
}

export default function InjectedCheckoutForm() {
	return (
		<ElementsConsumer>
			{({ stripe, elements }) => (
				<CheckoutForm stripe={stripe} elements={elements} />
			)}
		</ElementsConsumer>
	);
}
