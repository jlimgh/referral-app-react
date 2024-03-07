import { useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewReferralMutation } from "./referralsApiSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { UserProps } from "../../models/UserProps"

const NewReferralForm: React.FC<{users: UserProps[]}> = ({users}) => {
    const [addNewReferral, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReferralMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users ? users[0].id : '')

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
    const onUserIdChanged = (e: { target: { value: SetStateAction<string | undefined>; }; }) => setUserId(e.target.value)

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

            <form className="form" onSubmit={onSaveReferralClicked}>
                <div className="form__title-row">
                    <h2>New Referral</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    REFERRED BY:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content

}

export default NewReferralForm