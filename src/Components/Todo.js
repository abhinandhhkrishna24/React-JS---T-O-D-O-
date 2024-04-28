import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [editId, setEditId] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmitt = (event) => {
    event.preventDefault();
    if (todo.trim() !== "") {
      if (editId) {
        const updatedList = todoList.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        setTodoList(updatedList);
        setEditId(0);
      } else {
        setTodoList([
          ...todoList,
          { list: todo, id: Date.now(), status: false },
        ]);
      }
      setTodo("");
    }
  };

  const onDelete = (id, list) => {
    if (list === "todoList") {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    } else {
      setCompletedList(completedList.filter((todo) => todo.id !== id));
    }
  };

  const onComplete = (id) => {
    const completedItem = todoList.find((item) => item.id === id);
    setCompletedList([...completedList, { ...completedItem, status: true }]);
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const onIncomplete = (id) => {
    const incompleteItem = completedList.find((item) => item.id === id);
    setTodoList([...todoList, { ...incompleteItem, status: false }]);
    setCompletedList(completedList.filter((item) => item.id !== id));
  };

  const onEdit = (id, list) => {
    const editItem =
      list === "todoList"
        ? todoList.find((todo) => todo.id === id)
        : completedList.find((todo) => todo.id === id);
    setTodo(editItem.list);
    setEditId(editItem.id);
  };

  const filteredList = showCompleted ? completedList : todoList;

  return (
    <>
      <div className="page-container">
        <div className="container">
          <h3>T O D O - R E A C T</h3>
          <form className="form-container" onSubmit={handleSubmitt}>
            <input
              className="input"
              value={todo}
              type="text"
              ref={inputRef}
              placeholder="What's new?"
              onChange={(event) => setTodo(event.target.value)}
            />
            <button type="submit" className="btn">
              {editId ? "EDIT" : "ADD"}
            </button>
          </form>

          {!showCompleted && (
            <div className="buttons-container">
              <button
                onClick={() => setShowCompleted(false)}
                className="btn-sec"
              >
                TODO
              </button>
              <button
                onClick={() => setShowCompleted(true)}
                className="btn-sec"
              >
                COMPLETED
              </button>
            </div>
          )}
          {showCompleted && (
            <div className="buttons-container">
              <button
                onClick={() => setShowCompleted(false)}
                className="btn-sec"
              >
                TodoList
              </button>
            </div>
          )}
          <div className="list-container">
            <ul>
              {filteredList.map((todo) => (
                <li
                  key={todo.id}
                  className={`list-item ${todo.status ? "completed" : ""}`}
                >
                  <div className="list-item-list">{todo.list}</div>
                  <div className="list-item-icons">
                    {!showCompleted && (
                      <FaRegStar
                        className="icon-complete"
                        title="complete"
                        onClick={() => onComplete(todo.id)}
                      />
                    )}
                    {showCompleted && (
                      <FaRegStar
                        className="icon-complete"
                        title="incomplete"
                        onClick={() => onIncomplete(todo.id)}
                      />
                    )}
                    <MdOutlineEdit
                      className="icon-edit"
                      title="edit"
                      onClick={() =>
                        onEdit(
                          todo.id,
                          showCompleted ? "completedList" : "todoList"
                        )
                      }
                    />
                    <RiDeleteBin3Line
                      className="icon-delete"
                      title="delete"
                      onClick={() =>
                        onDelete(
                          todo.id,
                          showCompleted ? "completedList" : "todoList"
                        )
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
