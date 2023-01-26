import {useEffect, useState} from "react";
import "./App.css";

function App() {
	const [number, setNumber] = useState<number>();

	const getRandomNumberApi = async (): Promise<number> => {
		const url = `https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`;

		const response = await fetch(url);
		const numberString = await response.json();
		return +numberString;
	};

	useEffect(() => {
		getRandomNumberApi().then(setNumber)
	}, []);

	return (
		<div className="App">
			<h1>Numero aleatorio: {number}</h1>
		</div>
	);
}

export default App;
