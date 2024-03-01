import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectReferralById } from './referralsApiSlice'
import { RootState } from '../../app/store'
import { ReferralProps } from '../../models/ReferralProps'
import EditReferralForm from './EditReferralForm'
import { selectAllUsers } from '../users/usersApiSlice'

const EditReferral = () => {
  const { id } = useParams();

  const referral = useSelector((state: RootState) => selectReferralById(state, id)) as ReferralProps
  const users = useSelector(selectAllUsers);

  const content = referral && users ? <EditReferralForm referral={referral} users={users} /> : <p>Loading...</p>

  return content;
}

export default EditReferral