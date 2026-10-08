import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import PlaylistGenerator from "./components/PlaylistGenerator.jsx";
import RecommendationsModal from "./components/RecommendationsModal.jsx";
import logoImg from './assets/logo_spotify.png';

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`${API_URL}/api/users/me`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) {
                    setUser(null);
                    return;
                }

                const data = await response.json();
                setUser(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spotify-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="spotify-app">
            <header className="spotify-header">
                <div className="header-spacer left"></div>

                <div className="header-brand">
                    <img src={logoImg} alt="Logo" className="logo-icon"/>
                    <h1 className="logo-text">SonicPulse <span className="accent">AI</span></h1>
                </div>

                <div className="header-spacer right">
                    {user && <Profile user={user}/>}
                </div>
            </header>

            <main className="spotify-content">
                {user ? (
                    <>
                        <section className="welcome-banner">
                            <h2>Get started</h2>
                            <p>Enter prompt and generate tracklist with AI</p>
                        </section>

                        <section className="recommendations-section">
                            <button className="recommendations-button" onClick={() => setIsModalOpen(true)}>
                                Recommended for you
                            </button>
                        </section>
                        <PlaylistGenerator/>
                    </>
                ) : (
                    <div className="login-wrapper">
                        <Login/>
                    </div>
                )}

                <RecommendationsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    />


            </main>
        </div>
    );
}

export default App;