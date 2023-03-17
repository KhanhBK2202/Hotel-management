
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './VerticalTypeCard.module.scss';

const cx = classNames.bind(styles)

function VerticalTypeCard({ room }) {
    return (
        <Link to={`/type/${room._id}/${room.hotel}`} className={cx('wrapper')}>
            {/* <div className={cx('wrapper')}> */}
                <img className={cx('img')} src={room.thumbnail} alt='lodging'/>

                <div className={cx('container')}>
                    <h4 className={cx('type__name')}>{room.type}</h4>
                    <div className={cx('type')}>
                        <div className={cx('type__price')}>${room.priceOverNight}/night</div>
                        <FontAwesomeIcon className={cx('')} icon={faHeart}/>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('rating')}>
                        <FontAwesomeIcon className={cx('rating__icon')} icon={faStar}/>
                        <h4 className={cx('rating__score')}>8.8</h4>
                    </div>
                </div>
            {/* </div> */}
        </Link>
    );
}

export default VerticalTypeCard;