import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReferralProps } from "../../models/ReferralProps"
import { UserProps } from "../../models/UserProps"
import { useDeleteReferralMutation, useUpdateReferralMutation } from "./referralsApiSlice"
import useAuth from "../../hooks/useAuth"

const EditReferralForm: React.FC<{referral: ReferralProps, users: UserProps[]}> = ({referral, users}) => {
  const { isManager, isAdmin } = useAuth()

  const [updateReferral, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateReferralMutation()

  const [deleteReferral, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteReferralMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(referral.title)
  const [text, setText] = useState(referral.text)
  const [notes, setNotes] = useState(referral.notes ? referral.notes : '')
  const [completed, setCompleted] = useState(referral.completed)
  const [userId, setUserId] = useState(referral.user)

  useEffect(() => {

    if (isSuccess || isDelSuccess) {
        setTitle('')
        setText('')
        setNotes('')
        setUserId('')
        navigate('/dash/referrals')
    }

  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = (e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)
  const onTextChanged = (e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)
  const onNotesChanged = (e: { target: { value: SetStateAction<string>; }; }) => setNotes(e.target.value)
  const onCompletedChanged = () => setCompleted(prev => !prev)
  const onUserIdChanged = (e: { target: { value: SetStateAction<string>; }; }) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveReferralClicked = async () => {
    if (canSave) {
        await updateReferral({ id: referral.id, user: userId, title, text, completed, notes })
    }
  }

  const onDeleteReferralClicked = async () => {
    await deleteReferral({ id: referral.id })
  }

  const created = new Date(referral.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(referral.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

  const options = users.map(user => {
    return (
        <option
            key={user.id}
            value={user.id}

        > {user.username}</option >
    )
  })

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''

  let errorMsg;
    if (isError && error && 'data' in error) {
        errorMsg = (error.data as { message: string }).message
    } else if (isDelError && delerror && 'data' in delerror) {
        errorMsg = (delerror.data as { message: string }).message
    }

  let deleteButton = null
  let btnPosition = null
  let notesContent = null
    if (isManager || isAdmin) {
        btnPosition = 'justify-between'
        deleteButton = (
            <button 
                title="Delete"
                onClick={onDeleteReferralClicked}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto min-w-32 px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                    Delete
            </button>
        )
        notesContent = (
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="referral-notes">
                    Notes:</label>
                <textarea
                    className={`${validTextClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    id="referral-notes"
                    name="notes"
                    rows={4}
                    value={notes}
                    onChange={onNotesChanged}
                />
            </div>
        )
    } else {
        btnPosition = 'justify-end'
        notesContent = (
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="referral-notes">
                    Notes:</label>
                <div>
                    {notes}
                </div>
            </div>
        )
    }

  const content = (
    <>
        <p className={errClass}>{errorMsg}</p>

        <form className="max-w-sm mx-auto pt-3" onSubmit={e => e.preventDefault()}>
            <p className="text-lg text-center pb-4">Edit Referral #{referral.ticket}</p>
            <div className="mb-7">
                <p className="text-xs text-gray-700 dark:text-white">
                    Created: {created}</p>
                <p className="text-xs text-gray-700 dark:text-white">
                    Updated: {updated}</p>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="referral-title">
                    Title:</label>
                <input
                    className={`${validTitleClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    id="referral-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="referral-text">
                    Text:</label>
                <textarea
                    className={`${validTextClass} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    id="referral-text"
                    name="text"
                    rows={4}
                    value={text}
                    onChange={onTextChanged}
                />
            </div>

            {notesContent}

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="referral-username">
                    Referred by:</label>
                <select
                    id="referral-username"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </div>
            <div className="mb-5 flex items-start">
                <div className="flex items-center h-5">
                    <input
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        id="referral-completed"
                        name="completed"
                        type="checkbox"
                        checked={completed}
                        onChange={onCompletedChanged}
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="referral-completed">
                        DEAL CLOSED
                    </label>
                </div>
            </div>
            <div className={`flex ${btnPosition}`}>
                {deleteButton}
                <button 
                    type="submit" 
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto min-w-32 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={!canSave}
                    onClick={onSaveReferralClicked}
                >
                        Edit Referral
                </button>
            </div>
        </form>
    </>
  )

  return content
}

export default EditReferralForm