import { Link } from "react-router-dom";
import { useAddNewSignupEmailMutation } from "../features/public/publicApiSlice";
import { SetStateAction, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Public = () => {
    const [addNewSignupEmail, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewSignupEmailMutation()

    const [email, setEmail] = useState('')

    useEffect(() => {
        if (isSuccess) {
            console.log('success email sent')
            setEmail('')
        }

    }, [isSuccess])

    const onEmailChanged = (e: { target: { value: SetStateAction<string> } }) => {
        console.log('e.target.value: ', e.target.value)
        setEmail(e.target.value)
    }

    const onAddEmailClicked = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        console.log('email: ', email);
        if (email) {
            await addNewSignupEmail({ email })
        }
    }

    let errorMsg;
    if (isError && error && 'data' in error) {
        errorMsg = (error.data as { message: string }).message
    }

    ``
    
    let signupButtonLabel = isLoading ? <PulseLoader color={"#FFF"} /> : 'Sign up'


    const content = (
        // <section className="public">
        //     <header>
        //         <h1>Referral App</h1>
        //     </header>
        //     <main className="public__main">
        //         <p>Incentivized Referrals. A platform to keep track of your referral users and their referrals </p>
        //         <p>Ex. You pay $50 for each referral if the transaction is completed.  Referrers can come here to add referrals and check on referral statuses </p>
        //         <br />
        //         <p>Test case for Cars salesman</p>
        //     </main>
        //     <footer>
        //         <Link to="/login">Referrer Login</Link>
        //     </footer>
        // </section>
        
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Incentivized Referrals Tracker</h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-72 dark:text-gray-200">Keep track of your referrals and unlock rewards while spreading the word: Refer, Earn, Repeat: Benefits await!"</p>
                <form className="w-full max-w-md mx-auto" onSubmit={onAddEmailClicked}>   
                    <label htmlFor="default-email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Email sign-up</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                            </svg>
                        </div>
                        <input 
                            type="email" 
                            id="default-email" 
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Enter your email here..." 
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChanged}
                            required />
                        <button 
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit">
                                {signupButtonLabel}
                        </button>
                    </div>
                </form>
                <p className="text-red-600 p-2">{errorMsg}</p>
            </div>
            <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 z-10 relative">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                            Step 1
                        </span>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Start with signing up</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Sign up as a referrer and we'll reach out to get you onboarded: Join our referral program and become part of our network. </p>
                        {/* <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </a> */}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                            Step 2
                        </span>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Create a list of referrals</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Refer potential buyers or sellers: Share your network with us and introduce individuals interested in selling or buying.</p>
                        {/* <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a> */}
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                        <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2">
                            Step 3
                        </span>
                        <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">Get rewarded</h2>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Earn rewards upon closing: Get paid when your referrals successfully close a deal, turning connections into cash!</p>
                        {/* <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a> */}
                    </div>
                </div>
            </div>
            <footer className="bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-center">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Referral Tracker. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <Link to="/login">
                                <button type="submit" className="me-4 md:me-6 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600">Login</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </section>

    )
    return content
}

export default Public;