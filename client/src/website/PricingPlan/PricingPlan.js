import React from 'react';
import './PricingPlan.css';
import PriceButton from '../Buttons/PriceButton';

// https://codepen.io/danhearn/pen/LjJXmj

function PricingPlan() {
  return (
    <div className="planContainer">
      <div className="plan">
        <div className="titleContainer">
          <div className="title">Free</div>
        </div>
        <div className="infoContainer">
          <div className="prices">
            <p>$0 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div className="p desc">
            {/* <em>Great for beginners and hobbyists.</em> */}
          </div>
          <ul className="features">
            <li>1 Podcast</li>
            <li>Unlimited Episodes</li>
            <li>Basic Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li style={{ color: 'transparent' }}>|</li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title="Sign Up" />
        </div>
      </div>
      <div className="plan">
        <div className="titleContainer">
          <div className="title">Pro</div>
        </div>
        <div className="infoContainer">
          <div className="prices">
            <p>$10 </p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div className="p desc">
            {/* <em>Recommended for podcasters looking to start a movement.</em> */}
          </div>
          <ul className="features">
            <li>Unlimited Podcasts</li>
            <li>Unlimited Episodes</li>
            <li>Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li>Customizable Website</li>
            <li style={{ color: 'transparent' }}>|</li>
          </ul>
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title="Sign Up" />
        </div>
      </div>
      <div className="plan">
        <div className="titleContainer">
          <div className="title">Premium</div>
        </div>
        <div className="infoContainer">
          <div className="prices">
            <p>$20</p>
            <span style={{ marginLeft: '5px' }}>/mo</span>
          </div>
          <div className="p desc">
            <em>
              {/* Recommended for podcasters who are serious about building a big
							audience. */}
            </em>
          </div>
          <ul className="features">
            <li>Unlimited Podcasts</li>
            <li>Unlimited Episodes</li>
            <li>Advanced Analytics</li>
            <li>Embeddable Player</li>
            <li>Email Support</li>
            <li>Customizable Website</li>
            <li>Monetization Features</li>
          </ul>
          {/* <a class="selectPlan">Select Plan</a> */}
          <PriceButton title="Sign Up" />
        </div>
      </div>
    </div>
  );
}

export default PricingPlan;
