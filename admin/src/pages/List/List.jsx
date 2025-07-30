import "./List.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FoodItem from "../../components/FoodItem/FoodItem";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchData = async () => {
    await toast
      .promise(axios.get(`${baseUrl}/api/food/getall`), {
        pending: "Fetching food list...",
        success: {
          render({ data }) {
            if (data?.data?.success) {
              setList(data?.data?.data);
              return "Food list fetched successfully!";
            } else {
              throw new Error(data?.data?.message || "Failed to fetch data");
            }
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to fetch data";
          },
        },
      })
      .finally(() => setLoading(false));
  };

  const removeItem = async (item) => {
    await toast.promise(
      axios.delete(`${baseUrl}/api/food/delete/${item._id}`),
      {
        pending: "Deleting food item...",
        success: {
          render({ data }) {
            if (data?.data?.success) {
              setList((prev) => prev.filter((i) => i._id !== item._id));
              return "Food item deleted successfully!";
            } else {
              throw new Error(data?.data?.message || "Failed to delete item");
            }
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || "Failed to delete item";
          },
        },
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      {/* <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list?.length > 0 &&
          list.map((item) => {
            return (
              <div key={item._id} className="list-table-format">
                <img src={`${baseUrl}/images/${item.image}`} alt={item.image} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className="cursor" onClick={() => removeItem(item)}>
                  X
                </p>
              </div>
            );
          })}
      </div> */}
      <div className="food-display-list">
        {list?.length > 0 &&
          list?.map((item, index) => {
            return (
              <FoodItem
                key={index}
                id={item?._id}
                name={item?.name}
                price={item?.price}
                image={item?.image}
                description={item?.description}
                category={item?.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
