import Coin from '../Coin/Coin';

import './ProjectCard.css';

export default function Card ({photo, coverPhoto, title, status, desc, price, allocation, time}) {
  return (
    <li className="card-item">
      <div className="card-item-wrap">
        <img src={photo} alt="cardPhoto" className="card-item-img" />
        <div className="card-item-sold">{status}</div>
        <img src={coverPhoto} alt="cardCoverPhoto" className="card-item-img2" />
      </div>
      <div className="card-item-content">
        <div className="card-item-title">
          <h4>{title}</h4>
          <Coin />
        </div>
        <div className="card-item-desc">{desc}</div>
        <div className="card-item-total">
          <div className="card-item-total-label">Total Raise</div>
          <div className="card-item-total-price">{`$${price}`} Max</div>
        </div>
        <div className="card-item-allocation">
          <div className="card-item-allocation-label">Personal Allocation</div>
          <div className="card-item-allocation-price">{`$${allocation}`}</div>
        </div>
        <div className="card-item-time">IDO starts on <span> {time.slice(0,10).split('-').reverse().join('-')}</span></div>
      </div>
    </li>
  );
}