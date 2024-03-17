import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'


const User = (props: {userId: string}) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[props.userId]
        }),
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${props.userId}`)

        const handleUserNameLink = () => navigate(`/dash/referrals/user/${props.userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className={`${cellStatus} bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span onClick={handleUserNameLink}>
                        {user.username}
                    </span>
                </th>
                <td className={`${cellStatus} px-6 py-4`}>
                    {userRolesString}
                </td>
                <td className="px-6 py-4 text-right">
                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" 
                       onClick={handleEdit}>Edit</span>
                </td>
            </tr>
        )

    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser