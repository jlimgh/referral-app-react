import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewReferralMutation } from "./referralsApiSlice";
import { UserProps } from "../../models/UserProps"

const NewReferralForm: React.FC<{users: UserProps[], currentUserId: string}> = ({users, currentUserId}) => {
    const [addNewReferral, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReferralMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(currentUserId ? currentUserId : '')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/referrals')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = (e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)
    const onTextChanged = (e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)
    const onUserIdChanged = (e: { target: { value: SetStateAction<string>; }; }) => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveReferralClicked = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (canSave) {
            await addNewReferral({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    let errorMsg;
    if (isError && error && 'data' in error) {
        errorMsg = (error.data as { message: string }).message
    }

    const content = (
        <>
            <p className={errClass}>{errorMsg}</p>
            
            <form className="max-w-sm mx-auto pt-12" onSubmit={onSaveReferralClicked}>
                <p className="text-lg text-center pb-4">New Referral</p>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="title">
                        Title:</label>
                    <input
                        className={`${validTitleClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"  htmlFor="text">
                        Text:</label>
                    <textarea
                        className={`${validTextClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        id="text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">
                        Referred by:</label>
                    <select
                        id="username"
                        name="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto min-w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={!canSave}
                    >
                            Add Referral
                    </button>
                </div>

            </form>
        </>

    )

    return content

}

export default NewReferralForm