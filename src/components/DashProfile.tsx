import useAuth from '../hooks/useAuth'

const DashProfile = () => {
    const { username, status } = useAuth()
    
    const content = (
        <>
            <div className="space-y-2">
                <div className="profile-content px-2 text-sm">
                    <div className="mb-2">
                        {username}
                    </div>
                    <div className="mb-2">
                        Los Angeles, CA
                    </div>
                    <div className="mb-2">{status}</div>
                </div>
            </div>
        </>
    )

    return content
}

export default DashProfile