
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HorizontalCard.module.scss';

const cx = classNames.bind(styles)

function HorizontalCard({ info }) {
    return (
        <Link to={`/type/${info._id}/${info.hotel._id}`} className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img className={cx('img')} src={info.thumbnail} alt={info.type}/>
                <div className={cx('name')}>
                    <h4 className={cx('type')}>{info.type}</h4>
                    <div className={cx('location')}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/>
                        <span className={cx('address')}>{info.hotel.address}</span>
                    </div>
                </div>
            </div>
            <div className={cx('price')}>
                <strong>{info.priceOverNight}</strong>
                <span className={cx('night')}>/night</span>
            </div>
        </Link>
    );
}

export default HorizontalCard;