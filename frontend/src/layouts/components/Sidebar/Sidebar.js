import { faCompass, faGear, faHeart, faHouse, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';
import styles from './Sidebar.module.scss'; 

const cx = classNames.bind(styles)

function Sidebar() {

    useEffect(() => {
        const tabs = document.querySelectorAll('.' + cx('user-info-item'));
        tabs.forEach((tab, index) => {
            tab.onclick = function () {
                const tabActive = document.querySelector('.' + cx('active-tab'));
                tabActive.classList.remove(cx('active-tab'));
    
                this.classList.add(cx('active-tab'));
            };
        })
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
                        Browse
                    </li>

                    <li className={cx('user-info-item')}>
                        <b></b>
                        <b></b>
                        <FontAwesomeIcon icon={faHeart} className={cx('item-icon')}/>
                        Favorite
                    </li>

                    <li className={cx('user-info-item')}>
                        <b></b>
                        <b></b>
                        <FontAwesomeIcon icon={faGear} className={cx('item-icon')}/>
                        Settings
                    </li>

                    <li className={cx('user-info-item')}>
                        <b></b>
                        <b></b>
                        <FontAwesomeIcon icon={faRightFromBracket} className={cx('item-icon')}/>
                        Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;