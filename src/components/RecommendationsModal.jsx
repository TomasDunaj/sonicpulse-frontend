import TrackItem from "./TrackItem.jsx";
import {useEffect, useState} from "react";

export default function RecommendationsModal({isOpen, onClose}) {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8080';

    useEffect(() => {
        if (isOpen) {
            const fetchRecommendations = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${API_URL}/api/spotify/recommendations`, {
                        method: 'GET',
                        credentials: 'include'
                    });
                    const data = await response.json();
                    setTracks(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchRecommendations();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Recommended tracks </h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {isLoading ? (
                        <div className="spinner">
                            Loading recommendations...
                        </div>
                    ) : (
                        <ul className="tracks-list">
                            {tracks.map((track, index) => (
                                <TrackItem
                                    key={track.id || index}
                                    track={track}
                                    index={index}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}