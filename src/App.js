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
    this.getTransactions = this.getTransactions.bind(this);
  }

  async getTransactions() {
    const { offset, transactions } = this.state;

    //Update/increase the offset
    this.setState({
      offset: offset + 30
    })

    //Call the API
    const request = await fetch(callAPI(offset));
    const { data } = await request.json();

    //Update the transactions list
    this.setState({
      transactions: [...data, ...transactions]
    });
  }


  componentDidMount() {
    //Initial, Get transactions
    this.getTransactions();
    //Get new items every 1 minute
    setInterval(() => {
      this.getTransactions()
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
            <button className="transaction-more-btn" onClick={this.getTransactions}>More transactions</button>
            <span>Displaying {transactions.length} transactions</span>
          </div>
        </div>
      ) : <Loading />)
  }

}







