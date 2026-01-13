import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Box, Container, Grid, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // Potential snackbar here
            }
        }
        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                 <IconButton onClick={() => routeTo("/home")} color="primary" sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                    <HomeIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">Meeting History</Typography>
            </Box>

            <Container maxWidth="md">
                <Grid container spacing={3}>
                    {meetings.length > 0 ? meetings.map((e, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Paper sx={{ 
                                p: 0, 
                                overflow: 'hidden', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-3px)', borderColor: 'primary.main' }
                            }}>
                                <Box sx={{ bgcolor: 'rgba(108, 99, 255, 0.1)', p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarTodayIcon fontSize="small" color="primary" />
                                    <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                                        {formatDate(e.date)}
                                    </Typography>
                                </Box>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <CodeIcon fontSize="small" color="secondary" />
                                        <Typography variant="body1" fontWeight="bold">
                                            {e.meetingCode}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Joined at {new Date(e.date).toLocaleTimeString()}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        </Grid>
                    )) : (
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', py: 5 }}>
                                <Typography color="text.secondary">No meeting history found.</Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
