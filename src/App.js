import React, { useState, useEffect } from "react";
import Transaction from './Components/Transaction'
import Loading from "./Components/Loading";
import { callAPI } from './utils'
import "./App.css";



function App() {
  const [offset, setOffset] = useState(0);
  const [transactions, setTransactions] = useState([]);

  //initial, get the transactions
  const getTransactions = async function () {
    const request = await fetch(callAPI(offset));
    const { data } = await request.json();
    setTransactions(current => [...data, ...current]);
  }

  // Get transactions
  useEffect(() => {
    getTransactions();
  }, [offset])

  // // Fetching every one minute
  // useEffect(() => {
  //   setInterval(() => {
  //     setOffset(offset + 30);
  //     getTransactions();
  //   }, 3000);

  // }, [null])


  return (
    Boolean(transactions.length) ? (
      <div className="App">
        {transactions.map((item, key) => (
          <Transaction data={item} key={key} index={key} />
        ))}
        <div className="transaction-more">
          <button onClick={() => setOffset(offset + 30)}>More transactions</button>
          <span>Displaying {transactions.length} transactions</span>
        </div>
      </div>
    ) : <Loading />)


}

export default App;
