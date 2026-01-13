import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField, Button, Box, Grid, Typography, Paper, Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import PanToolIcon from '@mui/icons-material/PanTool';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import server from '../environment';

const server_url = server;

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState(true);

    let [audio, setAudio] = useState(true);

    let [screen, setScreen] = useState();

    let [showModal, setModal] = useState(false);

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([])

    let [message, setMessage] = useState("");

    let [newMessages, setNewMessages] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([])

    let [videos, setVideos] = useState([])
    
    // Interactions State
    const [handRaised, setHandRaised] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [activeInteractions, setActiveInteractions] = useState({}); // { socketId: { type: 'hand' | 'emoji', value: '👍', timeout: null } }


    useEffect(() => {
        console.log("HELLO")
        getPermissions();

    }, [])

    let getDisplayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDisplayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getPermissions = async () => {
        try {
            // Request both video and audio permission in a single call
            const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

            if (userMediaStream) {
                setVideoAvailable(true);
                setAudioAvailable(true);
                
                window.localStream = userMediaStream;
                if (localVideoref.current) {
                    localVideoref.current.srcObject = userMediaStream;
                }
                console.log('Permissions granted and stream set');
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
            // Handle partial failures or denials
            try {
                // Retry with only video if audio fails, or only audio if video fails? 
                // For now, let's just log and try to get whatever is available.
                // In a real app we might fallback progressively.
                setVideoAvailable(false);
                setAudioAvailable(false);
            } catch (e) {
                console.error(e);
            }
        }
    };

    // Removed the useEffect that re-triggered getUserMedia on state change.
    // Media is acquired once in getPermissions.

    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                console.log(description)
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setVideo(false);
            setAudio(false);

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    let getDisplayMediaSuccess = (stream) => {
        console.log("HERE")
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketIdRef.current) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            getUserMedia()

        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('meeting-interaction', handleInteraction)

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {

                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    // Wait for their ice candidate       
                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    // Wait for their video stream
                    connections[socketListId].onaddstream = (event) => {
                        console.log("BEFORE:", videoRef.current);
                        console.log("FINDING ID: ", socketListId);

                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                        if (videoExists) {
                            console.log("FOUND existing");

                            // Update the stream of the existing video
                            setVideos(videos => {
                                const updatedVideos = videos.map(video =>
                                    video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        } else {
                            // Create a new video
                            console.log("CREATING NEW");
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoplay: true,
                                playsinline: true
                            };

                            setVideos(videos => {
                                const updatedVideos = [...videos, newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            });
                        }
                    };


                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connections) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }
    
    // Interaction Handlers
    const handleInteraction = (data, senderId) => {
        setActiveInteractions(prev => {
           // Clear existing timeout for this user if any
           if (prev[senderId]?.timeout) clearTimeout(prev[senderId].timeout);

           let timeout = null;
           // If it's an emoji, clear it after 3 seconds. Hand raise stays until toggled.
           if (data.type === 'emoji') {
               timeout = setTimeout(() => {
                   setActiveInteractions(current => {
                       const newState = { ...current };
                       delete newState[senderId];
                       return newState;
                   });
               }, 3000);
           }
           
           if (data.type === 'hand' && !data.value) {
                // Remove hand raise
                 const newState = { ...prev };
                 delete newState[senderId];
                 return newState;
            }

           return {
               ...prev,
               [senderId]: { type: data.type, value: data.value, timeout }
           };
        });
    };

    const toggleHandRaise = () => {
        setHandRaised(!handRaised);
        socketRef.current.emit('meeting-interaction', { type: 'hand', value: !handRaised });
    };

    const sendEmoji = (emoji) => {
        socketRef.current.emit('meeting-interaction', { type: 'emoji', value: emoji });
        setShowEmojiPicker(false);
    };


    let silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }
    let black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    let handleVideo = () => {
        const newState = !video; // Toggle state
        setVideo(newState);
        
        if (window.localStream) {
            const videoTrack = window.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = newState;
            }
        }
    }
    let handleAudio = () => {
        const newState = !audio; // Toggle state
        setAudio(newState);
        
        if (window.localStream) {
            const audioTrack = window.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = newState;
            }
        }
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDisplayMedia();
        }
    }, [screen])
    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
    }

    let openChat = () => {
        setModal(true);
        setNewMessages(0);
    }
    let closeChat = () => {
        setModal(false);
    }
    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    let sendMessage = () => {
        console.log(socketRef.current);
        socketRef.current.emit('chat-message', message, username)
        setMessage("");
    }

    let connect = () => {
        setAskForUsername(false);
        getMedia();
    }


    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#000', overflow: 'hidden' }}>
            
            {askForUsername === true ?
                 <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #121212 0%, #1E1E2E 100%)' }}>
                    <Paper elevation={10} sx={{ p: 5, borderRadius: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 3 }}>
                       <Typography variant="h4" fontWeight="bold">Join Lobby</Typography>
                       <Box sx={{ width: '300px', height: '200px', bgcolor: '#000', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                            <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
                       </Box>
                        <TextField label="Enter your name" value={username} onChange={e => setUsername(e.target.value)} fullWidth autoFocus />
                        <Button variant="contained" size="large" onClick={connect} disabled={!username}>Connect</Button>
                    </Paper>
                 </Box> 
                 :
                <>
                    {/* Main Video Area */}
                     <Box sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                        
                         <Grid container spacing={2} sx={{ height: '100%', justifyContent: 'center', alignContent: 'center' }}>
                            {/* Local Video - Always Present */}
                             <Grid item xs={12} sm={videos.length > 0 ? 4 : 12} md={videos.length > 0 ? 3 : 8} sx={{ height: videos.length === 0 ? '80%' : 'auto' }}>
                                 <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2, position: 'relative', bgcolor: '#000' }}>
                                    <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
                                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'rgba(0,0,0,0.5)', px: 1, borderRadius: 1 }}>You</Typography>
                                    
                                    {/* Interaction Overlay Local */}
                                    {activeInteractions[socketIdRef.current] && (
                                        <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(0,0,0,0.6)', borderRadius: 2, p: 1, animation: 'popIn 0.3s' }}>
                                            <Typography variant="h4">
                                                {activeInteractions[socketIdRef.current].type === 'hand' ? '✋' : activeInteractions[socketIdRef.current].value}
                                            </Typography>
                                        </Box>
                                    )}
                                 </Paper>
                             </Grid>

                             {/* Remote Videos */}
                             {videos.map((video) => (
                                 <Grid item xs={12} sm={4} md={3} key={video.socketId}>
                                      <Paper sx={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 2, position: 'relative', bgcolor: '#000' }}>
                                        <video
                                            data-socket={video.socketId}
                                            ref={ref => {
                                                if (ref && video.stream) {
                                                    ref.srcObject = video.stream;
                                                }
                                            }}
                                            autoPlay
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        
                                        {/* Interaction Overlay Remote */}
                                        {activeInteractions[video.socketId] && (
                                            <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(0,0,0,0.6)', borderRadius: 2, p: 1, animation: 'popIn 0.3s' }}>
                                                <Typography variant="h4">
                                                    {activeInteractions[video.socketId].type === 'hand' ? '✋' : activeInteractions[video.socketId].value}
                                                </Typography>
                                            </Box>
                                        )}
                                     </Paper>
                                 </Grid>
                             ))}
                         </Grid>

                         {/* Floating Controls */}
                         <Box sx={{
                            position: 'absolute',
                            bottom: 30,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            p: 2,
                            borderRadius: '50px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                         }}>
                             <IconButton onClick={handleVideo} sx={{ color: 'white', bgcolor: !video ? 'error.main' : 'rgba(255,255,255,0.1)' }}>
                                 {video ? <VideocamIcon /> : <VideocamOffIcon />}
                             </IconButton>
                             <IconButton onClick={handleAudio} sx={{ color: 'white', bgcolor: !audio ? 'error.main' : 'rgba(255,255,255,0.1)' }}>
                                 {audio ? <MicIcon /> : <MicOffIcon />}
                             </IconButton>
                             {screenAvailable && 
                                <IconButton onClick={handleScreen} sx={{ color: 'white', bgcolor: screen ? 'success.main' : 'rgba(255,255,255,0.1)' }}>
                                    {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                                </IconButton>
                             }

                             {/* Interaction Controls */}
                             <IconButton onClick={toggleHandRaise} sx={{ color: 'white', bgcolor: handRaised ? 'warning.main' : 'rgba(255,255,255,0.1)' }}>
                                 <PanToolIcon />
                             </IconButton>
                             
                             <Box sx={{ position: 'relative' }}>
                                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} sx={{ color: 'white', bgcolor: showEmojiPicker ? 'primary.main' : 'rgba(255,255,255,0.1)' }}>
                                    <EmojiEmotionsIcon />
                                </IconButton>
                                {showEmojiPicker && (
                                    <Paper sx={{ position: 'absolute', bottom: 60, left: -50, display: 'flex', gap: 1, p: 1, bgcolor: 'rgba(30,30,46,0.9)' }}>
                                        {['👍', '❤️', '😂', '😮', '👏'].map(emoji => (
                                            <IconButton key={emoji} onClick={() => sendEmoji(emoji)} sx={{ fontSize: '1.2rem' }}>{emoji}</IconButton>
                                        ))}
                                    </Paper>
                                )}
                             </Box>


                             <IconButton onClick={handleEndCall} sx={{ color: 'white', bgcolor: 'error.main', width: 50, height: 50 }}>
                                 <CallEndIcon />
                             </IconButton>

                             <Badge badgeContent={newMessages} color="secondary">
                                 <IconButton onClick={() => setModal(!showModal)} sx={{ color: 'white', bgcolor: showModal ? 'primary.main' : 'rgba(255,255,255,0.1)' }}>
                                     <ChatIcon />
                                 </IconButton>
                             </Badge>
                         </Box>
                     </Box>

                     {/* Chat Side Drawer (instead of Modal) */}
                     <Drawer
                        anchor="right"
                        open={showModal}
                        onClose={() => setModal(false)}
                        PaperProps={{
                            sx: {
                                width: 320,
                                bgcolor: 'background.paper',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                            }
                        }}
                     >
                         <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                             <Typography variant="h6">In-Call Chat</Typography>
                             <IconButton onClick={() => setModal(false)}><CloseIcon /></IconButton>
                         </Box>
                         
                         <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                             {messages.length > 0 ? messages.map((item, index) => (
                                 <Box key={index} sx={{ alignSelf: item.sender === username ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                     <Typography variant="caption" color="text.secondary">{item.sender}</Typography>
                                     <Paper sx={{ p: 1.5, bgcolor: item.sender === username ? 'primary.dark' : 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                                         <Typography variant="body2">{item.data}</Typography>
                                     </Paper>
                                 </Box>
                             )) : <Typography variant="body2" color="text.secondary" align="center">No messages yet.</Typography>}
                         </Box>

                         <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 1 }}>
                             <TextField 
                                fullWidth 
                                size="small" 
                                placeholder="Type a message..." 
                                value={message} 
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                             />
                             <IconButton color="primary" onClick={sendMessage}>
                                 <SendIcon />
                             </IconButton>
                         </Box>
                     </Drawer>
                </>
            }
        </Box>
    )
}
