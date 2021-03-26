import React from 'react';
import { Link } from '@reach/router'

const List = (props) => {

    const {result, recordDelete} = props;

    return (
        <div>
            <h1>All Products:</h1>
            {result.map((prod) => {
                return (

                    <p>
                        <Link to={`/product/${prod._id}`}>{prod.title}</Link>  
                        <button onClick={(e) => recordDelete(prod._id)}>Delete</button>
                    </p>


                )

            })}

        </div>
    );
}


export default List;