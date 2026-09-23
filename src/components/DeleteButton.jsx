export default function DeleteButton({onDelete}) {
    return (
        <button className="delete-button" onClick={onDelete}>
            Delete
        </button>
    )
}