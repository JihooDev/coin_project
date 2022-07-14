import React, { useEffect, useRef } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ coinData, coinState, setCoinState }) => {
  const selectRef = useRef();
  const navigate = useNavigate();
  const copyData = [...coinData.slice(0, 20)];
  const copyData2 = [...coinData.slice(0, 50)];
  const copyData3 = [...coinData];
  useEffect(() => {
    console.log(coinData, coinState, "state");
    console.log(selectRef.current.value, "value");
  });

  const filterData = (e) => {
    switch (selectRef.current.value) {
      case "100":
        setCoinState(copyData3);
        break;

      case "50":
        setCoinState(copyData2);
        break;

      case "20":
        setCoinState(copyData);
        break;

      default:
        setCoinState(copyData3);
        break;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>BIT</h1>
      </div>
      <div className={styles.center}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          WatchList
        </button>
        <button
          onClick={() => {
            navigate("todo");
          }}
        >
          PortFolio
        </button>
      </div>
      <div className={styles.right}>
        <select name="rows" id="rows" ref={selectRef} onChange={filterData}>
          <option value="100">100개의 데이터</option>
          <option value="50">50개의 데이터</option>
          <option value="20">20개의 데이터</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
