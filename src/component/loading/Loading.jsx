import React from "react";
import styles from "./loading.module.css";
const Loading = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>정보를 가져오는 중 입니다.</h1>
      </div>
    </div>
  );
};

export default Loading;
