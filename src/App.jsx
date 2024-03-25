import React from 'react'
import styled from 'styled-components';
import HomeComponent from './components/HomeComponent/HomeComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0 10px;
  font-family: Montserrat;
`;

const Header = styled.div`
  color:black;
  font-size:25px;
  font-weight:bold;
`;

function App() {
  return (
  <Container>
    <Header>Expense Tracker</Header>
    <HomeComponent/>
  </Container>
  ); 
}

export default App