import {useState} from "react";
import PromptFilters from './PromptFilters.jsx'
import TrackItem from "./TrackItem.jsx";
import SavePlaylistButton from "./SavePlaylistButton.jsx";

function PlaylistGenerator() {
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

            if (!prompt || !prompt.trim()) {
                return;
            }

            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8080/api/spotify/generate-from-prompt?prompt=${encodeURIComponent(finalPrompt)}`, {
                method: 'GET',
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

                <PromptFilters selectedTags={selectedTags} onToggle={onToggle}/>

                <button className="submit-button" type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {tracks.length > 0 && (
                <ul>
                    {tracks.map((track, index) => (
                        <TrackItem key={index} track={track} />
                    ))}
                </ul>
            )}

            {tracks.length > 0 && (
                <SavePlaylistButton defaultTitle={prompt} tracks={tracks} />
            )}
        </div>

    )
}

export default PlaylistGenerator;
