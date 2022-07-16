import React, { useRef, useState, useEffect } from 'react';
import styles from './coinItem.module.css';
import { motion } from 'framer-motion';

import Grape from '../grape/Grape';

const CoinItem = ({ it, getCoinData }) => {
	const [modal, setModal] = useState(false);
	const { name, cmc_rank } = it;
	const price = it.quote.USD;
	const [data, setData] = useState([
		price.percent_change_90d,
		price.percent_change_60d,
		price.percent_change_30d,
		price.percent_change_24h,
		price.percent_change_7d,
		price.percent_change_1h,
	]);

	const toggleModal = () => {
		setModal(true);
	};

	return (
		<>
			{modal ? <Grape data={data} it={it} setModal={setModal} getCoinData={getCoinData} /> : null}
			<motion.div
				initial={{ opacity: 0, transform: 'translateY(10%)' }}
				animate={{ opacity: 1, transform: 'translateY(0%)', transition: { duration: 1, ease: 'anticipate', easings: 'anticipate' } }}
			>
				<div className={styles.items} onClick={() => toggleModal(true)}>
					<p className={styles.num}>{cmc_rank}</p>
					<h1 className={styles.name}>
						<img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${it.id}.png`} alt="logo_Img" />
						{name}
						<p>{it.symbol}</p>
					</h1>
					<p className={styles.price}>${price.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
					<p className={styles.day}>{price.percent_change_24h.toFixed(5)}%</p>
					<p className={styles.week}>{price.percent_change_7d.toFixed(5)}%</p>
					<p className={styles.market}>${price.market_cap.toFixed(2)}</p>
					<p className={styles.volume}>${price.volume_24h.toFixed(2)}</p>
				</div>
			</motion.div>
		</>
	);
};

export default CoinItem;
