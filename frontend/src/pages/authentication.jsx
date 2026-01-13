import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Container } from '@mui/material';

export default function Authentication() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();

    const [formState, setFormState] = React.useState(0); // 0: Login, 1: Register
    const [open, setOpen] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            let message = (err.response?.data?.message || err.message);
            setError(message);
        }
    }

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            background: 'radial-gradient(120% 120% at 50% 50%, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', // Enhanced Space Gradient
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
             {/* Background Blobs */}
             <Box sx={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'rgba(108,99,255,0.3)', borderRadius: '50%', filter: 'blur(80px)' }} />
             <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: 'rgba(255,101,132,0.2)', borderRadius: '50%', filter: 'blur(80px)' }} />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 4,
                        borderRadius: 4,
                        // Glassmorphism inherited from theme, but tweaking validation
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        {formState === 0 ? "Welcome Back" : "Create Account"}
                    </Typography>

                    {/* Form Toggle */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, width: '100%', bgcolor: 'rgba(0,0,0,0.2)', p: 0.5, borderRadius: 2 }}>
                        <Button 
                            fullWidth 
                            variant={formState === 0 ? "contained" : "text"} 
                            color={formState === 0 ? "primary" : "inherit"}
                            onClick={() => { setFormState(0); setError("") }}
                            sx={{ borderRadius: 1.5 }}
                        >
                            Sign In
                        </Button>
                        <Button 
                            fullWidth 
                            variant={formState === 1 ? "contained" : "text"}
                            color={formState === 1 ? "primary" : "inherit"}
                            onClick={() => { setFormState(1); setError("") }}
                             sx={{ borderRadius: 1.5 }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        {formState === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus={formState === 0}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        {error && (
                            <Typography color="error" variant="body2" align="center" sx={{ mb: 2, bgcolor: 'rgba(255,0,0,0.1)', p: 1, borderRadius: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 1, mb: 2, py: 1.5, fontSize: '1rem' }}
                            onClick={handleAuth}
                        >
                            {formState === 0 ? "Login" : "Register"}
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </Box>
    );
}