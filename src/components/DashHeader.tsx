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
            console.log('useEffect isSuccess hit after logout')
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
        console.log('is loading hit in header logout')
        return <p>Logging Out...</p>
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
                {newReferralButton}
                {newUserButton}
                {referralsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errMsg}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">Referral App</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}

export default DashHeader
