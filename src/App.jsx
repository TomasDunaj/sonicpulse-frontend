import {useState, useEffect} from 'react'
import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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
        return <div>Loading...</div>
    }

    return (user) ? <Profile user={user}/> : <Login/>
}

export default App
