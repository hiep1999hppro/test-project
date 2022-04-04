import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Coin from './components/Coin/Coin';
import ProjectCard from './components/ProjectCard/ProjectCard';

import './App.css';

function App() {
  const [fundProject, setFundProject] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const dataNum = 5;

  useEffect(() => {
    axios.post('http://139.99.62.190:8000/api/v1/fund_projects/filter', {
      "page": 1,
      "pageSize": 10,
      "symbol": "",
      "name": "",
      "status": "SOLD_OUT",
      "totalRaise": [100,200],
      "personal Allocation": [0.07,0.08]
    })
      .then(res => {
        setFundProject(res.data.data.fundProjects);
      })
      .catch(err => console.log(err));

    return () => {
      setFundProject([]);
      setShowMoreIndex(1);
    }
  }, []);

  /* Lay so lan xuat hien cua Show more button */
  const num = useMemo(() => {
    return Math.ceil(fundProject.length / dataNum);
  }, [fundProject]);

  return (
    <div className="App">
      <h1>2nd largest  of Transactions:</h1>
      <h3>1.10 ETH</h3>
      <ul className="moneycount-list">
        <li className="moneycount-item">
          <div className="moneycount-item-label">
            <Coin />
            <span className="moneycount-item-text moneycount-item-text--total">Total transactions:</span>
          </div>
          <div className="moneycount-item-num">79</div>
        </li>
        <li className="moneycount-item">
          <div className="moneycount-item-label">
            <Coin />
            <span className="moneycount-item-text moneycount-item-text--avgblock">AVG of block time:</span>
          </div>
          <div className="moneycount-item-num">19.455</div>
        </li>
        <li className="moneycount-item">
          <div className="moneycount-item-label">
            <Coin />
            <span className="moneycount-item-text moneycount-item-text--avgeth">AVG of ETH/transactions:</span>
          </div>
          <div className="moneycount-item-num">1.10 ETH</div>
        </li>
      </ul>
      <ul className="card-list">
        {fundProject.slice(0, dataNum * showMoreIndex).map(project => {
          return (
            <ProjectCard 
              key={project._id} 
              photo={project.coverPhoto}
              coverPhoto={project.photo}
              title={project.name} 
              status={project.status} 
              desc={project.symbol} 
              price={project.totalRaise} 
              allocation={project.personalAllocation}
              time={project.startOn} />
          );
        })}
      </ul>
      {
        /* Check dieu kien de hien thi nut Show more */
        fundProject.length >= dataNum && showMoreIndex < num && 
          <button className="show-more-btn" onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setShowMoreIndex(showMoreIndex + 1);
            }, 1000);
          }}>
            {loading ? '... Loading' : 'See All Funded Projects'}
          </button>
      } 
    </div>
  );
}

export default App;
