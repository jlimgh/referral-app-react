import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/usersApiSlice"
import { UserProps } from "../../models/UserProps"
import NewReferralForm from "./NewReferralForm"

const NewReferral = () => {
    const users = useSelector(selectAllUsers) as UserProps[]

    const content = users ? <NewReferralForm users={users} /> : <p>Loading...</p>

    return content
}

export default NewReferral