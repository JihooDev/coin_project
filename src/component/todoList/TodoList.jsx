import React, { useEffect, useRef, useState } from "react";
import TodoItem from "../todoItem/TodoItem";
import styles from "./todoList.module.css";

const TodoList = ({ todoData, setTodoData, dataId }) => {
  const [inputData, setInputData] = useState("");

  const inputRef = useRef("");

  const createTodo = (e) => {
    e.preventDefault();
    setTodoData([...todoData, { data: inputData, id: dataId.current }]);
    dataId.current++;
    setInputData("");
  };

  const deleteTodo = (id) => {
    if (window.confirm(`정말 삭제하시겠습니까?`)) {
      setTodoData(todoData.filter((it) => it.id !== id));
    }
  };

  const onChange = (e) => {
    setInputData(e.target.value);
  };

  const editTodo = (targetId, newContent) => {
    setTodoData(
      todoData.map((it) =>
        it.id === targetId ? { ...it, data: newContent } : it
      )
    );
  };

  return (
    <div className={styles.list}>
      <form>
        <input
          type="text"
          placeholder="내용을 입력하세요"
          value={inputData}
          onChange={onChange}
          ref={inputRef}
        />
        <button onClick={createTodo}>Add</button>
      </form>
      {todoData.map((it) => {
        return (
          <TodoItem
            todoData={todoData}
            setTodoData={setTodoData}
            deleteTodo={deleteTodo}
            inputData={inputData}
            it={it}
            editTodo={editTodo}
            key={it.id}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
