import React from 'react';
import './Pricing.css';
import PriceButton from '../Buttons/PriceButton';
// import * as MdIcons from "react-icons/md";

// pricing table: https://www.w3schools.com/howto/howto_css_pricing_table.asp

function Pricing(props) {
  return (
    <div>
      <div className="columns">
        <ul className="price">
          <li className="header">Basic</li>
          <li className="grey">$ 0 / month</li>
          <li>1 Podcast</li>
          <li>Unlimited Episodes</li>
          <li>Basic Analytics</li>
          <li>Embeddable Player</li>
          <li>Email Support</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li className="grey">
            <PriceButton title="Sign Up" />
          </li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li
            className="header"
          >
            Pro
          </li>
          <li className="grey">$ 10 / month</li>
          <li>Unlimited Podcasts</li>
          <li>Unlimited Episodes</li>
          <li>Analytics</li>
          <li>Embeddable Player</li>
          <li>Email Support</li>
          <li>Customizable Website</li>
          <li style={{ color: 'transparent' }}>|</li>
          <li className="grey">
            <PriceButton title="Sign Up" />
          </li>
        </ul>
      </div>

      <div className="columns">
        <ul className="price">
          <li className="header">Premium</li>
          <li className="grey">$ 20 / month</li>
          <li>Unlimited Podcasts</li>
          <li>Unlimited Episodes</li>
          <li>Advanced Analytics</li>
          <li>Embeddable Player</li>
          <li>Email Support</li>
          <li>Customizable Website</li>
          <li>Monetization Features</li>
          <li className="grey">
            <PriceButton title="Sign Up" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pricing;
