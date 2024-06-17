import React, { useEffect, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [suggester, setSuggester] = useState([]);
  // const [style,setStyle]=useState('');
  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.frontendeval.com/fake/food/${search}`
      );
      const suggestions = await data.json();
      // console.log(suggestions);
      setSuggester(suggestions);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (e) => {
    //  console.log(e.target.innerHTML);
    const obj = {
      id: Date.now(),
      data: e.target.innerHTML,
      isDone: false,
    };
    //  setItems([...items, e.target.innerHTML]);
    const newitem = [...items];
    newitem.push(obj);
    setItems(newitem);
    setSearch("");
  };
  const handleDiff = (e) => {
    // console.log(e.currentTarget);
    // console.log(e.target);
    if (e.target.innerHTML == "✔") handleComp();
  };
  const handleDelete = (id) => {
    const copyItems = [...items];
    const newList = copyItems.filter((item) => item.id != id);
    setItems(newList);
  };
  const handleComp = (id) => {
    // if (style == "line-through") setStyle('')
    // else setStyle("line-through");
    const copyItems = [...items];
    const newBucketList = copyItems.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setItems(newBucketList);
  };
  const handleActions = (e) => {
    const action = e.target.getAttribute("data-id");
    const [type, id] = action.split(":");
    console.log(type, id);
    if (type === "update") {
      handleComp(id);
    } else if (type === "delete") {
      handleDelete(id);
    }
  };
  useEffect(() => {
    if (search.length > 1) fetchData(search);
  }, [search]);
  return (
    <div className=" flex flex-col justify-center items-center bg-gray-50">
      <h1 className="p-2 text-2xl">My Shopping List</h1>
      <div className="flex flex-col justify-center items-center">
        <input
          className=" flex p-1 "
          type="text"
          placeholder="Add Shopping List"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {search && (
        <div
          className="bg-gray-100 px-10 py-1 m-1"
          onClick={(e) => handleClick(e)}
        >
          {
            <div className="flex flex-col cursor-pointer overflow-y-auto h-40">
              {suggester.map((item, index) => {
                return <p key={item}>{item}</p>;
              })}
            </div>
          }
        </div>
      )}
      <div className="m-5 bg-gray-100 p-4 rounded-xl" onClick={handleActions}>
        {items.map((item) => {
          return (
            <div
              key={item.id}
              name={item.data}
              className={`flex flex-row justify-between gap-2 p-1
                 ${item.isDone ? "line-through" : ""}`}
            >
              <p
                className="text-xl flex cursor-pointer flex-start"
                data-id={`update:${item.id}`}
                key={item.id}
                // onClick={() => handleComp(item.id)}
              >
                ✔
              </p>
              <span className="text-xl flex justify-center">{item.data}</span>
              <span
                className="text-xl flex cursor-pointer float-end"
                data-id={`delete:${item.id}`}
                // onClick={() => handleDelete(item.id)}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
