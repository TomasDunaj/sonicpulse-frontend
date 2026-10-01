export default function Profile({ user }) {
    return (
        <div className="profile-container">
            <h2>Welcome, <span className="user-name">{user.displayName}</span> </h2>
            <p>Email : {user.email}</p>
        </div>
    )

}
