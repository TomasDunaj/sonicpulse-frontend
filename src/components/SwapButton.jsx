export default function SwapButton({ onClick }) {
    return (
        <button className="swap-button" onClick={onClick}>
            <span className="icon">🔄</span>  Change
            </button>
    );
}