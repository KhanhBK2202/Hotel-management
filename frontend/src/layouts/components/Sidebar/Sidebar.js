import { faBars, faClose, faCompass, faEdit, faGear, faHeart, faHouse, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
import styles from './Sidebar.module.scss'; 

const cx = classNames.bind(styles)

function Sidebar({ toggle }) {

    const [flag, setFlag] = useState(false)
    const user = true
    useEffect(() => {
        let menuToggle = document.querySelector('.' + cx('toggle'))
        let navigation = document.querySelector('.' + cx('wrapper'))
        
        menuToggle.onclick = function() {
            setFlag(!flag)
            toggle(flag)
            menuToggle.classList.toggle(cx('active'))
            navigation.classList.toggle(cx('active'))
        }
        // if (!user) {
            const tabs = document.querySelectorAll('.' + cx('user-info-item'));
            tabs.forEach((tab, index) => {
                tab.onclick = function () {
                    const tabActive = document.querySelector('.' + cx('active-tab'));
                    tabActive.classList.remove(cx('active-tab'));
        
                    this.classList.add(cx('active-tab'));
                };
            })
        // }
    })

    return (
        <div className={cx('wrapper')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="KQ" className={cx('logo-img')}/>
            </Link>

            <div className={cx('inner')}>
                <ul className={cx('user-info')}>
                    <li className={cx('user-info-item', 'active-tab')}>
                        <b></b>
                        <b></b>
                        <FontAwesomeIcon icon={faCompass} className={cx('item-icon')}/>
                        <span className={cx('title')}>Browse</span>
                    </li>

                    {user ?
                        <li className={cx('user-info-item')}>
                            <b></b>
                            <b></b>
                            <FontAwesomeIcon icon={faHeart} className={cx('item-icon')}/>
                            <span className={cx('title')}>Favorite</span>
                        </li> : 
                        <Link to='/signin'>
                            <li className={cx('user-info-item')}>
                                <b></b>
                                <b></b>
                                <FontAwesomeIcon icon={faRightToBracket} className={cx('item-icon')}/>
                                <span className={cx('title')}>Login</span>
                            </li>
                        </Link>
                    }

                    {user ? 
                        <li className={cx('user-info-item')}>
                            <b></b>
                            <b></b>
                            <FontAwesomeIcon icon={faGear} className={cx('item-icon')}/>
                            <span className={cx('title')}>Settings</span>
                        </li> :
                        <Link to='/signup'>
                            <li className={cx('user-info-item')}>
                                <b></b>
                                <b></b>
                                <FontAwesomeIcon icon={faEdit} className={cx('item-icon')}/>
                                <span className={cx('title')}>Sign up</span>
                            </li>
                        </Link>
                    }

                    {user && 
                        <li className={cx('user-info-item')}>
                            <b></b>
                            <b></b>
                            <FontAwesomeIcon icon={faRightFromBracket} className={cx('item-icon')}/>
                            <span className={cx('title')}>Log Out</span>
                        </li>
                    }
                </ul>
            </div>

            <div className={cx('toggle')}>
                <FontAwesomeIcon icon={faBars} className={cx('open', 'icon')}/>
                <FontAwesomeIcon icon={faClose} className={cx('close', 'icon')}/>
            </div>
        </div>
    );
}

export default Sidebar;