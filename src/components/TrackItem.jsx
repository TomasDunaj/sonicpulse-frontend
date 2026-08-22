import {useState, useEffect} from 'react'
import AudioPlayer from "./AudioPlayer.jsx";

export default function TrackItem({track}) {

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
        <div className="track-item">
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
            </li>

            <div>
                {loading ? 'Loading...' : (
                    previewUrl ? (
                        <AudioPlayer previewUrl={previewUrl}/>
                    ) : <span>
                    No preview...
                    </span>
                )
                }
            </div>
        </div>


    )
}
