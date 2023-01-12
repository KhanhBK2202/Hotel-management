import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCreditCard } from '@fortawesome/free-regular-svg-icons';

import styles from './Profile.module.scss'
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles)

function Profile() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const { id } = useParams()
    const [currPane, setCurrPane] = useState()
    const [rightSection, setRightSection] = useState()
    useEffect(() => {
        // Because when element displays none, it cannot use querySelector anymore, so I store it in a global variable using useState
        const accountSection = document.querySelector('.' + cx('active-section'))
        setRightSection(accountSection)
    },[])

    useEffect(() => {
        const panes = document.querySelectorAll('.' + cx('pane'));
        const accountPane = document.querySelector('.' + cx('right-pane'))

        // Display review
        const reviews = document.querySelectorAll('.' + cx('user-review__heading'))
        reviews.forEach((review, index) => {
            const pane = panes[index];
            review.onclick = function () {
                if (currPane) {
                    currPane.classList.remove(cx('active-pane'))
                }
                setCurrPane(pane)
                rightSection.classList.remove(cx('active-section'))
                accountPane.classList.add(cx('active-pane'));
                pane.classList.add(cx('active-pane'))
            }
        })
    },[currPane, rightSection]);

    useEffect(() => {
        const panes = document.querySelectorAll('.' + cx('pane'));
        const accountPane = document.querySelector('.' + cx('right-pane'))
        
        // Display section
        const sections = document.querySelectorAll('.' + cx('section'));
        sections.forEach((section, index) => {
            const pane = panes[index + 2];
            section.onclick = function () {
                setCurrPane(pane)
                rightSection.classList.remove(cx('active-section'))
                accountPane.classList.add(cx('active-pane'));
                pane.classList.add(cx('active-pane'))
            };
        })
    },[rightSection]);

    const handleBack = () => {
        const accountPane = document.querySelector('.' + cx('right-pane'))
        rightSection.classList.add(cx('active-section'))
        accountPane.classList.remove(cx('active-pane'))
        currPane.classList.remove(cx('active-pane'))
    }

    const [guest, setGuest] = useState()
    useEffect(() => {
        request
            .get(`/api/v1/user/${id}`, {headers: {token: `Beaer ${accessToken}`}})
            .then(res => setGuest(res))
            .catch(err => console.log(err))
    },[])
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <div className={cx('avatar')}>
                    <Image className={cx('avatar-img')} src='' alt=''/>
                </div>

                <div className={cx('general-info')}>
                    <h1 className={cx('name')}>{guest.username}</h1>
                    <span className={cx('join')}>Joined in 2022</span>

                    <h1 className={cx('total-bookings')}>
                        4
                    </h1>
                    Bookings
                </div>
                
                <div className={cx('user-wrapper')}>
                    <div className={cx('user-intro')}>
                        <h3 className={cx('user-intro__heading')}>Bio</h3>
                        <p className={cx('user-intro__bio')}>I'm Khanh, currently pursuing my degree in computer science in HCM City University of Technology. I'm a dog enthusicast and a coffee addict. I'm very friendly and easy-going! </p>
                    </div>
    
                    <ul className={cx('user-social')}>
                        <li className={cx('user-social-icon')}>
                            <Link to='facebook.com' target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} className={cx('social-icon')}/>
                            </Link>
                        </li>
                        <li className={cx('user-social-icon')}>
                            <Link to='instagram.com' target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className={cx('social-icon')}/>
                            </Link>
                        </li>
                        <li className={cx('user-social-icon')}>
                            <Link to='twitter.com' target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className={cx('social-icon')}/>
                            </Link>
                        </li>
                    </ul>
    
                    <div className={cx('user-review')}>
                        <h3 className={cx('user-review__heading')}>Reviews about you</h3>
                        <h3 className={cx('user-review__heading')}>Reviews by you</h3>
                    </div>
                </div>
            </div>

            <div className={cx('right')}>
            
                <div className={cx('right-section', 'active-section')}>
                    <h2 className={cx('right-heading')}>Account</h2>
                    <div className={cx('right-inner-section')}>
                        <div className={cx('section')}>
                            <div className={cx('section-icon')}>
                                <FontAwesomeIcon icon={faAddressCard}/>
                            </div>
                            <h3 className={cx('section-name')}>
                                Personal info
                            </h3>
                            <span className={cx('section-description')}>
                                Provide personal details and how we can reach you
                            </span>
                        </div>
                        <div className={cx('section')}>
                            <div className={cx('section-icon')}>
                                <FontAwesomeIcon icon={faShieldHalved}/>
                            </div>
                            <h3 className={cx('section-name')}>
                                Login &amp; security
                            </h3>
                            <span className={cx('section-description')}>
                                Update your password and secure your account
                            </span>
                        </div>
                        <div className={cx('section')}>
                            <div className={cx('section-icon')}>
                                <FontAwesomeIcon icon={faCreditCard}/>
                            </div>
                            <h3 className={cx('section-name')}>
                                Payments &amp; payouts
                            </h3>
                            <span className={cx('section-description')}>
                                Review payments, payouts and coupons
                            </span>
                        </div>
                        <div className={cx('section')}>
                            <div className={cx('section-icon')}>
                                <FontAwesomeIcon icon={faHistory}/>
                            </div>
                            <h3 className={cx('section-name')}>
                                History bookings
                            </h3>
                            <span className={cx('section-description')}>
                                Details of your previous bookings
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cx('right-pane')}>
                    <div className={cx('back-pane')} onClick={handleBack}>
                        &lt; Back to account
                    </div>
                    <div className={cx('pane')}>
                        Reviews about you
                    </div>
                    <div className={cx('pane')}>
                        Reviews by you
                    </div>
                    <div className={cx('pane')}>
                        Personal info
                    </div>
                    <div className={cx('pane')}>
                        Login &amp; security
                    </div>
                    <div className={cx('pane')}>
                        Payments &amp; payouts
                    </div>
                    <div className={cx('pane')}>
                        History bookings
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
