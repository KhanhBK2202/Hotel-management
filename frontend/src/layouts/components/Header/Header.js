import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import InputSelect from '~/components/InputSelect';
import Image from '~/components/Image';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Calendar from '~/components/Calendar';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faXmark } from '@fortawesome/free-solid-svg-icons';
import * as request from '~/utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { logOutSuccess } from '~/redux/authSlice';

const cx = classNames.bind(styles);

function Header() {

    const user = useSelector((state) => state.auth.login.currentUser);
    const id = user?._id
    // const accessToken = user?.accessToken
    // const id = user?._id
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // let axiosJWT = createAxios(user, dispatch, logOutSuccess)
    // const handleLogout = () => {
    //     request.logOut(dispatch, id, navigate, accessToken, axiosJWT)
    // }
    const [length, setLength] = useState()
    useEffect(() => {
        const cartLength = JSON.parse(localStorage.getItem('cart'))
        if (cartLength)
            setLength(cartLength.length)
        else setLength(0)
    },[])

    const { userId } = useParams()
    // if (!user) {
    //     // not logged in so redirect to login page with the return url
    //     return <Navigate to="/signin" />
    // }
    
    return (
        <div className={cx('nav')}>
            {/* {user && user.isAdmin && <Link to='/dashboard' className={cx('nav-item')}>
                <FontAwesomeIcon icon={faShieldHalved}/>
            </Link>} */}
    
            {user?.role === 'manager' || user?.role === 'admin' ? (
                <Link to="/dashboard" className={cx('nav-item')}>Dashboard</Link>
            ) : (
                <Link to="/" className={cx('nav-item')}>Home</Link>
            )}
            <Link to="/" className={cx('nav-item')}>About Us</Link>
            {user ? (
                <>
                    {user.role === 'user' && (
                        <Link to="/checkout" className={cx('nav-item')}>
                            <FontAwesomeIcon icon={faCartShopping}/>
                            <span className={cx('badge')}>{length}</span>
                        </Link>
                    )}
                    <Link to={`/profile/${id}`}>
                        <div className={cx('user')}>
                            <Image className={cx('avatar')} src='' alt=''/>
                            <h4 className={cx('user-name')}>{user.username}</h4>
                        </div>
                    </Link>
                    {/* <Link to="/signin" className={cx('nav-item')} onClick={handleLogout}>
                        Log out
                    </Link> */}
                </>
            ) : (
                <>
                    <Link to="/signin" className={cx('nav-item', 'login')}>Login</Link>
                </>
            )}
        </div>
    );
}

export default Header;
