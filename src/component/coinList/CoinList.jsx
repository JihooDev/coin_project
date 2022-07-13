import React, { useEffect, useState } from "react";
import styles from "./coinList.module.css";
import CoinItem from "../coinItem/CoinItem";

const CoinList = ({ coinState, rowData, rankData }) => {
  const [reRender, setReRender] = useState(false);

  return (
    <div className={styles.list}>
      <nav>
        <ul>
          <li className={styles.num} onClick={rowData}>
            {rankData ? "오름차순" : "내림차순"}
          </li>
          <li className={styles.name}>이름</li>
          <li className={styles.price}>가격</li>
          <li className={styles.day}>하루 거래량</li>
          <li className={styles.week}>1주 거래량</li>
          <li className={styles.market}>시가 총액</li>
          <li className={styles.volume}>거래량</li>
        </ul>
      </nav>
      {coinState.map((it) => {
        return (
          <CoinItem
            it={it}
            key={it.id}
            reRender={reRender}
            setReRender={setReRender}
          />
        );
      })}
    </div>
  );
};

export default CoinList;
