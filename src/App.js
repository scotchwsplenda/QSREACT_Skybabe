import React, { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch(`https://qsv3functionapp.azurewebsites.net/api/HttpTriggerSQL`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setValue(res.data)
      })
  }, [])

  return <div>{value}</div>;
}

export default App;