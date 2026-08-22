import {useRef, useState} from "react";

export default function AudioPlayer({previewUrl}) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div className="audio-player">
            <audio ref={audioRef}
                   src={previewUrl}
                   onEnded={() => setIsPlaying(false)}/>
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}