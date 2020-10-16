import React, { PureComponent, useState, useEffect } from 'react';
import moment from "moment";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const cycleData = async (data = [], size = 10) => {
	const timestamp = Date.now();
	let newData = [];
	let toFetch = size;
	if (data.length) {
		[,...newData] = data;
		toFetch = 1;
	}
	const fetched = await fetch(`https://qrng.anu.edu.au/API/jsonI.php?length=${toFetch}&type=uint8`);
	const res = await fetched.json();

	newData = [
		...newData,
		...res.data.map((e, i) => {
			return {
				name: moment(timestamp).subtract(i, "seconds").format("mm:ss a"),
				value: e,
			};
		})
  ];
	return newData;
};

const RemoteChart = function() {
	const [data, setData] = useState([]);

	useEffect(() => {   
		const interval = setInterval(async () => {
			setData(await cycleData(data));
		}, 1000);
	
		return () => clearInterval(interval);
	});

	return <Chart data={data} />
};

const Chart = function({data}) {
	return (
		<LineChart
			width={1000}
			height={300}
			data={data}
			margin={{
				top: 5, right: 30, left: 20, bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" isAnimationActive={false} dataKey="value" />
		</LineChart>
	);
};

export default RemoteChart;
