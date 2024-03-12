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
                    {/* <div className="mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span className="ml-2">Los Angeles, CA</span>
                    </div> */}
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