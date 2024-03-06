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
            <tr className="table__row">
                <td className="table__cell referral__status">
                    {referral.completed
                        ? <span className="referral__status--completed">Completed</span>
                        : <span className="referral__status--open">Open</span>
                    }
                </td>
                <td className="table__cell referral__created">{created}</td>
                <td className="table__cell referral__updated">{updated}</td>
                <td className="table__cell referral__title">{referral.title}</td>
                <td className="table__cell referral__username">{referral.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedReferral = memo(Referral)

export default memoizedReferral