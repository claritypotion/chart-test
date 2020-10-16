import React, {useState} from 'react';
import './App.css';
import Chart from "./components/Chart/Chart.jsx"

const charts = {
  "mandrill":true,
  "bunny":true,
  "jackal":true,
  "horse":true,
};

const ChartList = ({charts}) => {
  const [list, setList] = useState(charts);

  const handleChange = (key) => (e) => {
    setList(Object.assign({}, list, {
      [key]: e.target.value === "on"
    }))
  }

  return <div>
    <ul>
      {Object.keys(list).map(e => 
        <li><input type="checkbox" name={e} checked={list[e]} onChange={handleChange(e)} /> {e}</li>
      )}
    </ul>
    <div>
    {Object.keys(list).map(e => 
      <React.Fragment>
        <h3>{e}</h3>
        <Chart key={e} />
      </React.Fragment>
    )}
    </div>
  </div>;
};

const App = () => {

  return (
    <div className="App">
      <ChartList charts={charts} />
    </div>
  );
};

export default App;
