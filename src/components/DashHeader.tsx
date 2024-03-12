import useAuth from '../hooks/useAuth'

const DashHeader = () => {
    const { username, status, isManager, isAdmin } = useAuth()
    
    const content = (
        <>
            <div className="space-y-2">
                <div className="profile-content">
                    <p>{username}</p>
                    <p>{new Date().toLocaleDateString()}</p>
                    <p>Status: {status}</p>
                </div>
            </div>
        </>
    )

    return content
}

export default DashHeader
