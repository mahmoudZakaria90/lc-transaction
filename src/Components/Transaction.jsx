import React from "react";

function Transaction({ data }) {
  const { amount, fee, height, id, timestamp, recipientId, senderId } = data
  return (
    <div className="transaction">
      <h3>Transaction# {id}</h3>
      <p><strong>Amount: </strong>{amount}</p>
      <p><strong>Fee: </strong>{fee}</p>
    </div>
  );
}

export default Transaction;
