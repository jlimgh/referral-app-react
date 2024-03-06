import NewReferralForm from "./NewReferralForm"
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"

const NewReferral = () => {
    useTitle('Referral Dashboard: New Referral')
    
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id: string) => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewReferralForm users={users} />

    return content
}

export default NewReferral