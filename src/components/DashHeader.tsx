import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASH_REGEX = /^\/dash(\/)?$/
const REFERRALS_REGEX = /^\/dash\/referrals(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    /* useEffect isSuccess NOT triggering in after successful logout - currently using `logoutHandler` as a workaround */
    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    const logOutHandler = async () => {
        try {
          await sendLogout({}).unwrap();
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
    
    const onNewReferralClicked = () => navigate('/dash/referrals/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onReferralsClicked = () => navigate('/dash/referrals')
    const onUsersClicked = () => navigate('/dash/users')

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }

    if (isError && error && 'data' in error) {
        return <p>Error: {JSON.stringify(error?.data)}</p>
    }

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !REFERRALS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newReferralButton = null
    if (REFERRALS_REGEX.test(pathname)) {
        newReferralButton = (
            <button
                className="icon-button"
                title="New Referral"
                onClick={onNewReferralClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let referralsButton = null
    if (!REFERRALS_REGEX.test(pathname) && pathname.includes('/dash')) {
        referralsButton = (
            <button
                className="icon-button"
                title="Referrals"
                onClick={onReferralsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={logOutHandler}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"
    let errMsg;
    if (isError && error && 'data' in error) {
        errMsg = (error.data as {message: string}).message;
    }

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {/* {newReferralButton} */}
                {/* {newUserButton} */}
                {/* {referralsButton} */}
                {/* {userButton} */}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errMsg}</p>
            <div className="space-y-2">
                <div className="title-header">
                    <Link to="/dash">
                        <span className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Referral App Title</span>
                        </span>
                    </Link>
                </div>
                <div className="profile-content">
                    <div>Date?</div>
                    <div>Username: Test Username</div>
                    <div>Status: Admin Test</div>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </div>
        </>
    )

    return content
}

export default DashHeader
