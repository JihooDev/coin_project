import React, { useRef, useState, useEffect } from "react";
import styles from "./coinItem.module.css";
import { select, line } from "d3";

const CoinItem = ({ it }) => {
  const { name, cmc_rank, logo } = it;
  const price = it.quote.USD;
  const svgRef = useRef();
  const grapeData = useEffect(() => {
    const svg = select(svgRef.current);

    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => 200 - value);

    svg
      .selectAll("path")
      .data([
        price.percent_change_90d,
        price.percent_change_60d,
        price.percent_change_30d,
        price.percent_change_24h,
        price.percent_change_7d,
        price.percent_change_1h,
      ])
      .join((enter) => enter.append("path"))
      .attr("d", (value) => myLine(value))
      .attr("width", 500)
      .attr("fill", "none")
      .attr("stroke", "red");
  }, [it]);

  return (
    <div className={styles.items}>
      <p className={styles.num}>{cmc_rank}</p>
      <h1 className={styles.name}>
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`}
          alt="logo_Img"
        />
        {name}
        <p>{it.symbol}</p>
      </h1>
      <p className={styles.price}>
        ${price.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p>
      <p className={styles.day}>{price.percent_change_24h.toFixed(5)}</p>
      <p className={styles.week}>{price.percent_change_7d.toFixed(5)}</p>
      <p className={styles.market}>${price.market_cap.toFixed(2)}</p>
      <p className={styles.volume}>${price.volume_24h.toFixed(2)}</p>
      <svg className={styles.grape} ref={svgRef} height={"100%"}></svg>
    </div>
  );
};

export default CoinItem;
