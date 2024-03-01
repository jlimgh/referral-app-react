import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { RootState } from '../../app/store'
import EditUserForm from './EditUserForm'
import { UserProps } from '../../models/UserProps'

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector((state: RootState) => selectUserById(state, id)) as UserProps

    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content
}
export default EditUser