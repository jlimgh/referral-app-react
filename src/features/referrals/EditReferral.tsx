import { useParams } from 'react-router-dom'
import EditReferralForm from './EditReferralForm'
import { useGetReferralsQuery } from './referralsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const EditReferral = () => {
    const { id } = useParams();

    const { username, isManager, isAdmin } = useAuth()

    const { referral } = useGetReferralsQuery("referralsList", {
        selectFromResult: ({ data }) => ({
            referral: data?.entities[id ? id : '']
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map((id: string) => data?.entities[id])
        }),
    })

    if (!referral || !users?.length) return <PulseLoader color={"#FFF"} />

    if (!isManager && !isAdmin) {
        if (referral.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditReferralForm referral={referral} users={users} />

    return content
}

export default EditReferral