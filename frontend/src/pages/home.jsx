import React, { useContext, useState, useEffect } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Container, Grid, Typography, Paper, IconButton, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HistoryIcon from '@mui/icons-material/History';
import { AuthContext } from '../contexts/AuthContext';

import { motion } from 'framer-motion';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim().length > 0) {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        }
    };

    let StartNewMeeting = async () => {
         const randomCode = Math.random().toString(36).substring(2, 7);
         await addToUserHistory(randomCode);
         navigate(`/${randomCode}`)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Navbar */}
            <Box component={motion.div} 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 2, 
                px: 4, 
                bgcolor: 'rgba(255, 255, 255, 0.03)', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VideoCallIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                    <Typography variant="h6" fontWeight="bold">Dashboard</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        startIcon={<HistoryIcon />} 
                        onClick={() => navigate("/history")}
                        color="inherit"
                    >
                        History
                    </Button>
                    <Button 
                        startIcon={<LogoutIcon />} 
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                        color="error"
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Grid container spacing={4} component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
                    {/* Welcome Section */}
                    <Grid item xs={12} sx={{ textAlign: 'center', mb: 4 }} component={motion.div} variants={itemVariants}>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            Ready to Connect?
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Start a new meeting or join an existing one instantly.
                        </Typography>
                    </Grid>

                    {/* Action Cards */}
                    <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                        <Paper sx={{ 
                            p: 4, 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 2,
                            background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(108, 99, 255, 0.05) 100%)',
                            border: '1px solid rgba(108, 99, 255, 0.2)',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-5px)', borderColor: 'primary.main', boxShadow: '0 8px 30px rgba(108, 99, 255, 0.2)' }
                        }}>
                            <AddBoxIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                            <Typography variant="h5" fontWeight="bold">New Meeting</Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                Create a new meeting room and invite others to join.
                            </Typography>
                            <Button variant="contained" size="large" fullWidth onClick={StartNewMeeting}>
                                Start Instant Meeting
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
                         <Paper sx={{ 
                            p: 4, 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 2,
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'transform 0.2s',
                             '&:hover': { transform: 'translateY(-5px)', borderColor: 'rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)' }
                        }}>
                             <MeetingRoomIcon sx={{ fontSize: 60, color: 'secondary.main' }} />
                            <Typography variant="h5" fontWeight="bold">Join Meeting</Typography>
                             <Typography variant="body2" color="text.secondary" align="center">
                                Enter a meeting code to join an existing session.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                                <TextField 
                                    fullWidth 
                                    label="Meeting Code" 
                                    value={meetingCode} 
                                    onChange={(e) => setMeetingCode(e.target.value)}
                                    size="small"
                                />
                                <Button variant="outlined" color="inherit" onClick={handleJoinVideoCall}>
                                    Join
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default withAuth(HomeComponent)