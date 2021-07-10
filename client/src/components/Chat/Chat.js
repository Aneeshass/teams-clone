import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import socket from '../../socket';


const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem('user');
  const [msg, setMsg] = useState([]);
  const messageRef = useRef(null);
  const inputRef = useRef();
  
  useEffect(() => {
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  useEffect(() => {scrollToBottom()}, [msg])

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  const sendMessage = (e) => {
    if (e.key === 'Enter') {
      const msg = e.target.value;

      if (msg) {
        socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
      }
    }
  };

  const clickEmoji1 = (e) => {
    e.target.value= "👍";
    const msg = e.target.value;
    socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
  }

  const clickEmoji2 = (e) => {
    e.target.value= "👎";
    const msg = e.target.value;
    socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
  }

  const clickEmoji3 = (e) => {
    e.target.value= "👏";
    const msg = e.target.value;
    socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
  }

  const clickEmoji4 = (e) => {
    e.target.value= "😃";
    const msg = e.target.value;
    socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
  }

  const clickEmoji5 = (e) => {
    e.target.value= "❤️";
    const msg = e.target.value;
    socket.emit('BE-send-message', { roomId, msg, sender: currentUser });
        inputRef.current.value = '';
  }

  return (
    <ChatContainer className={display ? '' : 'width0'}>
      <TopHeader>Chat Box</TopHeader>
      <ChatArea>
        <MessageList>
          {msg &&
            msg.map(({ sender, msg }, idx) => {
              if (sender !== currentUser) {
                return (
                  <Message key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </Message>
                );
              } else {
                return (
                  <UserMessage key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </UserMessage>
                );
              }
            })}
            <div style={{float:'left', clear: 'both'}} ref={messageRef} />
        </MessageList>
      </ChatArea>
      <Center>
      <EmojiButton1 onClick={clickEmoji1}> 👍 </EmojiButton1>
      <EmojiButton2 onClick={clickEmoji2}> 👎 </EmojiButton2>
      <EmojiButton3 onClick={clickEmoji3}> 👏 </EmojiButton3>
      <EmojiButton4 onClick={clickEmoji4}> 😃 </EmojiButton4>
      <EmojiButton5 onClick={clickEmoji5}> ❤️ </EmojiButton5>
      </Center>
      <BottomInput
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Type your message here"
      />
    </ChatContainer>
  );
};

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  hieght: 100%;
  background-image: linear-gradient(to left, #4ea1d3, #000020);
  transition: all 0.5s ease;
  overflow: hidden;
`;

const TopHeader = styled.div`
  width: 100%;
  margin-top: 15px;
  font-weight: 550;
  font-size: 20px;
  color: white;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
  background-image: linear-gradient(to left, #4ea1d3, #000020);
  
`;

const EmojiButton1 = styled.div`
  width: 40px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  display: inline;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 5px;
  }

  * {
    pointer-events: none;
  }
`;
const EmojiButton2 = styled.div`
  width: 40px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  display: inline;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 5px;
  }

  * {
    pointer-events: none;
  }
`;
const EmojiButton3 = styled.div`
  width: 40px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  display: inline;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 5px;
  }

  * {
    pointer-events: none;
  }
`;
const EmojiButton4 = styled.div`
  width: 40px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  display: inline;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 5px;
  }

  * {
    pointer-events: none;
  }
`;
const EmojiButton5 = styled.div`
  width: 40px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  display: inline;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 5px;
  }

  * {
    pointer-events: none;
  }
`;

const MessageList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 15px;
  color: #245552;
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 15px;
  text-align: left;

  > strong {
    margin-left: 3px;
  }

  > p {
    max-width: 65%;
    width: auto;
    padding: 9px;
    margin-top: 3px;
    border: 1px solid rgb(78, 161, 211, 0.3);
    border-radius: 15px;
    box-shadow: 0px 0px 3px #4ea1d3;
    background-color: #4ea1d3;
    font-size: 14px;
  }
`;

const UserMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  font-size: 16px;
  margin-top: 15px;
  text-align: right;

  > strong {
    margin-right: 35px;
  }

  > p {
    max-width: 65%;
    width: auto;
    padding: 9px;
    margin-top: 3px;
    margin-right: 30px;
    border: 1px solid rgb(78, 161, 211, 0.3);
    border-radius: 15px;
    background-color: #000020;
    color: white;
    font-size: 14px;
    text-align: left;
  }
`;

const BottomInput = styled.input`
  bottom: 0;
  font-size: 20px;
  width: 120%;
  height: 8%;
  padding: 15px;
  background-color: #4ea1d3;
  box-sizing: border-box;
  position: absolute;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: white;
  }
`;

export default Chat;
