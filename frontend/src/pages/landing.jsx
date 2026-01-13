import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography, Paper, Card, CardContent } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

export default function LandingPage() {
    const router = useNavigate();

    const features = [
        {
            icon: <VideocamIcon sx={{ fontSize: 40, color: '#6C63FF' }} />,
            title: "HD Video Quality",
            description: "Experience crystal clear video calls with low latency, optimized for any bandwidth."
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#FF6584' }} />,
            title: "Secure & Encypted",
            description: "Your conversations are private. We use end-to-end encryption for all meetings."
        },
        {
            icon: <SpeedIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
            title: "Lightning Fast",
            description: "Connect instantly with no lag. Our lightweight architecture ensures maximum performance."
        },
        {
            icon: <GroupsIcon sx={{ fontSize: 40, color: '#FFC107' }} />,
            title: "Large Groups",
            description: "Host meetings with up to 100 participants without compromising on quality."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            content: "This zoom clone helps our remote team stay connected effortlessly. The video quality is unmatched!"
        },
        {
            name: "David Smith",
            role: "Educator",
            content: "I use this for all my online classes. It's stable, easy to use, and my students love the interface."
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden', bgcolor: '#0f0c29' }}>
            {/* Background Decorations */}
            <Box component={motion.div} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{
                position: 'fixed',
                top: -100,
                left: -100,
                width: 500,
                height: 500,
                background: 'radial-gradient(circle, rgba(108,99,255,0.4) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
                filter: 'blur(50px)',
                pointerEvents: 'none'
            }} />
             <Box component={motion.div} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                sx={{
                position: 'fixed',
                bottom: -100,
                right: -100,
                width: 400,
                height: 400,
                background: 'radial-gradient(circle, rgba(255,101,132,0.3) 0%, rgba(0,0,0,0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
                filter: 'blur(50px)',
                pointerEvents: 'none'
            }} />

            {/* Navbar */}
            <Box component="nav" sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 3,
                position: 'relative',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VideocamIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                        Zoom<span style={{ color: '#6C63FF' }}>Clone</span>
                    </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => router("/aljk23")}>Join Guest</Button>
                    <Button color="inherit" component={RouterLink} to="/auth">Login</Button>
                    <Button variant="contained" component={RouterLink} to="/auth">Sign Up</Button>
                </Box>
            </Box>

            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ mt: 10, mb: 15, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6} component={motion.div} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <Typography variant="h1" gutterBottom sx={{ 
                            background: 'linear-gradient(45deg, #FFFFFF 30%, #6C63FF 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1.1,
                            fontWeight: 800
                        }}>
                             Connect with your loved Ones
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, maxWidth: 500, lineHeight: 1.6 }}>
                            Experience high-quality, secure video conferencing designed for clarity and connection. Cover the distance with just one click.
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" size="large" onClick={() => router("/auth")} sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                                Get Started
                            </Button>
                            <Button variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', px: 4, py: 1.5 }}>
                                Learn More
                            </Button>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6} component={motion.div} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <Paper elevation={0} sx={{ 
                            p: 2, 
                            borderRadius: 4, 
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
                            }
                        }}>
                             <img src="/mobile.png" alt="Video Call App" style={{ width: '100%', borderRadius: '16px', display: 'block' }} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ py: 10, bgcolor: 'rgba(0,0,0,0.2)' }}>
                <Container maxWidth="lg">
                    <Typography component={motion.div} 
                        initial={{ y: 30, opacity: 0 }} 
                        whileInView={{ y: 0, opacity: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.5 }}
                        variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}
                    >
                        Why Choose Us?
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card component={motion.div}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    sx={{ 
                                    height: '100%', 
                                    bgcolor: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: '0.3s',
                                    '&:hover': { translateY: '-5px', bgcolor: 'rgba(255,255,255,0.08)' } 
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">{feature.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* How It Works Section */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <Typography component={motion.div} 
                    initial={{ y: 30, opacity: 0 }} 
                    whileInView={{ y: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.5 }}
                    variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 6 }}
                >
                    How It Works
                </Typography>
                <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                    <Grid item xs={12} md={4}>
                        <Box component={motion.div} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} sx={{ position: 'relative', p: 3 }}>
                            <Typography variant="h1" sx={{ color: 'rgba(108, 99, 255, 0.2)', fontWeight: 900 }}>01</Typography>
                            <Typography variant="h5" fontWeight="bold" sx={{ mt: -3, position: 'relative' }}>Create Account</Typography>
                            <Typography color="text.secondary" sx={{ mt: 2 }}>Sign up for free in seconds. No credit card required.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box component={motion.div} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} sx={{ position: 'relative', p: 3 }}>
                            <Typography variant="h1" sx={{ color: 'rgba(255, 101, 132, 0.2)', fontWeight: 900 }}>02</Typography>
                            <Typography variant="h5" fontWeight="bold" sx={{ mt: -3, position: 'relative' }}>Start Meeting</Typography>
                            <Typography color="text.secondary" sx={{ mt: 2 }}>Create a meeting room and share the link instantly.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                         <Box component={motion.div} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} sx={{ position: 'relative', p: 3 }}>
                            <Typography variant="h1" sx={{ color: 'rgba(76, 175, 80, 0.2)', fontWeight: 900 }}>03</Typography>
                            <Typography variant="h5" fontWeight="bold" sx={{ mt: -3, position: 'relative' }}>Connect</Typography>
                            <Typography color="text.secondary" sx={{ mt: 2 }}>Jump into high-quality video calls with friends or colleagues.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Testimonials Section */}
             <Box sx={{ py: 10, bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Container maxWidth="md">
                    <Typography component={motion.div} 
                        initial={{ y: 30, opacity: 0 }} 
                        whileInView={{ y: 0, opacity: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.5 }}
                        variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}
                    >
                        What Users Say
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((t, i) => (
                            <Grid item xs={12} md={6} key={i}>
                                <Paper component={motion.div} 
                                    initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }} 
                                    whileInView={{ x: 0, opacity: 1 }} 
                                    viewport={{ once: true }} 
                                    transition={{ duration: 0.6 }}
                                    sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 4 }}
                                >
                                    <Box sx={{ display: 'flex', mb: 2, color: '#FFC107' }}>
                                        {[...Array(5)].map((_, idx) => <StarIcon key={idx} fontSize="small" />)}
                                    </Box>
                                    <Typography variant="body1" paragraph fontStyle="italic">"{t.content}"</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                                        <Box sx={{ width: 50, height: 50, bgcolor: 'primary.main', borderRadius: '50%' }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">{t.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>


             {/* Enhanced Footer */}
             <Box sx={{ bgcolor: '#0a0a0a', py: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                 <Container maxWidth="lg">
                    <Grid container spacing={8}>
                        <Grid item xs={12} md={4}>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <VideocamIcon sx={{ color: 'primary.main' }} />
                                <Typography variant="h6" fontWeight="bold">ZoomClone</Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Connecting people across the globe with seamless video communications. Secure, reliable, and free.
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>Product</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">Features</Typography>
                                <Typography variant="caption" color="text.secondary">Security</Typography>
                                <Typography variant="caption" color="text.secondary">Pricing</Typography>
                            </Box>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>Company</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">About</Typography>
                                <Typography variant="caption" color="text.secondary">Careers</Typography>
                                <Typography variant="caption" color="text.secondary">Blog</Typography>
                            </Box>
                        </Grid>
                         <Grid item xs={6} md={2}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>Support</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">Help Center</Typography>
                                <Typography variant="caption" color="text.secondary">Terms of Service</Typography>
                                <Typography variant="caption" color="text.secondary">Privacy Policy</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>Stay Connected</Typography>
                            <Button variant="outlined" size="small" fullWidth sx={{ mt: 1 }}>Contact Us</Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                         © 2026 Zoom Clone. All rights reserved.
                    </Typography>
                 </Container>
             </Box>
        </Box>
    );
}
