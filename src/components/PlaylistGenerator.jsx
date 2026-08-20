import {useState} from "react";
import PromptFilters from  './PromptFilters.jsx'

function PlaylistGenerator(){
    const [prompt, setPrompt] = useState('')
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [selectedTags, setSelectedTags] = useState([]);

    const onToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            const filteredTags = selectedTags.filter(presentTag => presentTag !== tag);
            setSelectedTags(filteredTags);
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleGenerate = async (e) => {
        const tagsString = selectedTags.length > 0 ? selectedTags.join(' ') : '';
        const finalPrompt = tagsString
            ? `Genres : ${tagsString}. Popis ${prompt}`
            : prompt;

        try {
            e.preventDefault();

            if (!prompt ||!prompt.trim()) {
                return;
            }

            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8080/api/spotify/generate-from-prompt?prompt=${encodeURIComponent(finalPrompt)}`, {                method: 'GET',
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
            <h3>AI Playlist Generator</h3>

            <form onSubmit={handleGenerate}>
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Try /workout rock/ or /chill beats/"
                    disabled={loading}
                />

                <PromptFilters selectedTags={selectedTags} onToggle={onToggle} />

                <button className="submit-button" type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {tracks.length > 0 && (
                <ul>
                    {tracks.map((track) => (
                        <li key={track.id || track.name} className="track-item">
                            {track.album?.images?.[0]?.url && (
                                <img
                                    src={track.album.images[0].url}
                                    alt={track.name}
                                    className="album-cover"
                                />
                            )}

                            <div className="track-info">
                                <span className="track-name">{track.name}</span>
                                <span className="track-artist">
                        {track.artists?.map((artist) => artist.name).join(', ')}
                    </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    )
}

export default PlaylistGenerator;
