import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setValue] = useState([]);

  useEffect(() => {

const fetchData = async () => {
    // const respo = await fetch(`http://localhost:7071/api/HttpTriggerSQL`, { //dev
    const respo = await fetch(`https://qsv3functionapp.azurewebsites.net/api/HttpTriggerSQL`, { //prod
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    const responseData = await respo.json();// the .json() is what makes it readable in the browser, it's something about the 'promise'
    // console.log(responseData)
    setValue(responseData)
  };
  fetchData();

}, [])
  
return (
  <div className="container mt-4">
    <table className="table table-bordered table-dark">
      <thead className="thead-light">
        <tr>
          <th>ID</th>
          <th>Created Date</th>
          <th>Messages</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.ID_column}>
            <td>{item.ID_column}</td>
            <td>{item.createdDate}</td>
            <td>{item.Messages}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


}

export default App;