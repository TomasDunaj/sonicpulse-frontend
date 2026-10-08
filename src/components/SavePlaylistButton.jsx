import { useState } from 'react'

export default function SavePlaylistButton({ tracks, defaultTitle }) {
    const [status, setStatus] = useState('idle')

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

    const handleSave = async () => {
        setStatus('saving')

        const trackUris = tracks
            .filter(track => track && track.id)
            .map(track => `spotify:track:${track.id}`)


        try {
            const response = await fetch(`${API_URL}/api/spotify/save-playlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: defaultTitle, uris: trackUris }),
            })

            if (response.ok) {
                setStatus('saved')
                setTimeout(() => setStatus('idle'), 3000)
            } else {
                setStatus('idle')
            }
        } catch (error) {
            setStatus('idle')
        }
    }

    return (
        <div>
            <button className="save-playlist-button" onClick={handleSave} disabled={status !== 'idle' || !tracks || tracks.length === 0}>
                {status === 'idle'
                    ? 'Save to spotify'
                    : status === 'saved'
                        ? 'Saved'
                        : 'Saving...' }
            </button>
        </div>
    )
}
