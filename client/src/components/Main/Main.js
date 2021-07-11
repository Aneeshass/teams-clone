import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/chat/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User Name already exists');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name & User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <MainContainer>
      <h1>MacroHard Solo</h1>
      <Row>
        <Label htmlFor="roomName">Room Name</Label>
        <Input type="text" id="roomName" ref={roomRef} />
      </Row>
      <Row>
        <Label htmlFor="userName">User Name</Label>
        <Input type="text" id="userName" ref={userRef} />
      </Row>
      <JoinButton onClick={clickJoin}> Join </JoinButton>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer>
  );
};


const MainContainer = styled.div`
position: relative;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://wallpaperaccess.com/full/4213502.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  line-height: 35px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 140px;
  height: 35px;
  align-items: center;
  margin-left: 15px;
  padding-left: 8px;
  outline: none;
  border: double;
  border-radius: 5px;
`;

const Error = styled.div`
  margin-top: 15px;
  font-size: 25px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  height: 50px;
  width: 400px;
  margin-top: 35px;
  box-shadow: 0 0 5px #4ea1d3;
  border: 2px solid black;
  border-radius: 30px;
  color: #d8e9ef;
  background-color: #4ea1d3;
  font-size: 30px;
  font-weight: 500;

  :hover {
    background-color: #000020;
    cursor: pointer;
  }
`;


export default Main;
