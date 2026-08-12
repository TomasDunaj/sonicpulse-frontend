import './Login.css'

export default function Login() {
    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:8080/oauth2/authorization/spotify";
    };

    return (
        <button className = "login-button" onClick={handleLogin}>
            Login with spotify
        </button>

    )
}