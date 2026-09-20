import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import PlaylistGenerator from "./components/PlaylistGenerator.jsx";
import RecommendationsModal from "./components/RecommendationsModal.jsx";

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('http://127.0.0.1:8080/api/users/me', {
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
                <div className="header-brand">
                    <span className="logo-icon">🎵</span>
                    <h1 className="logo-text">SonicPulse <span className="accent">AI</span></h1>
                </div>
                {user && <Profile user={user}/>}
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
                                Something for you
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