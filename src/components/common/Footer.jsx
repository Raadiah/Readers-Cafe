import { SocialIcon } from 'react-social-icons'

function Footer() {
    return (
        <div>
            <footer className="footer footer-center bg-base-200 text-base-content p-4 border-t">
                <aside>
                    <p className='space-x-2'>
                        <SocialIcon className='w-6 h-6' title='LinkedIn' url='https://www.linkedin.com/in/soomanib/' target='_blank'></SocialIcon>
                        <SocialIcon title='GitHub' url='https://github.com/Raadiah' target='_blank'></SocialIcon>
                        <SocialIcon title='LeetCode' url='https://leetcode.com/u/soomanibkz/' target='_blank'></SocialIcon>
                    </p>
                    <p>
                        Reader's Cafe, Dhaka, Bangladesh
                        <br />
                        Contact: (+88)01533389101
                    </p>
                    <p>
                        <a href="https://www.flaticon.com/free-icons/bookstore" title="bookstore icons">Bookstore icons on title created by Payungkead - Flaticon</a>
                        <br />
                        <a href="https://www.vecteezy.com/free-vector/404-error">404 Error Vectors by Vecteezy</a>
                    </p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer