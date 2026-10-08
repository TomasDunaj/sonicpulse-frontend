export default function Login() {
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

    const handleLogin = () => {
        window.location.href = `${API_URL}/oauth2/authorization/spotify`;
    };

    return (
        <button className = "login-button" onClick={handleLogin}>
            Login with Spotify
        </button>

    )
}