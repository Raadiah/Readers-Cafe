import { SocialIcon } from 'react-social-icons'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'

function Footer() {
    return (
        <div>
            <footer className="footer bg-base-200 p-10">
                <aside>
                    <img
                    className='w-10 h-10'
                    src='title-icon.png'
                    ></img>
                    <p>
                        Reader's Cafe
                        <br />
                        Dhaka, Bangladesh
                        <br />
                        Contact: (+88)01500000000
                        <br />
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <p className='flex gap-3 items-center'>
                            <a href='https://www.linkedin.com/in/soomanib/'>
                                <FaLinkedin className='w-8 h-8 text-sky-600'></FaLinkedin>
                            </a>
                            <a href='https://github.com/Raadiah'>
                                <FaGithub className='w-8 h-8'></FaGithub>
                            </a>
                            <a href='https://youtube.com/'>
                                <FaYoutube className='w-8 h-8 text-red-600'></FaYoutube>
                            </a>
                        </p>
                    </div>
                    <p>
                        <a className='text-xs italic' href="https://www.flaticon.com/free-icons/bookstore" title="bookstore icons">Bookstore icons on title created by Payungkead - Flaticon</a>
                        <br />
                        <a className='text-xs italic' href="https://www.vecteezy.com/free-vector/404-error">404 Error Vectors by Vecteezy</a>
                    </p>
                </nav>
            </footer>
        </div>
    )
}

export default Footer