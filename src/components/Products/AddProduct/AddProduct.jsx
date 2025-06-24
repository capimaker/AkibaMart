{/*import React, {useState, useContext} from 'react';
import {ProductContext} from "../../../context/ProductContext/ProductState";

const AddProduct = () => {
    const [name, setName] = useState("");
    const {addProduct} = useContext (ProductContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("name", name);
        AddProduct ({name});
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input 
            type = "text"
            onChange = {(e) => setName (e.target.value)}
            name ="name"
            />
            <button type="submit">Add product</button>
        </form>
    );
};

export default AddProduct;*/}