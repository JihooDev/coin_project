import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import CoinList from './component/coinList/CoinList';
import Header from './component/header/Header';
import Loading from './component/loading/Loading';
import TodoList from './component/todoList/TodoList';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { select } from 'd3';

const App = () => {
	// Coin
	const [coinState, setCoinState] = useState([]);
	const [coinData, setCoinData] = useState([]);
	const [rankData, setRankData] = useState(false);
	const [manyCoinData, setManyCoinData] = useState(false);
	const [load, setLoad] = useState(true);
	// Todo
	const dataId = useRef(1);
	const [todoData, setTodoData] = useState([]);
	const getCoindata = async () => {
		try {
			let CoinApires = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
				headers: {
					'X-CMC_PRO_API_KEY': '7bfb258c-22a3-4996-8bfa-433553a36690',
				},
			});

			axios.all([CoinApires]).then(
				axios.spread(() => {
					const Coinid = CoinApires.data.data.sort((a, b) => a.cmc_rank - b.cmc_rank);
					setCoinState(Coinid);
					setCoinData(Coinid);
					setLoad(false);
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getCoindata();
	}, []);

	//sort 함수
	const rowData = () => {
		if (rankData === true) {
			let newArr = [...coinState.sort((a, b) => b.cmc_rank - a.cmc_rank)];
			setCoinState(newArr);
			setRankData(false);
		} else {
			let newArr = [...coinState.sort((a, b) => a.cmc_rank - b.cmc_rank)];
			setCoinState(newArr);
			setRankData(true);
		}
	};

	const coinSort = () => {
		if (manyCoinData === true) {
			let newArr = [...coinState.sort((a, b) => b.quote.USD.price - a.quote.USD.price)];
			setCoinState(newArr);
			setManyCoinData(false);
		} else {
			let newArr = [...coinState.sort((a, b) => a.quote.USD.price - b.quote.USD.price)];
			setCoinState(newArr);
			setManyCoinData(true);
		}
	};

	// 갯수 출력

	return (
		<div className="App">
			<BrowserRouter>
				<div className="container">
					<Header coinData={coinData} setCoinState={setCoinState} coinState={coinState} />
					<Routes>
						<Route
							path="/"
							element={
								load ? (
									<Loading />
								) : (
									<CoinList
										coinData={coinData}
										setCoinData={setCoinData}
										coinState={coinState}
										setCoinState={setCoinState}
										rowData={rowData}
										rankData={rankData}
										getCoinData={getCoindata}
										coinSort={coinSort}
									/>
								)
							}
						/>
						<Route path="/todo" element={<TodoList todoData={todoData} setTodoData={setTodoData} dataId={dataId} />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
