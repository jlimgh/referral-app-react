import { useGetReferralsByUserQuery } from "./referralsApiSlice"
import Referral from "./Referral"
import useAuth from "../../hooks/useAuth"
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"
import { useParams } from "react-router-dom"

const UserReferralsList = () => {
    useTitle('Referral Dashboard: User Referral List')

    const { id } = useParams();

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: referrals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReferralsByUserQuery(id, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError && error && 'data' in error) {
        content = <p className="errmsg">{(error.data as {message: string}).message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = referrals

        let filteredIds = [...ids]
        const referralOwnerUsername = ids.length ? entities[ids[0]].username : null

        if (!isManager && !isAdmin) {
            if (referralOwnerUsername !== username) {
                return <p className="errmsg">No access</p>
            }
        }
        // if (isManager || isAdmin) {
        //     filteredIds = [...ids]
        // } else {
        //     filteredIds = ids.filter((referralId: string) => entities[referralId].username === username)
        // }

        const tableContent = ids?.length && filteredIds.map((referralId: string) => <Referral key={referralId} referralId={referralId} />)

        content = (
            <>
                <h1 className="text-lg mb-5 text-center sm:text-left">{`${referralOwnerUsername}'s Referrals`}</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Created</th>
                                <th scope="col" className="px-6 py-3">Updated</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Owner</th>
                                <th scope="col" className="px-6 py-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    return content
}
export default UserReferralsList