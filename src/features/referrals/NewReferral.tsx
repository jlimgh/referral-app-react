import NewReferralForm from "./NewReferralForm"
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"
import useAuth from "../../hooks/useAuth"
import { UserProps } from "../../models/UserProps"

const NewReferral = () => {
    useTitle('Referral Dashboard: New Referral')

    const { username } = useAuth()
    
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id: string) => data?.entities[id])
        }),
    })

    const currentUserId: string = users ? users.filter((user: UserProps) => user.username === username)[0]._id : ''

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewReferralForm users={users} currentUserId={currentUserId} />

    return content
}

export default NewReferral