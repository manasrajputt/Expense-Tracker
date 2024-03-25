import React, { useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat;
  margin: 10px;
  width: 100%;
`;

const BalanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  width: 100%;
  font-weight: bold;
`;

const AddTransaction = styled.div`
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

const AddTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d2d3d3;
  gap: 10px;
  padding: 15px 20px;
  margin: 20px;
  width: 100%;
  & input{
    outline: none;
    padding: 10px 12px;
    border-radius:4px;
    border: 1px solid #d2d3d3;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;

const ExpenseBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 15px 20px;
  width: 135px;
  font-size: 14px;
  border: 1px solid #d2d3d3;
  & span{
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => (props.isExpense ? "green" : "red")};
  }
`;

const AddTransactionView = (props) => {

  const [amt, setAmt] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");
  const addTransaction = () => {
    props.addTransaction({
      amt: Number(amt),
      desc,
      type,
      id: Date.now(),
    })
    props.toggleAddTxn();
  }

  return (
    <AddTransactionContainer>
      <input
        placeholder='Amount'
        value={amt}
        type='number'
        onChange={(e) => setAmt(e.target.value)} />
      <input
        placeholder='Description'
        value={desc}
        onChange={(e) => setDesc(e.target.value)} />
      <RadioBox>
        <input
          type="radio"
          id='expense'
          name='type'
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)} />
        <label htmlFor='expense'>Expense</label>
        <input
          type="radio"
          id='income'
          name='type'
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)} />
        <label htmlFor='income'>Income</label>
      </RadioBox>
      <AddTransaction
        onClick={addTransaction}>Add Transaction
      </AddTransaction>
    </AddTransactionContainer>
  )
}

const OverviewComponent = (props) => {

  const [isAddTxnVisible, toggleAddTxn] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance : ${props.income - props.expense}
        <AddTransaction onClick={() => toggleAddTxn(!isAddTxnVisible)}>{isAddTxnVisible ? "Cancel" : "Add"}</AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && <AddTransactionView toggleAddTxn={toggleAddTxn} addTransaction={props.addTransaction} />}
      <ExpenseContainer>
        <ExpenseBox isExpense={false}>
          Expense<span>${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isExpense={true}>
          Income<span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  )
}

export default OverviewComponent