import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comment from '~/components/Comment';
import VerticalTypeCard from '~/components/VerticalTypeCard';
import styles from './DetailHotel.module.scss'; 
import GoogleMapReact from 'google-map-react';
import * as request from '~/utils/request';
import { useSelector } from 'react-redux';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

const cx = classNames.bind(styles)
const Position = ({ text }) => <div>{text}</div>;
moment().format()
function DetailHotel() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    // useEffect(() => {
    //     const scores = document.querySelectorAll('.' + cx('user-score'))
    //     const evaluation = document.querySelectorAll('.' + cx('user-evaluation'))
    //     scores.forEach((score, index) => {
    //         if (score.innerText >= 7 && score.innerText < 8) {
    //             evaluation[index].innerText = 'Very good'
    //         }
    //         else if (score.innerText >= 8 && score.innerText < 9) {
    //             evaluation[index].innerText = ' Awesome'
    //         }
    //         else if (score.innerText >= 9 && score.innerText <= 10) {
    //             evaluation[index].innerText = ' Above awesome'
    //         }
    //     })
    // })

    const defaultProps = {
        center: {
            // lat: 10.772412265014896,
            // lng: 106.65789106816047
            lat: 16.064342,
            lng: 108.230120
        },
        zoom: 18
    };

    const [hotel, setHotel] = useState()
    const [userComment, setUserComment] = useState()
    const [isBooked, setIsBooked] = useState()
    useEffect(() => {
        request
            .get(`/api/v1/hotel/${id}`)
            .then(res => setHotel(res))
            .catch(err => console.log(err))

        request
            .get(`/api/v1/comment/${user?._id}/${id}`, { headers: {token: `Beaer ${accessToken}` }})
            .then(res => {
                setHotelComment(res.data.allComment)
                setUserComment(res.data.userComment)
            })
            .catch(err => console.log(err))

        request
            .get(`/api/v1/booking/${user?._id}/${id}`, { headers: {token: `Beaer ${accessToken}` }})
            .then(res => setIsBooked(res))
            .catch(err => console.log(err))
    }, [loading])

    const [comment, setComment] = useState('')
    useEffect(() => {
        if (user && !userComment && isBooked) {
            const btn = document.querySelector('.' + cx('sbm-btn')).childNodes[0]
            if (comment) {
                btn.classList.remove(cx('guest-sbm'))
                btn.classList.add(cx('allowed-sbm'))
            }
            else {
                btn.classList.add(cx('guest-sbm'))
                btn.classList.remove(cx('allowed-sbm'))
            }
        }
    })

    const inputRef = useRef()
    const handleComment = () => {
        request
            .post('/api/v1/comment/post', {userId: user?._id, hotelId: id, comment, rating: score}, { headers: {token: `Beaer ${accessToken}`}})
            .then(res => {
                setComment('')
                inputRef.current.focus()
                setLoading(!loading)
            })
            .catch(err => console.log(err))
    }

    const [hotelComment, setHotelComment] = useState([])
    // useEffect(() => {
    //     request
    //         .get(`/api/v1/comment/hotel/${id}`)
    //         .then(res => setHotelComment(res))
    //         .catch(err => console.log(err))
    // }, [loading])

    const [score, setScore] = useState(10)
    const handleDecrease = () => {
        if (score > 1)
            setScore(state => state - 1)
    }

    const handleIncrease = () => {
        if (score < 10)
            setScore(state => state + 1)
    }

    const [averageScore, setAverageScore] = useState(0)
    const [numReview, setNumReview] = useState()
    useEffect(() => {
        var totalScore = hotelComment.reduce(function(total, comment) {
            return total + comment.rating
        }, 0)
        if (userComment) {
            setAverageScore((totalScore + userComment?.rating)/(hotelComment.length + 1))
            setNumReview(hotelComment.length + 1)
        }
        else {
            setAverageScore(totalScore/hotelComment.length)
            setNumReview(hotelComment.length)
        }
    })

    const handleLoading = () => {
        setLoading(!loading)
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>{hotel?.name}</h2>
            <h2 className={cx('sub-heading-1')}>Go somewhere</h2>
            <span className={cx('sub-heading-2')}>Let's go on an adventure</span>

            <div className={cx('listings')}>
                {hotel?.rooms.map((room, index) => (
                    <VerticalTypeCard key={index} room={room}/>
                ))}
                {/* <VerticalTypeCard img='https://a0.muscache.com/im/pictures/miso/Hosting-589471189814609390/original/afc7ef3c-b4de-4d95-9c80-3ba6a78024b0.jpeg?im_w=1440' name={'Superior King Room'} price='70' rating='8.9'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/13571664/-1/cac881c856c991ecfd29716cccbe0b27.jpg?ca=28&ce=0&s=1024x768' name='Deluxe Corner Room' price='76' rating='8.5'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/13571664/-1/a28a5aa9bd0e5c4ab942d7148f089047.jpg?ca=28&ce=0&s=1024x768' name='Deluxe Twin Room' price='66' rating='9.4'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/408750/-1/94efbfab473340d3e512826c3f674149.jpg?ca=10&ce=1&s=1024x768' name='Balcony Suite Room' price='125' rating='9.1'/>
                <VerticalTypeCard img='https://pix8.agoda.net/hotelImages/6944959/-1/c5b185a0e283bdcbead72faa6f34dc77.jpg?ca=13&ce=1&s=1024x768' name='Studio Room' price='25' rating='8.7'/> */}
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

            {/* <div className={cx('review-heading')}>
                <FontAwesomeIcon icon={faStar} className={cx('review-icon')}/>
                <h2>35 Reviews</h2>
            </div> */}
            <div className={cx('available')}>
                <h2>From our guests</h2>
                <span className={cx('viewAll')}>View All</span>
            </div>
            <h3 >Overall Rating</h3>
            <div className={cx('star-rating')}>
                <h2 className={cx('overall-score')}>{averageScore ? averageScore.toFixed(1) : '0.0'}</h2>
                ({numReview} {numReview > 1 ? 'reviews': 'review'})
            </div>

            {user && !userComment && isBooked && <div className={cx('guest-input')}>
                <img className={cx('guest-ava')} src={user.avatar}/>
                <div className={cx('guest-content')}>
                    <input ref={inputRef} value={comment} className={cx('guest-content-input')} placeholder='Add a comment...' onChange={e => setComment(e.target.value)}/>
                    <div className={cx('guest-score')}>
                        <span className={cx('guest-score-text')}>How would you rate us?</span>
                        <div className={cx('guest-score-rate')}>
                            <div className={cx('guest-score-adjust')} onClick={handleDecrease}>-</div>
                            <div className={cx('guest-score-value')}>{score}</div>
                            <div className={cx('guest-score-adjust')} onClick={handleIncrease}>+</div>
                        </div>
                    </div>
                </div>
                <div className={cx('sbm-btn')} onClick={handleComment}>
                    <FontAwesomeIcon className={cx('guest-sbm')} icon={faPaperPlane}/>
                </div>
            </div>}

            {userComment && <Comment userComment={userComment} commentId={userComment._id} userId={userComment.userId._id} loading={handleLoading} img={userComment.userId.avatar} name={userComment.userId.username} createdAt={moment(userComment.updatedAt).fromNow()} score={userComment.rating} content={userComment.comment}/>}
            {hotelComment?.map((comment, index) => (
                <Comment key={index} commentId={comment._id} userId={comment.userId._id} loading={handleLoading} img={comment.userId.avatar} name={comment.userId.username} createdAt={moment(comment.updatedAt).fromNow()} score={comment.rating} content={comment.comment}/>
            ))}
            {/* <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='8' content='Great people, friendly,'/>
            <Comment img='' name='Phillip Martin' createdAt='6 days ago' score='7' content='Great people, friendly,'/> */}
        </div>
    );
}

export default DetailHotel;