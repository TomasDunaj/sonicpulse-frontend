export default function ModeSelector({selectedMode, onChange}) {

    const MODES = {
        RESTRICTIVE: "RESTRICTIVE",
        OPEN_MINDED: "OPEN_MINDED",
    };

    return (
        <div className="mode-selector-container">
            <span className="mode-selector-label">
                Generation mode :
            </span>

            <button type="button"
                    className={`mode-selector-button ${selectedMode === MODES.OPEN_MINDED ? "active" : ""}`}
                    onClick={() => onChange(MODES.OPEN_MINDED)}
            >
                Open-minded
            </button>

            <button type="button"
                    className={`mode-selector-button ${selectedMode === MODES.RESTRICTIVE ? "active" : ""}`}
                    onClick={() => onChange(MODES.RESTRICTIVE)}
            >
                Restrictive
            </button>
        </div>
    )
}