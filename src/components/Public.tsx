import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Referral App</h1>
            </header>
            <main className="public__main">
                <p>Incentivized Referrals. A platform to keep track of your referral users and their referrals </p>
                <p>Ex. You pay $50 for each referral if the transaction is completed.  Referrers can come here to add referrals and check on referral statuses </p>
                <br />
                <p>Test case for Cars salesman</p>
            </main>
            <footer>
                <Link to="/login">Referrer Login</Link>
            </footer>
        </section>

    )
    return content
}

export default Public;