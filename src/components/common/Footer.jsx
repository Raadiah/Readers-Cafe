import { SocialIcon } from 'react-social-icons'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

function Footer() {
    return (
        <div>
            <footer className="footer footer-center bg-base-200 text-base-content p-4">
                <aside>
                    <p className='flex gap-3 items-center'>
                        <a href='https://www.linkedin.com/in/soomanib/'>
                            <FaLinkedin className='w-8 h-8 text-sky-600'></FaLinkedin>
                        </a>
                        <a href='https://github.com/Raadiah'>
                            <FaGithub className='w-8 h-8'></FaGithub>
                        </a>
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