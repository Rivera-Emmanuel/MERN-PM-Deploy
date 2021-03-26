import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Create from './components/Create';
import Show from './components/Show';
import List from './components/List';
import { navigate, Router } from '@reach/router';
import Edit from './components/Edit';



function App() {

  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");



  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then(response => setResult(response.data))
      .catch(err => {
        console.log(err)
        setError("API connection error.")
      });
  }, []);

  console.log(result);


  const recordDelete = (e) => {

    axios.delete(`http://localhost:8000/api/products/delete/${e}`)
        .then(response => console.log(response))
        .catch(err => {
            console.log("JSON Error:", err.response.data.errors);
            setError(err.response.data.errors);
        })

        navigate("/");
        window.location.reload();
};


  return (
    <div className="App">

      <Router primary={true}>
        <Create path="/" />
      </Router>

      <Router>
        <Edit path="/:id/edit"
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          description={description} setDescription={setDescription}/>

        <Show path="/product/:id"
          title={title} setTitle={setTitle}
          price={price} setPrice={setPrice}
          description={description} 
          setDescription={setDescription}
          recordDelete={recordDelete} />
        <List default result={result} recordDelete={recordDelete} />
      </Router>



    </div>
  );
}

export default App;
