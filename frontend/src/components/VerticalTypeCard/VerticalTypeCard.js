
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './VerticalTypeCard.module.scss';

const cx = classNames.bind(styles)

function VerticalTypeCard({ img, name }) {
    return (
        <Link to='/detailType' className={cx('wrapper')}>
            {/* <div className={cx('wrapper')}> */}
                <img className={cx('img')} src={img} alt='lodging'/>

                <div className={cx('container')}>
                    <div className={cx('type')}>
                        <h4 className={cx('type__name')}>{name}</h4>
                        <div className={cx('type__price')}>$20</div>
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('rating')}>
                        <FontAwesomeIcon className={cx('rating__icon')} icon={faStar}/>
                        <h4 className={cx('rating__score')}>4.8</h4>
                    </div>
                </div>
            {/* </div> */}
        </Link>
    );
}

export default VerticalTypeCard;