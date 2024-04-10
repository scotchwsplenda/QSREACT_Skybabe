import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Data() {
  const [data, setValue] = useState([]);
  const [userInput, setUserInput] = useState('');  
  const [tableData, setTableData] = useState([]);// Initialize state to hold table data


  // useEfect is just for retrieving data, the rest is for updating 
  const fetchData = async () => {
    const respo = await fetch(`http://localhost:7071/api/HttpTriggerSQL`, { //dev
    // const respo = await fetch(`https://qsv3functionapp.azurewebsites.net/api/HttpTriggerSQL`, { //prod
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

    // Step 6. send object to JS table
    sendDataToJSTab(dataObject);


    setUserInput(''); //reset input box
    fetchData(); //refresh table

  };


  const sendDataToJSTab = (dataObject) => {
    // Update the state with the new tableData
    console.log("wecwec",tableData)
    const updatedTableData = [...tableData, dataObject.Message];
    setTableData(updatedTableData);
    console.log("updatedTableData",updatedTableData)
  }
  const sendDataToApi = (dataObject) => {
  fetch(`http://localhost:7071/api/Updater`, { //dev
  // fetch(`https://qsv3functionapp.azurewebsites.net/api/Updater`, { //prod
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

<div className='container'>
  {/* Step 1: Capture User Input */}
  <input type="text" value={userInput} onChange={handleInputChange} />

{/*the button */}
  <button onClick={createObject}>Submit</button>

{/*JS Table*/}
<h2>JS Table</h2>
<div className="container mt-4">


      {/* Render the table using tableData state */}
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
          
          </tr>
        </thead>
        <tbody>
                {tableData.map(item => (
          <tr key={item}>
            <td>{item}</td>

          </tr>
        ))}
         
          
        </tbody>
      </table>
  </div>

  

  {/* Trigger API call */}

</div>
<div>

</div>
  <div className="container mt-4">
  <h4> Sometimes refresh page to see SQL updates, sometimes works real good, sometimes server is asleep ;:-/ </h4>
  
<h2>SQL Table</h2>
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

export default Data;