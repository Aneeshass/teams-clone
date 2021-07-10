// // import React, { useState, useEffect } from 'react';
// // import styled from 'styled-components';
// // import socket from '../../socket';

// // const Join = (props) => {
// //     const currentUser = sessionStorage.getItem('user');
// //     const roomId = props.match.params.roomId;
// //     const [err, setErr] = useState(false);
// //     const [errMsg, setErrMsg] = useState('');


// //     useEffect(() => {

// //         socket.on('FE-error-user-exist', ({ error }) => {
// //         if (!error) {
// //             sessionStorage.setItem('user', currentUser);
// //             props.history.push(`/room/${roomId}`);
// //         } else {
// //             setErr(error);
// //             setErrMsg('User Name already exists');
// //         }
// //         });
// //     }, [props.history]);

// //         const roomName = roomId;
// //         const userName = currentUser;
    
// //         if (!roomName || !userName) {
// //           setErr(true);
// //           setErrMsg('Enter Room Name & User Name');
// //         } else {
// //           socket.emit('BE-check-user', { roomId: roomName, userName });
// //         }
      
// // }

// // export default Join;


// import React, { useRef, useState, useEffect } from 'react';
// import styled from 'styled-components';
// import socket from '../../socket';
// import Chat from '../Chat/Chat';

// const Join = (props) => {
//   const roomRef = useRef();
//   const userRef = useRef();
//   const [err, setErr] = useState(false);
//   const [errMsg, setErrMsg] = useState('');

//   useEffect(() => {

//     socket.on('FE-error-user-exist', ({ error }) => {
//       if (!error) {
//         const roomName = roomRef.current.value;
//         const userName = userRef.current.value;

//         sessionStorage.setItem('user', userName);
//         props.history.push(`/room/${roomName}`);
//       } else {
//         setErr(error);
//         setErrMsg('User Name already exists');
//       }
//     });
//   }, [props.history]);

//   function clickJoin() {
//     const roomName = roomRef.current.value;
//     const userName = userRef.current.value;

//     if (!roomName || !userName) {
//       setErr(true);
//       setErrMsg('Enter Room Name & User Name');
//     } else {
//       socket.emit('BE-check-user', { roomId: roomName, userName });
//     }
//   }

//   return (
//     <MainContainer>
//       <h1>Want to start the call?</h1>
//       <Row>
//         <Label htmlFor="roomName">Room Name</Label>
//         <Input type="text" id="roomName" ref={roomRef} />
//       </Row>
//       <Row>
//         <Label htmlFor="userName">User Name</Label>
//         <Input type="text" id="userName" ref={userRef} />
//       </Row>
//       <JoinButton onClick={clickJoin}> Join </JoinButton>
//       {err ? <Error>{errMsg}</Error> : null}
//     </MainContainer>
//   );
// };


// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Row = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-top: 20px;
//   line-height: 35px;
// `;

// const Label = styled.label``;

// const Input = styled.input`
//   width: 140px;
//   height: 35px;
//   align-items: center;
//   margin-left: 15px;
//   padding-left: 8px;
//   outline: none;
//   border: double;
//   border-radius: 5px;
// `;

// const Error = styled.div`
//   margin-top: 15px;
//   font-size: 25px;
//   color: #e85a71;
// `;

// const JoinButton = styled.button`
//   height: 50px;
//   margin-top: 35px;
//   box-shadow: 0 0 5px #4ea1d3;
//   border: 2px solid black;
//   border-radius: 30px;
//   color: #d8e9ef;
//   background-color: #4ea1d3;
//   font-size: 30px;
//   font-weight: 500;

//   :hover {
//     background-color: #000020;
//     cursor: pointer;
//   }
// `;


// export default Join;
