import { useGetReferralsQuery } from "./referralsApiSlice"
import Referral from "./Referral"
import useAuth from "../../hooks/useAuth"
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"

const ReferralsList = () => {
    useTitle('Referral Dashboard: Referral List')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: referrals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReferralsQuery('referralsList', {
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

        let filteredReferral
        if (isManager || isAdmin) {
            filteredReferral = [...ids].map((id: string) => {
                return {
                    referralId: id,
                    userId: entities[id].user
                }
            })
        } else {
            filteredReferral = ids
                .filter((referralId: string) => entities[referralId].username === username)
                .map((id: string) => {
                    return {
                        referralId: id,
                        userId: entities[id].user
                    }
                })
        }

        const tableContent = ids?.length && filteredReferral.map((referral: {referralId: string, userId: string}) => <Referral key={referral.referralId} referralId={referral.referralId} userId={referral.userId} />)

        content = (
            <>
                <h1 className="text-lg mb-5 text-center sm:text-left">Referrals</h1>
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
export default ReferralsList