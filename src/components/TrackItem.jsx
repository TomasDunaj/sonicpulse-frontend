import {useState, useEffect} from 'react'
import AudioPlayer from "./AudioPlayer.jsx";
import SwapButton from "./SwapButton.jsx";
import DeleteButton from "./DeleteButton.jsx";

export default function TrackItem({track, index, onSwap, onDelete}) {

    const [previewUrl, setPreviewUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchiTunesPreview = async () => {
            try {
                setLoading(true);
                const query = encodeURIComponent(`${track.name} ${track.artists[0].name}`);

                const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=1`);
                const data = await res.json();

                if (data.results && data.results.length > 0) {
                    setPreviewUrl(data.results[0].previewUrl);
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (track) {
            fetchiTunesPreview()
        }
    }, [track]);


    return (
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
                <span className="track-artist"> {track.artists?.map((artist) => artist.name).join(', ')} </span>
            </div>

            <div>
                {loading ? 'Loading...' : (
                    previewUrl ? (
                        <AudioPlayer previewUrl={previewUrl}/>
                    ) : <span className="no-preview">
                    No preview...
                    </span>
                )
                }
            </div>
            {onSwap && (
                <div>
                    <SwapButton onClick={() => onSwap(index, track.artists[0].name)}/>
                </div>
            )}

            {onDelete && (
                <div>
                    <DeleteButton onDelete={() => {onDelete(track.id)}}/>
                </div>
            )}
        </li>
    )
}
