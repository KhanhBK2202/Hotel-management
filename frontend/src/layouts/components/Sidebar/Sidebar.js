
import { faBars, faClose, faCompass, faEdit, faGear, faHeart, faRightFromBracket, faRightToBracket, faMoon, faUpload, faSackDollar, faBellConcierge, faChalkboard, faChartLine, faHistory, faDoorOpen, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import config from '~/config';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';
import { actions, useStore } from '~/store';
import * as request from '~/utils/request';
import styles from './Sidebar.module.scss'; 

const cx = classNames.bind(styles)

function Sidebar() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id
    const dispatchLogout = useDispatch()
    const navigate = useNavigate()
    let axiosJWT = createAxios(user, dispatchLogout, logOutSuccess)
    const handleLogout = () => {
        request.logOut(dispatchLogout, id, navigate, accessToken, axiosJWT)
    }

    const [checkToggle, setCheckToggle] = useState(false)
    const [state, dispatch] = useStore()
    // const isAdmin = true
    useEffect(() => {
        let menuToggle = document.querySelector('.' + cx('toggle'))
        let navigation = document.querySelector('.' + cx('wrapper'))
        menuToggle.onclick = function() {
            setCheckToggle(!checkToggle)
            dispatch(actions.setToggle(checkToggle))
            menuToggle.classList.toggle(cx('active'))
            navigation.classList.toggle(cx('active'))
        }
    },[dispatch, checkToggle])
    useEffect(() => {
        // const tabs = document.querySelectorAll('.' + cx('user-info-item'));
        // tabs.forEach((tab, index) => {
        //     tab.onclick = function () {
        //         const tabActive = document.querySelector('.' + cx('active-tab'));
        //         tabActive.classList.remove(cx('active-tab'));
    
        //         this.classList.add(cx('active-tab'));
        //     };
        // })
        
        // Dark mode
        var darkBtn = document.querySelector('.' + cx('dark-btn'))
        darkBtn.onclick = function () {
            darkBtn.classList.toggle(cx('dark-on'))
            document.body.classList.toggle(cx('dark-theme'))

            if (localStorage.getItem('theme') === 'light') {
                localStorage.setItem('theme', 'dark')
            }
            else {
                localStorage.setItem('theme', 'light')
            }
        }

        if (localStorage.getItem('theme') === 'light') {
            darkBtn.classList.remove(cx('dark-on'))
            document.body.classList.remove(cx('dark-theme'))
        }
        else if (localStorage.getItem('theme') === 'dark') {
            darkBtn.classList.add(cx('dark-on'))
            document.body.classList.add(cx('dark-theme'))
        }
        else {
            localStorage.setItem('theme', 'light')
        }
    })

    let activeClassName = cx('active-tab')

    return (
        <div className={cx('wrapper')}>
            <Link to={user?.role === 'manager' || user?.role === 'admin' ? config.routes.dashboard : config.routes.home} className={cx('logo-link')}>
                <img src={images.logo} alt="KQ" className={cx('logo-img')}/>
            </Link>

            <div className={cx('inner')}>
                <div className={cx('user-info')}>
                    {user?.role === 'manager' || user?.role === 'admin' ? (
                        <>
                            <NavLink to='/dashboard' className={({isActive}) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faChartLine} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Dashboard</span>
                                </div>
                            </NavLink>
                            {user?.role === 'manager' && 
                                <NavLink to='/upload' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                    <div className={cx('user-info-item')}>
                                        <b></b>
                                        <b></b>
                                        <FontAwesomeIcon icon={faUpload} className={cx('item-icon')}/>
                                        <span className={cx('title')}>Upload</span>
                                    </div>
                                </NavLink>
                            }
                            {/* <NavLink to='/services' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faBellConcierge} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Sevices &amp; Features</span>
                                </div>
                            </NavLink> */}
                            <NavLink to='/earning' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faSackDollar} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Earnings</span>
                                </div>
                            </NavLink>
                            <NavLink to='/rooms' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faKey} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Rooms</span>
                                </div>
                            </NavLink>
                            <NavLink to='/room-types' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faDoorOpen} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Room Type</span>
                                </div>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                <div className={cx('user-info-item')}>
                                    <b></b>
                                    <b></b>
                                    <FontAwesomeIcon icon={faCompass} className={cx('item-icon')}/>
                                    <span className={cx('title')}>Browse</span>
                                </div>
                            </NavLink>
                            {user && (
                                <>
                                    {/* <Link to='/signin'>
                                        <div className={cx('user-info-item')}>
                                            <b></b>
                                            <b></b>
                                            <FontAwesomeIcon icon={faRightToBracket} className={cx('item-icon')}/>
                                            <span className={cx('title')}>Login</span>
                                        </div>
                                    </Link>
                                    <Link to='/signup'>
                                        <li className={cx('user-info-item')}>
                                            <b></b>
                                            <b></b>
                                            <FontAwesomeIcon icon={faEdit} className={cx('item-icon')}/>
                                            <span className={cx('title')}>Sign up</span>
                                        </li>
                                    </Link> */}
                                    <NavLink to='/favorites' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                        <div className={cx('user-info-item')}>
                                            <b></b>
                                            <b></b>
                                            <FontAwesomeIcon icon={faHeart} className={cx('item-icon')}/>
                                            <span className={cx('title')}>Favorite</span>
                                        </div>
                                    </NavLink>
                                    <NavLink to={`/history/${id}`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                                        <div className={cx('user-info-item')}>
                                            <b></b>
                                            <b></b>
                                            <FontAwesomeIcon icon={faHistory} className={cx('item-icon')}/>
                                            <span className={cx('title')}>History</span>
                                        </div>
                                    </NavLink>
                                    <NavLink to='/setting' className={({ isActive }) => isActive ? activeClassName : undefined}>
                                        <div className={cx('user-info-item')}>
                                            <b></b>
                                            <b></b>
                                            <FontAwesomeIcon icon={faGear} className={cx('item-icon')}/>
                                            <span className={cx('title')}>Settings</span>
                                        </div>
                                    </NavLink>
                                </>
                            )}
                            
                        </>
                    )}

                    {user && (
                        <Link to='/signin' onClick={handleLogout}>
                            <div className={cx('user-info-item')}>
                                <b></b>
                                <b></b>
                                <FontAwesomeIcon icon={faRightFromBracket} className={cx('item-icon')}/>
                                <div className={cx('title')}>Log Out</div>
                            </div>
                        </Link>
                    )}

                    <div className={cx('line')}></div>
                    <li className={cx('user-dark-mode')}>
                        <FontAwesomeIcon icon={faMoon} className={cx('item-icon')}/>
                        <div className={cx('dark-btn')}>
                            <span></span>
                        </div>
                    </li>
                </div>
            </div>

            <div className={cx('toggle')}>
                <FontAwesomeIcon icon={faBars} className={cx('open', 'icon')}/>
                <FontAwesomeIcon icon={faClose} className={cx('close', 'icon')}/>
            </div>
        </div>
    );
}

export default Sidebar;