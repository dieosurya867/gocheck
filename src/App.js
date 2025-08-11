import { useState, useEffect } from "react";

const listItems = [
  { id: 1, title: "Eat", done: false },
  { id: 2, title: "Sleep", done: true },
];

function App() {
  // komponen paling atas atau parent
  const [listItems, setListItems] = useState([]);

  function handleAddItem(item) {
    setListItems((listItems) => [...listItems, item]);
    console.log("ListItem Add Item:", listItems);
  }

  function handleDeleteItem(id) {
    setListItems((listItems) => {
      const index = listItems.findIndex((item) => item.id === id);
      if (index === -1) return listItems; // tidak ditemukan, return list lama

      const deletedItem = listItems[index];
      console.log("Item dihapus:", deletedItem);

      const newList = [...listItems];
      newList.splice(index, 1); // hapus item di index tersebut
      return newList;
    });
  }

  useEffect(() => {
    console.log("List terbaru (dari useEffect):", listItems);
  }, [listItems]);

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <CheckList items={listItems} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <span className="logo">📝 GoCheck ✅</span>;
}

function Form({ onAddItem }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;

    const newItem = {
      id: Date.now(),
      title,
      done: false,
    };

    onAddItem(newItem);
    console.log("NewItem:", newItem);

    setTitle("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Ada yang mau kamu catat? 🤔</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function CheckList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <input type="checkbox" />
      <span style={{ textDecoration: item.done ? "line-through" : "" }}>
        {item.title}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <span>🗒️ Kamu punya x catatan dan baru x yg dichecklist (x%) ✅</span>
    </footer>
  );
}

export default App;
