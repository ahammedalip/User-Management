import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSucces } from '../redux/user/userSlice';

function OAuth() {
    const dispatch = useDispatch();

const handleGoogleClick = async () =>{
    try {
        const provider = new GoogleAuthProvider();
      
        const auth= getAuth(app)
        const result = await signInWithPopup(auth, provider)
        console.log('jdkjfkdshfk',result);
        const response = await fetch('/api/auth/google' , {
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: result.user.displayName,
                email : result.user.email,
                photo: result.user.photoURL
            })
        })
        const data = await response.json()
        console.log('data after fetch',data)
        dispatch(signInSucces(data));

    } catch (error) {
        console.log('Could not authenticate with google', error)
    }
}
  return (
    
    <button type='button' onClick={handleGoogleClick} className='bg-red-600 text-white rounded-md p-2 uppercase hover:bg-red-700'>Continue with Google</button>
  )
}

export default OAuth