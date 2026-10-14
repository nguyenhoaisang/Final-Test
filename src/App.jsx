import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Do coding challenges", active: true },
    { id: 2, name: "Learn ReactJS", active: true },
    { id: 3, name: "Task done", active: false },
  ]);

  const [tab, setTab] = useState("all");

  const [text, setText] = useState("");

  function getShowList() {
    const result = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (tab === "all") {
        result.push(task);
      } else if (tab === "active" && task.active === true) {
        result.push(task);
      } else if (tab === "completed" && task.active === false) {
        result.push(task);
      }
    }
    return result;
  }

  function handleAdd(event) {
    event.preventDefault();
    if (text.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      name: text.trim(),
      active: true,
    };
    setTasks([...tasks, newTask]);
    setText("");
  }

  function handleTick(id) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.id === id) {
        newTasks.push({ id: task.id, name: task.name, active: !task.active });
      } else {
        newTasks.push(task);
      }
    }
    setTasks(newTasks);
  }

  function handleDelete(id) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks);
  }

  function handleDeleteAll() {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].active === true) {
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks);
  }

  const showList = getShowList();

  return (
    <div className="container">
      <h1 className="title">#todo</h1>

      {/* ===== Yeu cau 1 + 2: 3 Tab ===== */}
      <div className="tabs">
        <button
          className={tab === "all" ? "tab tab-selected" : "tab"}
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          className={tab === "active" ? "tab tab-selected" : "tab"}
          onClick={() => setTab("active")}
        >
          Active
        </button>
        <button
          className={tab === "completed" ? "tab tab-selected" : "tab"}
          onClick={() => setTab("completed")}
        >
          Completed
        </button>
      </div>

      {tab !== "completed" && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="add details"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn-add">
            Add
          </button>
        </form>
      )}

      <div className="list">
        {showList.map((task) => (
          <div className="item" key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={!task.active}
                onChange={() => handleTick(task.id)}
              />
              <span className={task.active ? "" : "done"}>{task.name}</span>
            </label>

            {tab === "completed" && (
              <button
                className="btn-trash"
                onClick={() => handleDelete(task.id)}
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>

      {tab === "completed" && (
        <div className="delete-all-box">
          <button className="btn-delete-all" onClick={handleDeleteAll}>
            🗑 delete all
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
