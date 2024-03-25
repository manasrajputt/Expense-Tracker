import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items:start;
  font-size: 18px;
  font-weight: bold;
  gap: 10px;
  width: 100%;
  & input{
    padding: 10px 20px;
    border-radius: 12px;
    background: #e6e8e9;
    outline: none;
    border: 1px solid #d2d3d3;
    width: 100%;
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 14px;
  width: 100%;
  border-radius: 2px;
  align-items: center;
  font-weight: normal;
  border: 1px solid #d2d3d3;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload.type === "EXPENSE"}>
      <span>{props.payload.desc}</span>
      <span>{props.payload.amt}</span>
    </Cell>
  )
}

const TransactionComponent = (props) => {

  const [searchtxt, updateSearch] = useState("");
  const [filteredTransaction, updateTxn] = useState(props.transactions)

  const filterData = (searchtxt) => {
    if(!searchtxt || !searchtxt.trim().length){
      updateTxn(props.transactions);
      return;
    }

    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchtxt.toLowerCase().trim()),
    );
    updateTxn(txn);
  }

  useEffect(()=>{filterData(searchtxt)},[props.transactions])

  return (
    <Container>Transaction
      <input 
        placeholder='Serach'
        value={searchtxt}
        onChange={(e) => {
          updateSearch(e.target.value);
          filterData(e.target.value);
        }
        }
      />
      {filteredTransaction?.length ?
        filteredTransaction.map(
          (payload) => (<TransactionCell payload={payload} />
          ))
        : ""}
    </Container>
  )
}

export default TransactionComponent