import axios from 'axios';
import React, { useState } from 'react';

function AddCategory(props) {
    const [categoryName, setCategoryName] = useState("");
    const handleAddCategory = () => {
        console.log("Category Added: ", categoryName);
        const categoryData = {
            id:0,
            name:categoryName
        }
        axios.post("http://localhost:8080/vendor/add_category",categoryData)
        .then((result)=>{
            if(result.data.status === "success"){
                alert("Category Added Successfully")
                props.navigation.navigate("go-vendorCategories")
            }else{
                alert("Failed to Add Category")
            }
        })
    };

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Add Category</h2>
            <input 
                type="text" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Enter category name" 
                style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "20px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    fontSize: "16px"
                }}
            />
            <button 
                onClick={handleAddCategory} 
                style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "16px",
                    cursor: "pointer"
                }}
            >
                Add Category
            </button>
        </div>
    );
}

export default AddCategory;
