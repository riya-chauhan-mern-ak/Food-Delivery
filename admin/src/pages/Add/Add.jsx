import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name:'',
    description: '',
    category: 'Salad',
    price: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if(!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category); 
    formData.append("price", Number(data.price) || 0);

    const baseUrl = import.meta.env.VITE_BASE_URL;
      await toast.promise(
      axios.post(`${baseUrl}/api/food/create`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
      }),
      {
        pending: "Adding food item...",
        success: "Food item added successfully!",
        error: "Failed to add food item. Please try again.",
      }
      );
      setData({
      name: '',
      description: '',
      category: 'Salad',
      price: ''
      });
      setImage(false);
    
  }


  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} />
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here.." required/>
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea
            type="text"
            name="description"
            placeholder="Type here.."
            rows={6}
            required
            onChange={onChangeHandler}
            value={data.description}
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category} >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
