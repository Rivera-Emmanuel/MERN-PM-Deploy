import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router'
import axios from 'axios';

const Show = (props) => {

    const {recordDelete} = props;

    const [result, setResult] = useState([]);
    const [error, setError] = useState("");



    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${props.id}`)
            .then(response => setResult(response.data))
            .catch(err => {
                console.log(err)
                setError("API connection error.")
            });
    }, []);

    props.setTitle(result.title);
    props.setPrice(result.price);
    props.setDescription(result.description);

    console.log(result);


    return (

        <div>
            <div>
                <h1>{result.title}</h1>
                <h4>Price: {result.price}</h4>
                <h4>Description: {result.description}</h4>
                <Link to={`/${result._id}/edit`}>Edit</Link>

            </div>

            <div>
                <br/>
                <button onClick={(e) => recordDelete(result._id)}>Delete</button>
            </div>

        </div>
    );
}


export default Show;