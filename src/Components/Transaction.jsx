import React from "react";

function Transaction({ data, index }) {
  const { amount, fee, id, timestamp, recipientId, senderId } = data
  const date = new Date(timestamp).toDateString();
  const time = new Date(timestamp).toTimeString();

  return (
    <div className="transaction">
      #{index + 1}
      <h3>Transaction# {id}</h3>
      <p><strong>Amount: </strong>{amount}</p>
      <p><strong>Fee: </strong>{fee}</p>
      <p><strong>RecipientId: </strong>{recipientId}</p>
      <p><strong>Sender Id: </strong>{senderId}</p>
      <p><strong>Date/Time: </strong>{date} , {time}</p>
    </div>
  );
}

export default Transaction;
