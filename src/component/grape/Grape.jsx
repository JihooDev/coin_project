import React, { useEffect, useRef } from "react";
import styles from "./grape.module.css";
import {
  axisBottom,
  axisRight,
  AxisScale,
  curveCardinal,
  line,
  scaleLinear,
  select,
  DragBehavior,
  drag,
  nice,
  max,
  min,
} from "d3";

const Grape = ({ data, it, setModal }) => {
  const svgRef = useRef();

  useEffect(() => {
    // 1 _ Scale 정의 (ref 가져오기)
    const svg = select(svgRef.current);

    // 2 _ xScale 값 정의
    const xScale = scaleLinear()
      .domain([0, data.length])
      // 실제 x 축 index 부터 어디 까지 정해주는것 그래서 배열의 갯수에 -1 해줘야함
      .range([0, 460]);
    // 원하는 범위 : 가로가 100% 에 차도록;

    // 3 _ yScale 값 정의
    const yScale = scaleLinear().domain([0, data.length]).range([50, 60]);

    // 4 _ axisBottom 을 사용해서 x 축 정의하기
    const xAxis = axisBottom(xScale)
      // => 인자로 xScale 필요
      .ticks(data.length)
      // => ticks 의 갯수는 data의 갯수만큼
      .tickFormat((index) => index);
    // ticks 의 숫자가 0이 아닌 1부터 시작;

    const yAxis = axisRight(yScale).ticks(data.length);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(data))
      .attr("fill", "none")
      .attr("stroke", `${data[0] < data[5] ? "red" : "green"}`)
      .attr("stroke-width", "2px")
      .attr("transform", "translate(0,100)")
      .attr("x1", 0)
      .attr("x2", 100)
      .attr("y1", 30);
  });

  const offModal = (e) => {
    if (e.target.id === "grape") {
      setModal(false);
    }
  };

  return (
    <div className={styles.grape} id="grape" onClick={offModal}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>{it.name}</h1>
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`}
            alt="로고"
          />
          <div className={styles.now_price}>
            <h1>현재 평가액</h1>
            <p>${it.quote.USD.price}</p>
          </div>
        </div>
        <div className={styles.svg_box}>
          <svg ref={svgRef} className="grape_container"></svg>
          <div className={styles.price}>
            {data.map((it) => {
              return (
                <p
                  style={{
                    color: String(it).charAt("-") === "-" ? "red" : "green",
                  }}
                >
                  ${String(it).slice(0, 6)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Grape;
