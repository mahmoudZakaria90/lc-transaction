import React, { useState, useEffect } from "react";
import Transaction from './Components/Transaction'
import Loading from "./Components/Loading";
import { callAPI } from './utils'
import "./App.css";



function App() {
  const [offset, setOffset] = useState(0);
  const [transactions, setTransactions] = useState([])

  //initial, get the transactions
  const getTransactions = async function () {
    const request = await fetch(callAPI(offset))
    const { data } = await request.json()
    setTransactions(current => [...current, ...data])
  }

  useEffect(() => {
    // Get transactions
    getTransactions()
  }, [offset])

  // Sorting and fetching every one minute
  useEffect(() => {
    setInterval(() => {
      setOffset(offset + 1)
      setTransactions(current => current.sort((a, b) => b.timestamp - a.timestamp))
    }, 60000);

  }, [transactions])

  return (

    Boolean(transactions.length) ? (
      <div className="App">
        {transactions.map((item, key) => (
          <Transaction data={item} key={key} index={key} />
        ))}
        <div className="transaction-more">
          <button onClick={() => setOffset(offset + 1)}>More transactions</button>
          <span>Displaying {transactions.length} transactions</span>
        </div>
      </div>
    ) : <Loading />)


}

export default App;
