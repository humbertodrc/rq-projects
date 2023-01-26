import {useEffect, useReducer, useState} from "react";
import "./App.css";

function App() {
	const [number, setNumber] = useState<number>();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, forceRefetch] = useReducer((x) => x + 1, 0)

	const getRandomNumberApi = async (): Promise<number> => {
		const url = `https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new`;

		const response = await fetch(url);
    const numberString = await response.json();
    
    // throw new Error('Error de prueba');
		return +numberString;
	};

  useEffect(() => {
    setIsloading(true);
		getRandomNumberApi().then(setNumber).catch( error => setError(error.message));
	}, [key]);

	useEffect(() => {
		if (number) setIsloading(false);
  }, [number]);
  
  useEffect(() => {
    if(error) setIsloading(false);
  }, [error])

	return (
		<div className="App">
      {isLoading ? <p>Loading...</p> : !error &&  <h1>Numero aleatorio: {number}</h1>}
      {!isLoading && error && <p>{error}</p>}
      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Nuevo numero'}
      </button>
		</div>
	);
}

export default App;
