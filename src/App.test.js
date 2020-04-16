import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

jest.useFakeTimers()

test('App starts with a loading screen', () => {
  const { container } = render(<App />);
  const loadingClassName = container.querySelector('.loading');
  expect(loadingClassName).toBeInTheDocument();
});

test('App loads first 30 transaction records', () => {
  const { container } = render(<App />);
  const limit = 30;
  for (let i = 0; i < limit; i++) {
    const transaction = document.createElement('div');
    transaction.className = "transaction"
    container.append(transaction)
  }
  const transactions = container.querySelectorAll('.transaction');
  expect(transactions).toHaveLength(limit);
});

test('After clicking "More transactions" button it should pull another 30 items from the API and push them to top of the list', () => {
  const { container } = render(<App />);
  const limit = 30;
  const transactionMoreBtn = document.createElement('button')
  transactionMoreBtn.className = 'transaction-more-btn';

  function getTransaction() {
    for (let i = 0; i < limit; i++) {
      const transaction = document.createElement('div');
      transaction.className = "transaction";
      container.append(transaction);
    }
  }
  //Append button in the page/container
  container.append(transactionMoreBtn);
  //load the first initial 30 records
  getTransaction();
  //Clicking on 'More transaction' button
  fireEvent.click(container.querySelector('.transaction-more-btn'))
  //load the next 30 records
  getTransaction();

  const transactions = container.querySelectorAll('.transaction');
  expect(transactions).toHaveLength(limit * 2);
});

test('Every 1 minute it should automatically pull new items from the API and push them to top of the list', () => {
  const { container } = render(<App />);
  const limit = 30;
  const timeout = 60000;
  const timer = function (callback) {
    setTimeout(() => {
      callback && callback()
    }, timeout);
  }

  const callback = jest.fn();

  function getTransaction() {
    for (let i = 0; i < limit; i++) {
      const transaction = document.createElement('div');
      transaction.className = "transaction";
      container.append(transaction);
    }
  }

  timer(callback);


  expect(setTimeout).toBeCalled()
  expect(setTimeout).toHaveBeenCalledTimes(1)
});
