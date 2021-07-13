import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import styled from 'styled-components';
import socket from '../../socket';
import Chat from '../Chat/Chat';

const RoomChat = (props) => {
  const currentUser = sessionStorage.getItem('user');
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: false, audio: false },
  });
  const [displayChat, setDisplayChat] = useState(true);
  const peersRef = useRef([]);
  const roomId = props.match.params.roomId;

  useEffect(() => {

    window.addEventListener('popstate', goToBack);

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true})
      .then((stream) => {
        socket.emit('BE-join-room', { roomId, userName: currentUser });
        socket.on('FE-user-join', (users) => {
          const peers = [];
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;

            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });

        socket.on('FE-receive-call', ({ signal, from, info }) => {
          let { userName, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);

            peer.userName = userName;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on('FE-call-accepted', ({ signal, answerId }) => {
          const peerIdx = findPeer(answerId);
          peerIdx.peer.signal(signal);
        });

        socket.on('FE-user-leave', ({ userId, userName }) => {
          const peerIdx = findPeer(userId);
          peerIdx.peer.destroy();
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            return [...users];
          });
        });
      });

    
    return () => {
      socket.disconnect();
    };

  }, []);

  function createPeer(userId, caller) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
          });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
  }

  function addPeer(incomingSignal, callerId) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-accept-call', { signal, to: callerId });
    });

    peer.on('disconnect', () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function findPeer(id) {
    return peersRef.current.find((p) => p.peerID === id);
  }

  const participants = () => {
    window.alert("Total number of participants are: "+ (peers.length + 1));
 }
  
  const goToBack = (e) => {
    e.preventDefault();
    socket.emit('BE-leave-room', { roomId, leaver: currentUser });
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  const invite = () => {
    navigator.clipboard.writeText(roomId)
  }

  const call = (e) => {
    window.location.href = `/room/${roomId}`;
  }

  return (
    <RoomContainer >
      <ChatAndBarContainer>
      <h1>Chat here with your friends in real time! or</h1>
      <h2>~ Call them and use features like:</h2>
      <h3>~ Audio and Video Calls with multiple people at a time</h3>
      <h3>~ Chat with emojis during the call</h3>
      <h3>~ Share Screen with participants</h3>
      <h3>~ Keep a count of participants</h3>
      <h3>~ Expand Video to focus </h3>
      <h3>~ Record Meetings</h3>
      <h3>~ Invite others</h3>
      <h3>~ ENJOY!✨</h3>
      
      <Bar>
         <CallButton onClick={call}>Call</CallButton>
         <InviteButton onClick={invite}>
        <div>
            <FaIcon className= 'fas fa-clone'></FaIcon>
          </div>
            Invite
        </InviteButton>
        <ParticipantsButton onClick={participants}>
          <div>
            <FaIcon className='fas fa-users'></FaIcon>
          </div>
          Participants
        </ParticipantsButton>
        <StopButton onClick={goToBack}>Stop</StopButton>
      </Bar>
      </ChatAndBarContainer>
      <Chat display={displayChat} roomId={roomId} />
    </RoomContainer>
  );
};


const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const ParticipantsButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  margin-right: 10px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const InviteButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  margin-right: 10px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }
`;

const CallButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #77b7dd;
  border-radius: 15px;

  :hover {
    background-color: #004677;
    cursor: pointer;
  }
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: #000020;
`;

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  max-height: 100vh;
  flex-direction: row;
`;

const ChatAndBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1530533609496-06430e875bbf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGRhcmslMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default RoomChat;
