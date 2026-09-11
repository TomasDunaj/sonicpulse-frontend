export default function DeleteButton({onDelete}) {
    return (
        <button className="delete-btn" onClick={onDelete}>
            Delete
        </button>
    )
}