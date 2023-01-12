
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './VerticalCard.module.scss';

const cx = classNames.bind(styles)

function VerticalCard({ hotel }) {
    return (
        <Link to={`/hotel/${hotel._id}`} className={cx('wrapper')}>
            <img className={cx('img')} src={hotel.images[0]} alt='lodging'/>
            <h4 className={cx('name')}>{hotel.name}</h4>
            <div className={cx('location')}>
                <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/>
                <span className={cx('address')}>{hotel.address}</span>
            </div>
        </Link>
    );
}

export default VerticalCard;