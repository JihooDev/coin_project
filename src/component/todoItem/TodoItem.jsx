import React, { useEffect, useState } from "react";
import styles from "./todoItem.module.css";

const TodoItem = ({ todoData, deleteTodo, inputData, it, editTodo }) => {
  const [edit, setEdit] = useState(false);
  const [localContent, setLocalContent] = useState(it.data);

  const handleEdit = () => {
    setEdit(!edit);
    setLocalContent(it.data);
  };

  return (
    <section>
      <div className={styles.dataList} key={it.id}>
        {edit ? (
          <textarea
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
          >
            {it.data}
          </textarea>
        ) : (
          <h1>{it.data}</h1>
        )}
        <div className={styles.btn_box}>
          {edit ? (
            <div>
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                수정취소
              </button>
              <button
                onClick={() => {
                  editTodo(it.id, localContent);
                  handleEdit();
                }}
              >
                수정완료
              </button>
            </div>
          ) : (
            <div>
              <button onClick={handleEdit}>수정</button>
              <button
                onClick={() => {
                  deleteTodo(it.id);
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TodoItem;
