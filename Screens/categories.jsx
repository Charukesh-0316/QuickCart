import axios from "axios";
import { useEffect, useState } from "react";

function Category(props) {

    const [categories,setCategories] = useState([{
        id:0,
        name:''
    }])

    useEffect(()=>{
        axios.get("http://localhost:8080/user/categories")
        .then((response) => {
          console.log(response.data.data)
          setCategories(response.data.data)
        })
        .catch((error) => {
          console.error(error);
          alert("Error", "Failed to register user");
        });   
    },[]);

    const categoryClicked = (id) =>{
        console.log(id)
        props.navigation.navigate("go-products",{id:id});
    }

      return (
        <div>
          {categories.map((result)=>{
            return(
            <div key={result.id} onClick={() => categoryClicked(result.id)}
            style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", marginBottom: "10px" }}
            >
                <h1>{result.name}</h1>
            </div>
            );
          })}
        </div>
      );
      
}

export default Category;