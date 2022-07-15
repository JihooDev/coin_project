import React, { useEffect, useRef, useState } from 'react';
import styles from './grape.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grape = ({ data, it, setModal, getCoinData }) => {
	const offModal = e => {
		if (e.target.id === 'grape') {
			setModal(false);
		}
	};

	const dayList = [
		{ id: 0, days: '90일' },
		{ id: 1, days: '60일' },
		{ id: 2, days: '30일' },
		{ id: 3, days: '1일' },
		{ id: 4, days: '24시간' },
		{ id: 5, days: '1시간' },
	];

	const options = {
		plugins: {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
			legend: {
				labels: {
					font: 15,
				},
			},
		},
	};

	const labels = dayList.map(it => {
		return it.days;
	});

	const coinData = {
		labels,
		datasets: [
			{
				label: '거래량',
				data: data,
				borderColor: 'rgba(255, 99, 132, 0.5)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
		options: {
			layout: {
				padding: '20px',
			},
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	return (
		<div className={styles.grape} id="grape" onClick={offModal}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<h1>{it.name}</h1>
					<img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`} alt="로고" />
					<div className={styles.now_price}>
						<h1>현재 평가액</h1>
						<p>${String(it.quote.USD.price).slice(0, 9)}</p>
					</div>
				</div>
				<div className={styles.svg_box}>
					<Line data={coinData} options={options}></Line>
					<p className={styles.price_data}></p>
					<div className={styles.price}>
						<div className={styles.days}></div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Grape;
