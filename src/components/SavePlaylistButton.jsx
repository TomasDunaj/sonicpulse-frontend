import { useState } from 'react'

export default function SavePlaylistButton({ tracks, defaultTitle }) {
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)

    const handleSave = async () => {
        setStatus('saving')
        setError(null)

        const trackUris = tracks.map(track => track.uri)
        try {
            const response = await fetch('http://127.0.0.1:8080/api/spotify/save-playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name: defaultTitle, uris: trackUris }),
            })

            if (response.ok) {
                setStatus('saved')
            } else {
                setStatus('idle')
                setError('Failed to save playlist')
            }
        } catch (error) {
            setStatus('idle')
            setError(error.message)
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
