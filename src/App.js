import React, { Component } from "react";
import Transaction from './Components/Transaction'
import Loading from "./Components/Loading";
import { callAPI } from './utils'
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      transactions: []
    }
    this.getTransactions = this.getTransactions.bind(this)
    this.setOffset = this.setOffset.bind(this)
  }

  setOffset(toTop = false) {
    const { offset } = this.state;
    this.setState({
      offset: offset + 30
    })
    this.getTransactions(toTop);
  }

  async getTransactions(toTop = false) {
    const { offset, transactions } = this.state;
    const request = await fetch(callAPI(offset));
    const { data } = await request.json();
    this.setState({
      transactions: toTop ? [...data, ...transactions] : [...transactions, ...data]
    });
  }

  //Initial, Get transactions
  componentWillMount() {
    this.getTransactions()
  }

  //Get new items every 1 minute
  componentDidMount() {
    setInterval(() => {
      this.setOffset(true)
    }, 60000);
  }

  render() {
    const { transactions } = this.state;
    return (
      Boolean(transactions.length) ? (
        <div className="App">
          {transactions.map((item, key) => (
            <Transaction data={item} key={key} index={key} />
          ))}
          <div className="transaction-more">
            <button onClick={this.setOffset}>More transactions</button>
            <span>Displaying {transactions.length} transactions</span>
          </div>
        </div>
      ) : <Loading />)
  }

}







