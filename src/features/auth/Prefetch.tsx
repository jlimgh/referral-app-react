import { store } from '../../app/store'
import { referralsApiSlice } from '../referrals/referralsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(referralsApiSlice.util.prefetch('getReferrals', 'referralsList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch