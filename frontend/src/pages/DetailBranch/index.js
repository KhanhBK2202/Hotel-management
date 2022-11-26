import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comment from '~/components/Comment';
import VerticalTypeCard from '~/components/VerticalTypeCard';
import styles from './DetailBranch.module.scss'; 
import GoogleMapReact from 'google-map-react';

const cx = classNames.bind(styles)
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function DetailBranch() {

    useEffect(() => {
        const scores = document.querySelectorAll('.' + cx('user-score'))
        const evaluation = document.querySelectorAll('.' + cx('user-evaluation'))
        scores.forEach((score, index) => {
            if (score.innerText >= 7 && score.innerText < 8) {
                evaluation[index].innerText = 'Very good'
            }
            else if (score.innerText >= 8 && score.innerText < 9) {
                evaluation[index].innerText = ' Awesome'
            }
            else if (score.innerText >= 9 && score.innerText < 10) {
                evaluation[index].innerText = ' Above awesome'
            }
        })
    })

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>KQ Da Nang</h1>
            <h1 className={cx('sub-heading-1')}>Go somewhere</h1>
            <span className={cx('sub-heading-2')}>Let's go on an adventure</span>

            <div className={cx('listings')}>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name={'Bungalow Double'}/>
            </div>

            <h1 className={cx('sub-heading-1')}>Where you'll be</h1>

            <div style={{ height: '400px', width: '60%', margin: '20px auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>

            <div className={cx('line')}></div>

            <div className={cx('review-heading')}>
                <FontAwesomeIcon icon={faStar} className={cx('review-icon')}/>
                <h2>35 Reviews</h2>
            </div>

            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='9' content='Great people, friendly,'/>
            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='8' content='Great people, friendly,'/>
            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='7' content='Great people, friendly,'/>
        </div>
    );
}

export default DetailBranch;