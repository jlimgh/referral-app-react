import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    // if (isError && 'status' in error) {
    //     content = <p className="errmsg">{'error' in error ? error.error : JSON.stringify(error.data)}</p>
    // } else {
    //     content = <p className="errmsg">{error.message}</p>
    // }


    if (isError && error) {
        if ('status' in error) {
          content = <p className="errmsg">{'error' in error ? error.error : JSON.stringify(error.data)}</p>
        } else {
          content = <div>{error.message}</div>
        }
      }

    if (isSuccess) {
        console.log('users: ', users);
        const { ids } = users
        // const ids = users?.map(user => user.id); 

        const tableContent = ids?.length
            ? ids.map((userId: string) => <User key={userId} userId={userId} />)
            : null

        content = (
            <table className="table table--users">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th user__username">Username</th>
                        <th scope="col" className="table__th user__roles">Roles</th>
                        <th scope="col" className="table__th user__edit">Edit</th>
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
export default UsersList