import { useGetReferralsQuery } from "./referralsApiSlice"
import Referral from "./Referral"
import useAuth from "../../hooks/useAuth"

const ReferralsList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: referrals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReferralsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError && error && 'data' in error) {
        content = <p className="errmsg">{(error.data as {message: string}).message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = referrals

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter((referralId: string) => entities[referralId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map((referralId: string) => <Referral key={referralId} referralId={referralId} />)

        content = (
            <table className="table table--referrals">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th referral__status">Status</th>
                        <th scope="col" className="table__th referral__created">Created</th>
                        <th scope="col" className="table__th referral__updated">Updated</th>
                        <th scope="col" className="table__th referral__title">Title</th>
                        <th scope="col" className="table__th referral__username">Owner</th>
                        <th scope="col" className="table__th referral__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default ReferralsList