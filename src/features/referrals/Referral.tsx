import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectReferralById } from './referralsApiSlice'
import { RootState } from '../../app/store'

const Referral = (props: {referralId: string}) => {

    const referral = useSelector((state: RootState) => selectReferralById(state, props.referralId))

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
export default Referral