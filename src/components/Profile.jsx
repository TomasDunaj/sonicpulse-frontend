import './Profile.css';


export default function Profile({ user }) {
    return (
        <div className="profile-container">
            <h2>Welcome, {user.displayName}</h2>
            <p>Email : {user.email}</p>
        </div>
    )

}
