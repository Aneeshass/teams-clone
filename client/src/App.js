import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
//import Chat from './components/Chat/Chat';
import RoomChat from './components/Room/RoomChat';
import Room from './components/Room/Room';
import styled from 'styled-components';
// import Join from './components/Room/Join';

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/chat/:roomId" component={RoomChat} />
          {/* <Route exact path="/join" component={Join}/> */}
          <Route exact path="/room/:roomId" component={Room} />
        </Switch>
      </AppContainer>
    </BrowserRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #000020;
  text-align: center;
`;

export default App;

