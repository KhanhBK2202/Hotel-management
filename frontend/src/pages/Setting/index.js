import { Link, useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind'
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faCreditCard } from '@fortawesome/free-regular-svg-icons';

import styles from './Setting.module.scss'
import Image from '~/components/Image';
import { useEffect, useState } from 'react';
import TextEditor from '~/components/TextEditor';

const cx = classNames.bind(styles)

function Setting() {
    
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

        // Display section
        const sections = document.querySelectorAll('.' + cx('section'));
        sections.forEach((section, index) => {
            const pane = panes[index];
            section.onclick = function () {
                setCurrPane(pane)
                rightSection.classList.remove(cx('active-section'))
                accountPane.classList.add(cx('active-pane'));
                pane.classList.add(cx('active-pane'))
            };
        })
    });

    const handleBack = () => {
        const accountPane = document.querySelector('.' + cx('right-pane'))
        rightSection.classList.add(cx('active-section'))
        accountPane.classList.remove(cx('active-pane'))
        currPane.classList.remove(cx('active-pane'))
    }

    const handleSave = () => {
        const accountPane = document.querySelector('.' + cx('right-pane'))
        rightSection.classList.add(cx('active-section'))
        accountPane.classList.remove(cx('active-pane'))
        currPane.classList.remove(cx('active-pane'))
    }
    
    return (
        <div className={cx('wrapper')}>
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
                <div className={cx('pane')}>
                    <img className={cx('cover')}  src='https://media.istockphoto.com/id/1200404812/photo/pastel-light-blue-green-tone-water-color-paper-texture-background.jpg?s=170667a&w=0&k=20&c=_aVB4g4TEK34XNB49r778omle1eLVtto3_RYhtcN_a0=' alt='cover'/>
                    <img className={cx('avatar')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535713875002-d1d0cf377fde_jeawcn.jpg' alt='avatar'/>
                    <div className={cx('pane-heading')}>
                        <div >
                            <h2>Profile</h2>
                            <span className={cx('pane-sub-heading')}>Update your photo and pesonal details</span>    
                        </div>
                        <div className={cx('btn')}>
                            <div className={cx('cancel-btn')} onClick={handleBack}>Cancel</div>
                            <div className={cx('save-btn')} onClick={handleSave}>Save</div>
                        </div>
                    </div>
                    <div className={cx('back-pane')} onClick={handleBack}>
                        &lt; Back to account
                    </div>

                    <div className={cx('setting-content')}>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Username
                            </div>
                            <div className={cx('user-info')}>
                                <input className={cx('form-input')} placeholder=''/>
                            </div>
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Email address
                            </div>
                            <div className={cx('user-info')}>
                                <input className={cx('form-input')} placeholder=''/>
                            </div>
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Phone number
                            </div>
                            <div className={cx('user-info')}>
                                <input className={cx('form-input')} placeholder=''/>
                            </div>
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Social site
                            </div>
                            <div className={cx('user-info')}>
                                <div style={{display: 'flex', marginBottom: '20px'}}>
                                    <input className={cx('form-input')} placeholder='https://...'/>
                                    <div className={cx('user-social-icon')}>
                                        {/* <a href='https://www.facebook.com/khanh.nhat.92798' target="_blank" rel="noreferrer"> */}
                                            <FontAwesomeIcon icon={faFacebookF} className={cx('social-icon')}/>
                                        {/* </a> */}
                                    </div>
                                </div>
                                <div style={{display: 'flex', marginBottom: '20px'}}>
                                    <input className={cx('form-input')} placeholder='https://...'/>
                                    <div className={cx('user-social-icon')}>
                                        {/* <a href='instagram.com' target="_blank" rel="noreferrer"> */}
                                            <FontAwesomeIcon icon={faInstagram} className={cx('social-icon')}/>
                                        {/* </a> */}
                                    </div>
                                </div>
                                <div style={{display: 'flex', marginBottom: '20px'}}>
                                    <input className={cx('form-input')} placeholder='https://...'/>
                                    <div className={cx('user-social-icon')}>
                                        {/* <a href='twitter.com' target="_blank" rel="noreferrer"> */}
                                            <FontAwesomeIcon icon={faTwitter} className={cx('social-icon')}/>
                                        {/* </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Your photo
                                <div style={{fontSize: '1.4rem', fontWeight: 'normal'}}>This will be displayed on your profile</div>
                            </div>
                            <div className={cx('photo')}>
                                <div style={{width: '70%', display: 'flex', justifyContent: 'space-between'}}>
                                    <img className={cx('photo-img')} src='https://res.cloudinary.com/des13gsgi/image/upload/v1659598336/banner/photo-1535713875002-d1d0cf377fde_jeawcn.jpg' alt='avatar'/>
                                    <div className={cx('photo-edit')}>
                                        <span className={cx('photo-delete-update')}>Delete</span>
                                        <span className={cx('photo-delete-update')}>Update</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('line')}></div>
                        <div className={cx('pair-info')}>
                            <div className={cx('title')}>
                                Your bio
                                <div style={{fontSize: '1.4rem', fontWeight: 'normal'}}>Write a short introduction</div>
                            </div>
                            <div className={cx('bio')}>
                                <div style={{width: '70%'}}>
                                    <TextEditor/>
                                    {/* <textarea className={cx('text-area')} placeholder='Add a short bio...'/> */}
                                </div>
                            </div>
                        </div>
                    </div>

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
    );
}

export default Setting;
