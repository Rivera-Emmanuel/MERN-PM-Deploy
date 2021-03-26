import React, {useEffect, useState} from 'react';
import { Link, navigate } from '@reach/router'
import axios from 'axios';

const Edit = (props) => {


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

    console.log(result);

    const formHandler = (e) => {

        setError("");

        e.preventDefault();

        !props.title.length >= 6 || !props.price || !props.description.length >= 5
        ? setError("error") :
        
        axios.put(`http://localhost:8000/api/products/update/${props.id}`,
            {
                title: props.title,
                price: props.price,
                description: props.description
            })
            .then(response => {
                console.log(response)
            navigate(`/product/${props.id}`);
            }) 
            .catch(err => {
                console.log(err.response);
                setError("API connection error.");
                
            });

            

    };




    return (
        <>  
            {
                error? <p style={{backgroundColor: "red"}}>{error}</p>:
                ""
            }
            <h1>Edit Product</h1>
            <form onSubmit={formHandler} className="form-group" >
                <label htmlFor="title">Title</label>
                <input placeholder={props.title} className="form-control" type="text" name="title"  onChange={(e) => props.setTitle(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input placeholder={props.price} className="form-control" type="number" name="price" onChange={(e) => props.setPrice(e.target.value)} />

                <label htmlFor="description">Description</label>
                <input placeholder={props.description} className="form-control" type="text" name="description"  onChange={(e) => props.setDescription(e.target.value)} />

                <input className="btn btn-primary mt-3 px-3" type="submit" value="Edit" />
            </form>

        </>
    );
}


export default Edit;