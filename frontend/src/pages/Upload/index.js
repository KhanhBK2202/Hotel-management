
import { faImage, faImages } from '@fortawesome/free-regular-svg-icons';
import { faCircleDollarToSlot, faDollarSign, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextEditor from '~/components/TextEditor';
import * as request from '~/utils/request';
import styles from './Upload.module.scss'; 

const cx = classNames.bind(styles)

function Upload() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id

    // const [roomName, setRoomName] = useState()
    const [roomType, setRoomType] = useState('Standard')
    const [priceHourly, setPriceHourly] = useState()
    const [priceNextHour, setPriceNextHour] = useState()
    const [priceOvernight, setPriceOvernight] = useState()
    const [numRooms, setNumRooms] = useState()
    const [size, setSize] = useState()
    const [numPeople, setNumPeople] = useState()
    const [description, setDescription] = useState()

    const [filesCover, setFilesCover] = useState([])
    const [filesPhotos, setFilesPhotos] = useState([])
    const [loading, setLoading] = useState(false)

    const [cover, setCover] = useState()
    const uploadCover = (e) => {
        setFilesCover(e.target.files)
        // const image = document.getElementById('output-cover');
        const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-label'))
        const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.add(cx('display-none'))
        uploadLabel.classList.add(cx('display-none'))
        uploadCriteria.classList.add(cx('display-none'))
        // image.style.display = 'flex'

        var reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                setCover(img.src);
		    };
        }
    }

    const [photos, setPhotos] = useState([])
    const uploadPhoto = (e) => {
        setFilesPhotos([...filesPhotos, e.target.files])
        // const image = document.getElementById('output-photo');
        // const uploadIcon = document.querySelector('.' + cx('upload-photo-icon'))
        // const uploadLabel = document.querySelector('.' + cx('upload-photo-label'))
        // uploadIcon.style.display = 'none'
        // uploadLabel.style.display = 'none'
        // image.style.display = 'flex'

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                // photos.push(img.src);
                setPhotos([...photos, img.src])
            };
        }
    }
    
    const handleRemoveCover = () => {
        setFilesCover([])
        setCover()
        const uploadIcon = document.querySelector('.' + cx('upload-icon'))
        const uploadLabel = document.querySelector('.' + cx('upload-label'))
        const uploadCriteria = document.querySelector('.' + cx('upload-criteria'))
        uploadIcon.classList.remove(cx('display-none'))
        uploadLabel.classList.remove(cx('display-none'))
        uploadCriteria.classList.remove(cx('display-none'))
    }

    const handleRemovePhoto = (i) => {
        let newFilesPhotos = [...filesPhotos]
        newFilesPhotos.splice(i, 1)
        setFilesPhotos(newFilesPhotos)

        let newPhotos = [...photos]
        newPhotos.splice(i, 1)
        setPhotos(newPhotos)
    }

    // const handleSubmit = async (e) => {
    //     setLoading(true)
    //     if (!!filesCover[0] || !filesPhotos || filesPhotos.length < 4)
    //         return
    //     const data = new FormData();
        
    //     data.append('upload_preset', 'cover image')
    //     data.append('file', filesCover[0])
    //     const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
    //         method: 'POST',
    //         body: data,
    //     })
    //     // const file = await res.json()
    //     // await request.put(`/user/update/${id}`, {cover: file.secure_url})
        
    //     for (const item of filesPhotos) {
    //         data.append('file', item[0])
    //             const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
    //             method: 'POST',
    //             body: data,
    //         })
    //         // const file = await res.json()
    //         // await request.put(`/user/update/${id}`, {cover: file.secure_url})
    //     }
    //     setLoading(false)
    //     navigate('/dashboard')
    // }

    // let services = []
    // const handleCheck = (e) => {
    //     if (e.target.checked){
    //         services.push(e.target.id)
    //     }
    //     else {
    //         const index = services.indexOf(e.target.id);
    //         services.splice(index, 1);
    //     }
    // }

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/dashboard')
    }

    const amenities = ['Balcony', 'IOT Drapes', 'Mini-Bar', 'A/C', 'ADA Room', 'IOT TV', 'Large Closet', 'Black-out Curtains']
    // Sửa lại phần này
    const [getAmenities, setGetAmenities] = useState([])
    useEffect(() => {
        const tags = document.querySelectorAll('.' + cx('tag-name'))
        for (const tag of tags) {
            tag.onclick = () => {
                if (tag.classList.value.includes(cx('choosen'))) {
                    tag.classList.remove(cx('choosen'))
                    let newArrayAmenities = [...getAmenities]
                    newArrayAmenities.splice(0, 1)
                    setGetAmenities(newArrayAmenities)
                }
                else
                {
                    tag.classList.add(cx('choosen'))
                    setGetAmenities([...getAmenities, tag.innerText])
                }
            }
        }
    })

    useEffect(() => {
        const inputs = document.querySelectorAll('.' + cx('input-inner'))
        for (const input of inputs) {
            input.onfocus = () => {
                input.parentNode.style.border = '1px solid var(--primary)'
            }

            input.onblur = () => {
                input.parentNode.style.border = '1px solid #ccc'
            }
        }
    })

    const getContent = (content) => {
        setDescription(content)
    }

    const handleSave = async () => {
        setLoading(true)
        if (!filesCover[0] || !filesPhotos || filesPhotos.length < 4)
            return
        const data = new FormData();
        data.append('upload_preset', 'cover image')
        data.append('file', filesCover[0])
        const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
            method: 'POST',
            body: data,
        })
        const file = await res.json()
        
        let photoArray = []
        for (const item of filesPhotos) {
            data.append('file', item[0])
                const res = await fetch('https://api.cloudinary.com/v1_1/des13gsgi/image/upload',{
                method: 'POST',
                body: data,
            })
            const photo = await res.json()
            photoArray.push(photo.secure_url)
        }


        request
            .post('/api/v1/roomType/post', {type: roomType, priceHour: priceHourly, priceNextHour, priceOverNight: priceOvernight, thumbnail: file.secure_url, images: photoArray, size, numOfPeople: numPeople, description, features: getAmenities, hotel: user.hotelId}, {
                headers: {token: `Bearer ${accessToken}`}
            })
            .then(data => {
                for (let i = 0; i < numRooms; i++) {
                    request
                        .post('/api/v1/room/post', {type: data._id, name: `${roomType}-${i+1}`}, {
                            headers: {token: `Bearer ${accessToken}`}
                        })
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))


        setLoading(false)
        navigate('/dashboard')
    }

    if (user.role === 'user') {
        return <Navigate to='/'/>
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Upload room information</h2>
            <h3 className={cx('sub-heading')}>
                <div className={cx('sub-heading__order')}>1</div>
                General Information
            </h3>
            {/* <div className={cx('title')}>Room Name</div> */}
            {/* <div className={cx('form-input')}>
                <input className={cx('input-inner')} placeholder='' onChange={(e) => setRoomName(e.target.value)}/>
            </div> */}

            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <div className={cx('type-and-num')}>
                    <div className={cx('title')}>Room Type</div>
                    <select className={cx('form-select')} defaultValue='default' onChange={(e) => setRoomType(e.target.value)}>
                        <option value='default' disabled>
                            Standard
                        </option>
                        
                        <option value='Standard'>Standard</option>
                        <option value='VIP'>VIP</option>
                        <option value='Superior'>Superior</option>
                        <option value='Deluxe'>Deluxe</option>
                        <option value='Deluxe Twin'>Deluxe Twin</option>
                        <option value='Studio'>Studio</option>
                    </select>
                </div>
                <div className={cx('type-and-num')}>
                    <div className={cx('title')}>Number of rooms</div>
                    <div className={cx('form-input')}>
                        {/* <FontAwesomeIcon icon={faDollarSign}/> */}
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setNumRooms(e.target.value)}/>
                    </div>
                </div>
                <div className={cx('type-and-num')}>
                    <div className={cx('title')}>People per room</div>
                    <div className={cx('form-input')}>
                        {/* <FontAwesomeIcon icon={faDollarSign}/> */}
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setNumPeople(e.target.value)}/>
                    </div>
                </div>
                <div className={cx('type-and-num')}>
                    <div className={cx('title')}>Size (m<sup>2</sup>)</div>
                    <div className={cx('form-input')}>
                        {/* <FontAwesomeIcon icon={faDollarSign}/> */}
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setSize(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <div className={cx('type-and-price')}>
                    <div className={cx('title')}>Price (an hour)</div>
                    <div className={cx('form-input')}>
                        <FontAwesomeIcon icon={faDollarSign} style={{marginRight: '10px'}}/>
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setPriceHourly(e.target.value)}/>
                    </div>
                </div>
                <div className={cx('type-and-price')}>
                    <div className={cx('title')}>Price (next hour)</div>
                    <div className={cx('form-input')}>
                        <FontAwesomeIcon icon={faDollarSign} style={{marginRight: '10px'}}/>
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setPriceNextHour(e.target.value)}/>
                    </div>
                </div>
                <div className={cx('type-and-price')}>
                    <div className={cx('title')}>Price (a night)</div>
                    <div className={cx('form-input')}>
                        <FontAwesomeIcon icon={faDollarSign} style={{marginRight: '10px'}}/>
                        <input className={cx('input-inner')} placeholder='' onChange={(e) => setPriceOvernight(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className={cx('title')}>Description</div>
            {/* <textarea className={cx('form-input', 'text-area')} onChange={getContent}></textarea> */}
            <TextEditor getContent={getContent}/>

            {/* Upload thumbnail */}
            <div className={cx('title')}>Thumbnail</div>
            <form className={cx('upload-form')}>
                <div style={{position: 'relative'}}>
                    {cover && 
                        <>
                            <img id='output-cover' alt='' src={cover} className={cx('cover')}></img>
                            <span className={cx('badge-remove-cover')} onClick={handleRemoveCover}>X</span>
                        </>
                    }
                    <label htmlFor='fileCoverInput' className={cx('label-upload-cover')}>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                            <div>
                                <FontAwesomeIcon icon={faImage} className={cx('upload-icon')}/>
                                <div className={cx('upload-label')}>Select a JPG file to upload</div>
                                <div className={cx('upload-criteria')}>
                                    <span className={cx('upload-criteria-item')}>
                                        . Aspect ratio 16:9
                                    </span>
                                    <span className={cx('upload-criteria-item')}>
                                        . Recommended size 1024x576
                                    </span>
                                </div>
                            </div>
                        </div>
                    </label> 
                </div>
                <input id="fileCoverInput"
                    type="file"
                    name="fileCover"
                    onChange={uploadCover}
                />
            </form>

            {/* Upload Photos */}
            <div className={cx('title')}>Upload Photos</div>
            <div className={cx('upload-photo-form')}>
                <form >
                    <div style={{position: 'relative'}}>
                        <label htmlFor='filePhotoInput' className={cx('label-upload-photo')}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center'}}>
                                <div>
                                    <FontAwesomeIcon icon={faImages} className={cx('upload-photo-icon')}/>
                                    <div className={cx('upload-photo-label')}>+ Add atleast 4 photos</div>
                                </div>
                            </div>
                        </label> 
                    </div>
                    <input id="filePhotoInput"
                        type="file"
                        name="filePhoto"
                        onChange={uploadPhoto}
                    />
                </form>
                {photos.length !== 0 && photos.map((item, index) => (
                    <div key={index} style={{position: 'relative'}}>
                        <img id='output-photo' alt='' src={item} className={cx('photo')}></img>
                        <span className={cx('badge-remove')} onClick={() => handleRemovePhoto(index)}>X</span>
                    </div>
                ))}
            </div>

            <h3 className={cx('sub-heading')}>
                <div className={cx('sub-heading__order')}>2</div>
                Room Amenities
            </h3>
            <ul className={cx('tag')}>
                {amenities.map((item, index) => (
                    <li key={index} className={cx('tag-name')}>
                        {item}
                    </li>
                ))}
            </ul>

            {/* Services */}
            {/* <h3 className={cx('sub-heading')}>
                <div className={cx('sub-heading__order')}>3</div>
                Selected Services for Room
            </h3>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra1" name="extra1" value="Breakfast" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra1"> Breakfast a day per person</label>
                </div>              
            </div>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra2" name="extra2" value="Parking" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra2"> Parking a day</label>
                </div>              
            </div>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra3" name="extra3" value="Pet" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra3"> Pet a day</label>
                </div>              
            </div>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra4" name="extra4" value="Iron" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra4"> Iron &amp; Ironing Board</label>
                </div>
            </div>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra5" name="extra5" value="baby" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra5"> Baby Crib</label>
                </div>
            </div>
            <div className={cx('checkbox-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" id="extra6" name="extra6" value="car" onChange={handleCheck} style={{width: '30px', textAlign: 'center'}}/>
                    <label className={cx('label')} htmlFor="extra6"> Car service</label>
                </div>
            </div> */}

            <div className={cx('submit')}>
                <div className={cx('cancel-btn')} onClick={handleCancel}>Cancel</div>
                <div className={cx('submit-btn')} onClick={handleSave}>Save</div>
            </div>
        </div>
    )
}

export default Upload;