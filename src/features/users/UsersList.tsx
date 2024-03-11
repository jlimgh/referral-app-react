import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
    useTitle('Referral Management: Users List')
    
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError && error && 'data' in error) {
          content = <p className="errmsg">{(error.data as {message: string}).message}</p>
    }

    if (isSuccess) {
        const { ids } = users

        const tableContent = ids?.length && ids.map((userId: string) => <User key={userId} userId={userId} />)

        content = (
            // <table className="relative overflow-x-auto shadow-md sm:rounded-lg">
            //     <thead className="table__thead">
            //         <tr>
            //             <th className="table__th user__username">Username</th>
            //             <th className="table__th user__roles">Roles</th>
            //             <th className="table__th user__edit">Edit</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {tableContent}
            //     </tbody>
            // </table>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Roles
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        )
    }

    return content
}
export default UsersList