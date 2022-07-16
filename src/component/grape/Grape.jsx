import React, { useEffect, useRef, useState } from 'react';
import styles from './grape.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

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
		{ id: 3, days: '24시간' },
		{ id: 4, days: '7일' },
		{ id: 5, days: '1시간' },
	];

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
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
				data: data.map(it => it),
				borderColor: '#C8F1E2',
				backgroundColor: 'green',
				borderWidth: 5,
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
		<motion.div className={styles.grape} id="grape" onClick={offModal}>
			<motion.div
				initial={{ opacity: 0, transform: 'translateY(10%)' }}
				animate={{ opacity: 1, transform: 'translateY(0%)', transition: { duration: 1, ease: 'anticipate', easings: 'anticipate' } }}
				className={styles.container}
			>
				<div className={styles.logo}>
					<h1>{it.name}</h1>
					<img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`} alt="로고" />
					<div className={styles.now_price}>
						<h1>현재 평가액</h1>
						<p>${it.quote.USD.price}</p>
					</div>
				</div>
				<div className={styles.grape_box}>
					<div className={styles.grape_data}>
						<Line data={coinData} options={options} />
					</div>
					<p className={styles.price_data}></p>
					<div className={styles.price}>
						<div className={styles.days}></div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};
export default Grape;
