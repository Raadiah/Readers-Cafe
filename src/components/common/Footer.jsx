import { SocialIcon } from 'react-social-icons'

function Footer() {
    return (
        <footer className="footer w-full footer-center bg-base-200 text-base-content rounded p-10 border-t-2">
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <SocialIcon title='LinkedIn' url='https://www.linkedin.com/in/soomanib/' target='_blank'></SocialIcon>
                    <SocialIcon title='GitHub' url='https://github.com/Raadiah' target='_blank'></SocialIcon>
                    <SocialIcon title='LeetCode' url='https://leetcode.com/u/soomanibkz/' target='_blank'></SocialIcon>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by Reader's Cafe</p>
                <p>
                    <a href="https://www.flaticon.com/free-icons/bookstore" title="bookstore icons">Bookstore icons on title created by Payungkead - Flaticon</a>
                </p>
                <p>
                    <a href="https://www.vecteezy.com/free-vector/404-error">404 Error Vectors by Vecteezy</a>
                </p>
            </aside>
        </footer>
    )
}

export default Footer