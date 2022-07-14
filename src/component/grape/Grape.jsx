import React, { useEffect, useRef, useState } from "react";
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
  svg,
  curveCardinalOpen,
} from "d3";

const Grape = ({ data, it, setModal, getCoinData }) => {
  const [priceData, setPriceData] = useState();
  const svgRef = useRef();
  const circleRef = useRef();
  const dayList = [
    { id: 0, days: "90일" },
    { id: 1, days: "60일" },
    { id: 2, days: "30일" },
    { id: 3, days: "1일" },
    { id: 4, days: "24시간" },
    { id: 5, days: "1시간" },
  ];

  useEffect(() => {
    // 1 _ Scale 정의 (ref 가져오기)
    const svg = select(svgRef.current);
    // select : 선택 할 ref 값 , selectAll 선택할 모든것의 값

    // 2 _ xScale 값 정의
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      // 실제 x 축 index 부터 어디 까지 정해주는것 그래서 배열의 갯수에 -1 해줘야함
      .range([0, 505]);
    // 원하는 범위 : 가로가 100% 에 차도록;

    // 3 _ yScale 값 정의
    const yScale = scaleLinear()
      .domain([0, data.length * 4])
      .range([0, 30]);

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
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("className", "circle")
      .attr("cx", (d, i) => {
        return xScale(i);
      })
      .attr("cy", (d) => {
        return yScale(d);
      })
      .text((dataName) => {
        setPriceData(dataName);
        return dataName;
      })
      .attr("r", 8)
      .attr("transform", "translate(0,120)")
      .attr("fill", "rgb(50, 168, 70)")
      .on("mouseleave", handleMouseLeave)
      .on("mouseover", handleMouseOver);

    svg
      .selectAll("line")
      .data(data)
      .join("path")
      .text((dataName) => {
        return dataName;
      })
      .attr("className", "line")
      .attr("d", (value) => myLine(data))
      .attr("fill", "none") // fill : 테두리를 감싸는 색상 ( none 이 아니면 default 로 black 이 지정됨)
      .attr("stroke", "rgb(50, 168, 70)") // stroke : 선의 색상
      .attr("stroke-width", 5) // stroke-width : 선의 굵기
      .attr("transform", "translate(0,120)")
      .attr("x1", 0); // transform : css의 transform 과 똑같음
  }, []);

  const offModal = (e) => {
    if (e.target.id === "grape") {
      setModal(false);
    }
  };

  const handleMouseLeave = () => {
    setPriceData(null);
  };

  const handleMouseOver = (e) => {
    setPriceData(e.target.__data__);
  };

  const zoomData = () => {
    alert();
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
            <p>${String(it.quote.USD.price).slice(0, 9)}</p>
          </div>
        </div>
        <div className={styles.svg_box}>
          <svg ref={svgRef} className="grape_container"></svg>
          <p
            className={styles.price_data}
            style={{
              color:
                String(priceData).charAt("-") === "-"
                  ? "red"
                  : "rgb(0, 168, 17)",
            }}
          >
            {priceData}
            {priceData ? "%" : null}
          </p>
          <div className={styles.price}>
            <div className={styles.days}>
              {dayList.map((dayData) => {
                return <h1 key={dayData.id}>{dayData.days}</h1>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Grape;
