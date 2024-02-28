import { useGetReferralsQuery } from "./referralsApiSlice"
import Referral from "./Referral"

const ReferralsList = () => {
    const {
        data: referrals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReferralsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    // if (isError) {
    //     content = <p className="errmsg">{error?.data?.message}</p>
    // }

    if (isError && error) {
        if ('status' in error) {
          content = <p className="errmsg">{'error' in error ? error.error : JSON.stringify(error.data)}</p>
        } else {
          content = <div>{error.message}</div>
        }
      }

    if (isSuccess) {
        const { ids } = referrals

        const tableContent = ids?.length
            ? ids.map((referralId: string) => <Referral key={referralId} referralId={referralId} />)
            : null

        content = (
            <table className="table table--referrals">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th referral__status">Username</th>
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