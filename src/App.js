import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setValue] = useState([]);
  const [userInput, setUserInput] = useState('');

  // useEfect is just for retrieving data, the rest is for updating 
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
  useEffect(() => { fetchData();}, [])
// this is the data updater part 

  // Step 3: Update State on Input Change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Step 4: Create an Object with User Input
  const createObject = () => {
    console.log(userInput)
    const dataObject = {
      Message: userInput,
    };
    // Step 5: Send Object to API Endpoint

    sendDataToApi(dataObject);
    setUserInput(''); //reset input box
    fetchData(); //refresh table

  };

  const sendDataToApi = (dataObject) => {
  // fetch(`http://localhost:7071/api/Updater`, { //dev
  fetch(`https://qsv3functionapp.azurewebsites.net/api/Updater`, { //prod
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataObject) //doesn't work without the stringify
  }) 
  .then(response => response.json())
  .then(data => {
    // Handle the API response as needed
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });}

return (

  <Fragment>
  {/* Step 1: Capture User Input */}
  <input type="text" value={userInput} onChange={handleInputChange} />

  {/* Trigger API call */}
  <button onClick={createObject}>Submit</button>

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
  </Fragment>
);


}

export default App;