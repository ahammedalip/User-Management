
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js';

function Profile() {

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [progress, setProgress] = useState(0)
  const [imageError, setImageError]= useState(false)
  const [formData, setFormData] = useState({})
  console.log(formData)

  const { currentUser } = useSelector(state => state.user)
  // console.log(progress);

  const handleClick = () => {
    fileRef.current.click()
  }

  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])

  const handleFileUpload = async (image) =>{
    const storage = getStorage(app)
    const filename = new Date().getTime()+ image.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef,image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) *100;
        setProgress(Math.round(progress))
      },
    (error)=>{
      setImageError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
        setFormData({...formData,profilePicture: downloadURL})
      );
      }
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img className='w-25 h-24 self-center cursor-pointer rounded-full object-cover mt-2' src={formData.profilePicture || currentUser.profilePicture} alt="profile"
          onClick={handleClick} />
        
        <p className='flex justify-center text-xs'>{imageError ? (<span className='text-red-600 '>Error uploading image (file size must be less than 2 mb) </span>)
        : progress> 0 && progress<100 ? 
        (<span className='text-slate-600'>{`Uploading : ${progress}%`} </span> )
        : progress === 100 ?
        ( <span className='text-green-600'> Image uploaded succesfully</span> ) 
        : ( '')
      }</p>

        
        <input type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.username} />
        <input type="text" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' defaultValue={currentUser.email} />
        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />

        <button className=' bg-slate-600 text-white p-2 rounded-xl uppercase hover:bg-slate-700'>update</button>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile