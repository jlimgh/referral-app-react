import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReferralProps } from "../../models/ReferralProps"
import { UserProps } from "../../models/UserProps"
import { useDeleteReferralMutation, useUpdateReferralMutation } from "./referralsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditReferralForm: React.FC<{referral: ReferralProps, users: UserProps[]}> = ({referral, users}) => {
  console.log('referral: ', referral);
  console.log('users: ', users);  

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
  const [completed, setCompleted] = useState(referral.completed)
  const [userId, setUserId] = useState(referral.user)

  useEffect(() => {

    if (isSuccess || isDelSuccess) {
        setTitle('')
        setText('')
        setUserId('')
        navigate('/dash/referrals')
    }

  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = (e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)
  const onTextChanged = (e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)
  const onCompletedChanged = () => setCompleted(prev => !prev)
  const onUserIdChanged = (e: { target: { value: SetStateAction<string>; }; }) => setUserId(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveReferralClicked = async () => {
    if (canSave) {
        await updateReferral({ id: referral.id, user: userId, title, text, completed })
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
    if (isError && error) {
        console.log('inside isError && error: ', error);
        if ('status' in error) {
            errorMsg = 'error' in error ? error.error : JSON.stringify(error.data)
        } else {
            errorMsg = error.message;
        }
    } else if (isDelError && delerror) {
        console.log('inside isDelError && delerror: ', delerror);
        if ('status' in delerror) {
            errorMsg = 'error' in delerror ? delerror.error : JSON.stringify(delerror.data)
        } else {
            errorMsg = delerror.message;
        }
    }

//   const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  const content = (
    <>
        <p className={errClass}>{errorMsg}</p>

        <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Referral #{referral.ticket}</h2>
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveReferralClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                        className="icon-button"
                        title="Delete"
                        onClick={onDeleteReferralClicked}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
            <label className="form__label" htmlFor="referral-title">
                Title:</label>
            <input
                className={`form__input ${validTitleClass}`}
                id="referral-title"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
            />

            <label className="form__label" htmlFor="referral-text">
                Text:</label>
            <textarea
                className={`form__input form__input--text ${validTextClass}`}
                id="referral-text"
                name="text"
                value={text}
                onChange={onTextChanged}
            />
            <div className="form__row">
                <div className="form__divider">
                    <label className="form__label form__checkbox-container" htmlFor="referral-completed">
                        DEAL CLOSED:
                        <input
                            className="form__checkbox"
                            id="referral-completed"
                            name="completed"
                            type="checkbox"
                            checked={completed}
                            onChange={onCompletedChanged}
                        />
                    </label>

                    <label className="form__label form__checkbox-container" htmlFor="referral-username">
                        REFERRED BY:</label>
                    <select
                        id="referral-username"
                        name="username"
                        className="form__select"
                        value={userId}
                        onChange={onUserIdChanged}
                    >
                        {options}
                    </select>
                </div>
                <div className="form__divider">
                    <p className="form__created">Created:<br />{created}</p>
                    <p className="form__updated">Updated:<br />{updated}</p>
                </div>
            </div>
        </form>
    </>
  )

  return content
}

export default EditReferralForm