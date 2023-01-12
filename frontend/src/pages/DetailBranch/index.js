import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Comment from '~/components/Comment';
import VerticalTypeCard from '~/components/VerticalTypeCard';
import styles from './DetailBranch.module.scss'; 
import GoogleMapReact from 'google-map-react';

const cx = classNames.bind(styles)
const Position = ({ text }) => <div>{text}</div>;
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
            // lat: 10.772412265014896,
            // lng: 106.65789106816047
            lat: 16.064342,
            lng: 108.230120
        },
        zoom: 18
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>KQ Da Nang</h2>
            <h2 className={cx('sub-heading-1')}>Go somewhere</h2>
            <span className={cx('sub-heading-2')}>Let's go on an adventure</span>

            <div className={cx('listings')}>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/79bb4170-87d1-4de3-89b0-c809dc67c185.jpg?im_w=1200' name='Bungalow Double' price='20' rating='8.8'/>
                <VerticalTypeCard img='https://a0.muscache.com/im/pictures/miso/Hosting-589471189814609390/original/afc7ef3c-b4de-4d95-9c80-3ba6a78024b0.jpeg?im_w=1440' name={'Superior King Room'} price='70' rating='8.9'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/13571664/-1/cac881c856c991ecfd29716cccbe0b27.jpg?ca=28&ce=0&s=1024x768' name='Deluxe Corner Room' price='76' rating='8.5'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/13571664/-1/a28a5aa9bd0e5c4ab942d7148f089047.jpg?ca=28&ce=0&s=1024x768' name='Deluxe Twin Room' price='66' rating='9.4'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/408750/-1/94efbfab473340d3e512826c3f674149.jpg?ca=10&ce=1&s=1024x768' name='Balcony Suite Room' price='125' rating='9.1'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/6944959/-1/c5b185a0e283bdcbead72faa6f34dc77.jpg?ca=13&ce=1&s=1024x768' name='Studio Room' price='25' rating='8.7'/>
            </div>

            <h2 className={cx('sub-heading-1')}>Where you'll be</h2>

            <div style={{ height: '380px', width: '80%', margin: '20px auto' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
                    defaultCenter={defaultProps.center}
                    center={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <Position
                        lat={defaultProps.center.lat}
                        lng={defaultProps.center.lng}
                        text={<FontAwesomeIcon icon={faLocationDot} style={{color: 'red', fontSize: '3rem'}}/>}
                    />
                </GoogleMapReact>
            </div>
            <div className={cx('line')}></div>

            <div className={cx('review-heading')}>
                <FontAwesomeIcon icon={faStar} className={cx('review-icon')}/>
                <h2>35 Reviews</h2>
            </div>

            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='9' content="The staff was amazing and allowed me an early check-in. The location was perfect for where I had to go, and what I was doing. Lots of shops for coffee and food nearby. The room was immaculate! Don't let the low price fool you as this was the best value for your money in all my travels so far."/>
            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='8' content='Great people, friendly,'/>
            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='7' content='Great people, friendly,'/>
        </div>
    );
}

export default DetailBranch;