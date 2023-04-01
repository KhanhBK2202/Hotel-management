
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as request from '~/utils/request';
import styles from './Rooms.module.scss'; 

const cx = classNames.bind(styles)

function Rooms() {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    const [rooms, setRooms] = useState([])
    useEffect(() => {
        request
            .get('/api/v1/room', { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setRooms(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={cx('wrapper')}>
            <h2>Rooms</h2>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>#</h4>
                <h4 className={cx('title-item')}>Name</h4>
                <h4 className={cx('title-item')}>Image</h4>
                <h4 className={cx('title-item')}>Available</h4>
                <h4 className={cx('title-item')}>Status</h4>
                <h4 className={cx('title-item')}></h4>
            </div>
            {rooms.map((room, index) => (
                <div key={index} className={cx('content')} style={{backgroundColor: index % 2 === 0 ? 'var(--sidebar-color)' : 'var(--clear-button-color)', boxShadow: index % 2 === 0 && '4px 4px 10px var(--box-shadow-color)'}}>
                    <div className={cx('content-item')}>{index + 1}</div>
                    <div className={cx('content-item')}>{room.name}</div>
                    <div className={cx('content-item')}>
                        <img className={cx('thumbnail-item')} src={room.type.thumbnail} />
                    </div>
                    <div className={cx('content-item')}>{room.bookedBy ? <FontAwesomeIcon icon={faXmark} style={{color: 'red'}}/> : <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/>}</div>
                    <div className={cx('content-item')}>{room.isActive === true ? 'Active' : 'Inactive'}</div>
                    <div className={cx('content-item')}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Rooms;