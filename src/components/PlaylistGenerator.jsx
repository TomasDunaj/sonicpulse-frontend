import {useState} from "react";

function PlaylistGenerator(){
    const [prompt, setPrompt] = useState('')
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGenerate = async (e) => {
        try {
            e.preventDefault();

            if (!prompt ||!prompt.trim()) {
                return;
            }

            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8080/api/spotify/generate-from-prompt?prompt=${encodeURIComponent(prompt)}`, {                method: 'GET',
                credentials: 'include',
            })

            if (!response.ok) {
                return;
            }
            const data = await response.json()
            setTracks(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="playlist-generator">
            <h3>🤖 AI Playlist Generator</h3>

            <form onSubmit={handleGenerate}>
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Try /workout rock/ or /chill beats/"
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generujem...' : 'Vygenerovať'}
                </button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {tracks.length > 0 && (
                <ul>
                    {tracks.map((track) => (
                        <li key={track.id}>
                            {track.name} - {track.artists?.map((artist) => artist.name).join(', ')}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default PlaylistGenerator;
