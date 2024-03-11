import useAuth from '../hooks/useAuth'

const DashHeader = () => {
    const { username, status, isManager, isAdmin } = useAuth()
    
    const content = (
        <>
            <div className="space-y-2">
                <div className="profile-content">
                    <div>{username}</div>
                    <div>{new Date().toLocaleDateString()}</div>
                    <div>Status: {status}</div>
                </div>
            </div>
        </>
    )

    return content
}

export default DashHeader
