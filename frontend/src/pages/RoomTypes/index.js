
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as request from '~/utils/request';
import styles from './RoomTypes.module.scss'; 

const cx = classNames.bind(styles)

function RoomTypes() {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    const [rooms, setRooms] = useState([])
    useEffect(() => {
        request
            .get('/api/v1/roomType', { headers: {token: `Beaer ${accessToken}`}})
            .then(res => setRooms(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={cx('wrapper')}>
            <h2>Room types</h2>
            <div className={cx('title')}>
                <h4 className={cx('title-item')}>#</h4>
                <h4 className={cx('title-item')}>Name</h4>
                <h4 className={cx('title-item')}>Detail</h4>
                <h4 className={cx('title-item')}>Image</h4>
                <h4 className={cx('title-item')}>Status</h4>
                <h4 className={cx('title-item')}></h4>
            </div>
            {rooms.map((room, index) => (
                <div key={index} className={cx('content')} style={{backgroundColor: index % 2 === 0 ? 'var(--sidebar-color)' : 'var(--clear-button-color)', boxShadow: index % 2 === 0 && '4px 4px 10px var(--box-shadow-color)'}}>
                    <div className={cx('content-item')}>{room.roomId}</div>
                    <div className={cx('content-item')}>{room.type}</div>
                    <div dangerouslySetInnerHTML={{ __html: room.description }} className={cx('content-item')}></div>
                    <div style={{width: '10%', display: 'flex', alignItems: 'center'}}>
                        <img className={cx('thumbnail-item')} src={room.thumbnail} />
                    </div>
                    <div className={cx('content-item')}>{room.isActive === 1 ? 'Active' : 'Inactive'}</div>
                    <div className={cx('content-item')}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RoomTypes;