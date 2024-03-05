import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { JwtPayload, jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let status = "Employee"

    interface JwtDecoded extends JwtPayload {
        UserInfo: {
            username: string;
            roles: string[]
        }
    }

    if (token) {
        const decoded = jwtDecode(token) as JwtDecoded
        const { username, roles }  = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth