import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Create = (props) => {


    const validations = {
        title: "",
        price: "",
        description: "",
    }

    
    const [error, setError] = useState(validations);

    const [result, setResult] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const formHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/products/new",
            {
                title: title,
                price: price,
                description: description
            })
            .then(response => console.log(response))
            .catch(err => {
                console.log("JSON Error:", err.response.data.errors);
                setError(err.response.data.errors);
            });

            window.location.reload();
    };

    // console.log({
    //     "Error": error,
    //     "Title": title,
    //     "Price": price,
    //     "Description": description
    // });

    console.log("Error",error);




    return (
        <>  
            {/* <span className="text-danger">
                {
                error ? error.filter(e => e.name =="ValidatorError").map(e => e.message)
                : ""
                }</span> */}
            <h1>Product Manager</h1>
            <form onSubmit={formHandler} className="form-group" >
                <label htmlFor="title">Title</label>
                <input className="form-control" 
                type="text" name="title" 
                value={title}
                placeholder={
                    error.title ? error.title.message:
                    ""
                }
                onChange={(e) => 
                setTitle(e.target.value)} />

                <label htmlFor="price">Price</label>
                <input className="form-control" 
                type="number" name="price" 
                value={price}
                placeholder={
                    error.price ? error.price.message:
                    ""
                }
                onChange={(e) => setPrice(e.target.value)} />

                <label htmlFor="description">Description</label>
                <input className="form-control" 
                type="text" name="description" 
                value={description} 
                placeholder={
                    error.description ? error.description.message:
                    ""
                }
                onChange={(e) => setDescription(e.target.value)} />

                <input className="btn btn-primary mt-3 px-3" type="submit" value="Create Create" />
            </form>

        </>
    );
}

export default Create;