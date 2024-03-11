import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useGetReferralsQuery } from './referralsApiSlice'
import { memo } from 'react'

const Referral = (props: {referralId: string}) => {

    const { referral } = useGetReferralsQuery("referralsList", {
        selectFromResult: ({ data }) => ({
            referral: data?.entities[props.referralId]
        }),
    })

    const navigate = useNavigate()

    if (referral) {
        const created = new Date(referral.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(referral.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/referrals/${props.referralId}`)

        return (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {referral.completed
                        ? <span className="referral__status--completed">Completed</span>
                        : <span className="referral__status--open">Open</span>
                    }
                </th>
                <td className="px-6 py-4">{created}</td>
                <td className="px-6 py-4">{updated}</td>
                <td className="px-6 py-4">{referral.title}</td>
                <td className="px-6 py-4">{referral.username}</td>
                <td className="px-6 py-4">
                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={handleEdit}>Edit</span>
                </td>
            </tr>
        )

    } else return null
}

const memoizedReferral = memo(Referral)

export default memoizedReferral