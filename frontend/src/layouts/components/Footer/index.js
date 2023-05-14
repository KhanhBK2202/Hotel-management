import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { faGithub, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Footer() {
    return (
        // <footer className={cx('footer')}>
        //     <Link to="/" className={cx('logo')}>KQ Luxury</Link>
        //     <div className={cx('description')}>
        //         Smarter meetings, all in one place
        //     </div>
        //     <div className={cx('copyright')}>
        //         <span>&copy; KQ Luxury 2023</span>
        //         <ul className={cx('copyright-list')}>
        //             <li className={cx('copyright-item')}>Term</li>
        //             <li className={cx('copyright-item')}>Cookie Policy</li>
        //             <li className={cx('copyright-item')}>Privacy Policy</li>
        //             <li className={cx('copyright-item')}>License</li>
        //         </ul>
        //     </div>
        // </footer>

        <div className={cx('wrapper-footer')}>
            <h2 className={cx('brand-name')}>KQ Luxury</h2>
            <div className={cx('brand-slogan')}>
                Relaxation at a beautiful peak.
                <br/>
                With us, you will get only pure high-class treatment.
            </div>
            <div className={cx('brand-category')}>
                <Link to='/' className={cx('brand-category-item')}>Homepage</Link>
                <Link to='/about' className={cx('brand-category-item')}>About us</Link>
                <Link to='/checkout' className={cx('brand-category-item')}>Your booking</Link>
                {/* <Link to='/checkout' className={cx('brand-category-item')}>Cart</Link> */}
            </div>
            <div className={cx('brand-privacy')}>
                <div className={cx('brand-copyright')}>&copy; 2023 KQ Luxury. All rights reserved.</div>
                <div className={cx('brand-media')}>
                    <Link to='twitter.com'>
                        <FontAwesomeIcon className={cx('media')} icon={faTwitter}/>
                    </Link>
                    <Link to='instagram.com'>
                        <FontAwesomeIcon className={cx('media')} icon={faInstagram}/>
                    </Link>
                    <Link to='facebook.com'>
                        <FontAwesomeIcon className={cx('media')} icon={faFacebook} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
