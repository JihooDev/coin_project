import React, { useEffect, useState } from 'react';
import styles from './coinList.module.css';
import CoinItem from '../coinItem/CoinItem';
import Grape from '../grape/Grape';

const CoinList = ({ coinState, rowData, rankData, getCoinData, coinSort }) => {
	const [reRender, setReRender] = useState(false);

	const reData = () => {
		getCoinData();
	};

	return (
		<div className={styles.list}>
			<nav>
				<ul>
					<li className={styles.num} onClick={rowData}>
						{rankData ? <img src={process.env.PUBLIC_URL + 'image/down.svg'} /> : <img src={process.env.PUBLIC_URL + 'image/up.svg'} />}
					</li>
					<li className={styles.name}>이름</li>
					<li className={styles.price} onClick={coinSort}>
						가격
					</li>
					<li className={styles.day}>하루 거래량</li>
					<li className={styles.week}>1주 거래량</li>
					<li className={styles.market}>시가 총액</li>
					<li className={styles.volume}>거래량</li>
					<li onClick={reData}>
						<img src={process.env.PUBLIC_URL + 'image/redirect.svg'} alt="데이터 불러오기" id={styles.redirect} />
					</li>
				</ul>
			</nav>
			{coinState.map(it => {
				return <CoinItem it={it} key={it.id} reRender={reRender} setReRender={setReRender} getCoinData={getCoinData} />;
			})}
		</div>
	);
};

export default CoinList;
