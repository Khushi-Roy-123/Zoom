import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Box, Container, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
    const routeTo = useNavigate();

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
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', py: 5 }}>
                            <Typography color="text.secondary">Meeting history is not available without user authentication.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
