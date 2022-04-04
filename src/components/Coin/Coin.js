import vector from '../../assets/images/vector.png';
import './Coin.css';

export default function Coin () {
  return (
    <div className="coin-container">
      <img src={vector} alt="vectorImg" className="coin-img" />
    </div>
  );
}