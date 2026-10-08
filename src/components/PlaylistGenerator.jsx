import {useState} from "react";
import PromptFilters from './PromptFilters.jsx'
import TrackItem from "./TrackItem.jsx";
import SavePlaylistButton from "./SavePlaylistButton.jsx";
import ModeSelector from "./ModeSelector.jsx";

function PlaylistGenerator() {
    const [prompt, setPrompt] = useState('')
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [generationMode, setGenerationMode] = useState('RESTRICTIVE')
    const [error, setError] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [limit, setLimit] = useState(10)

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

    const onToggle = (tag) => {
        if (selectedTags.includes(tag)) {
            const filteredTags = selectedTags.filter(presentTag => presentTag !== tag);
            setSelectedTags(filteredTags);
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleGenerate = async (e) => {
        e.preventDefault();

        const tagsString = selectedTags.length > 0 ? selectedTags.join(' ') : '';
        const finalPrompt = tagsString
            ? `Genres : ${tagsString}. Description : ${prompt}`
            : prompt;

        try {
            if (!prompt || !prompt.trim()) {
                return;
            }

            setLoading(true);
            const response = await fetch(`${API_URL}/api/spotify/generate-from-prompt?prompt=${encodeURIComponent(finalPrompt)}&generationMode=${generationMode}&limit=${limit}`, {
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

    const handleSwapTrack = async (indexToSwap, keyword) => {
        const excludedIds = tracks.map(track => track.id);

        try {
            const response = await fetch(`${API_URL}/api/spotify/swap-track`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({keyword: keyword, excludedIds: excludedIds}),
            });

            if (response.ok) {
                const newTrack = await response.json();
                setTracks(prevTracks => {
                    const updated = [...prevTracks];
                    updated[indexToSwap] = newTrack;
                    return updated;
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTrack = (songId) => {
        setTracks(tracks.filter(track => track.id !== songId));
    }

    return (
        <div className="playlist-generator">
            <h3>AI Playlist Generator</h3>

            <form onSubmit={handleGenerate}>
                <input
                    type="text"
                    className="text-input"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Try /workout rock/ or /chill beats/"
                    disabled={loading}
                />

                <ModeSelector selectedMode={generationMode} onChange={setGenerationMode} />

                <input
                    type="number"
                    className="limit-input"
                    placeholder="Number of tracks"
                    min="1"
                    onChange={e => setLimit(Number(e.target.value))}
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
                        <li key={index}>
                            <TrackItem key={index}
                                       track={track}
                                       index={index}
                                       onSwap={handleSwapTrack}
                                       onDelete={deleteTrack}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {tracks.length > 0 && (
                <SavePlaylistButton defaultTitle={prompt} tracks={tracks}/>
            )}
        </div>

    )
}

export default PlaylistGenerator;
