import React, { useState, useEffect } from "react";
import Transaction from './Components/Transaction'
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

    //Scroll when new transactions comes
    const top = (document.body.scrollHeight - window.innerHeight) + (document.body.scrollHeight / 2)
    window.scroll({
      top,
      behavior: 'smooth'
    })
  }, [offset])

  return (
    Boolean(transactions.length) &&
    <div className="App">
      {transactions.map((item, key) => (
        <Transaction data={item} key={key} />
      ))}
      <div className="transaction-more">
        <button onClick={() => setOffset(offset + 1)}>More transactions</button>
      </div>
    </div>
  )

}

export default App;
