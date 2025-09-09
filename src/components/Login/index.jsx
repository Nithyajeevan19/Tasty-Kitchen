import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'

import './index.css'
function Login() {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [errorMsg,setErrorMsg]=useState('')   
    
    const navigate=useNavigate();

    const onSuccess=(jwtToken)=>{
        Cookies.set('jwt_token', jwtToken,{expires: 30});
        console.log('Cookie set:', Cookies.get('jwt_token')); // Confirm value
        navigate('/',{replace:true});
        setErrorMsg('')
    }
    function onFailure() {
        setErrorMsg('Invalid username or password');
    }


    async function submitForm (event){
        event.preventDefault();
        const userDetails={username,password}
        const url='https://apis.ccbp.in/login';
        const options={
            method:'POST',
            body:JSON.stringify(userDetails)
        }
        const response=await fetch(url,options);
        const data=await response.json();
        console.log(data);
        if (response.ok==true) {  
            onSuccess(data.jwt_token);
         }else{
            onFailure();
         }
        
    }
    function handleUsername(e){
        setUsername(e.target.value)
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }

  return (
    <>
    <div className='main-container'>
        <div className="login-container">
            <img src="https://res.cloudinary.com/diamwuucf/image/upload/v1752063703/Frame_274_zmdjy8.png" alt="logo" className="logo" />
            <h1 className="brand-name">Tasty Kitchens</h1>
            <h2 className="login-heading">Login</h2>

            <form className="login-form" onSubmit={submitForm}>
                <label className="login-form-label" htmlFor="username">USERNAME</label>
                <input className="login-form-input" type="text" value={username} onChange={handleUsername}/>
    
                <label className="login-form-label" htmlFor="password">PASSWORD</label>
                <input className="login-form-input" type="password" value={password} onChange={handlePassword}/>
                <button className="button" type="submit">Login</button>
            </form>
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        </div>
        
        <div className='right-img-container'>
            <img src="https://res.cloudinary.com/diamwuucf/image/upload/v1752063037/Rectangle_1456_rx2aqw.png" className='side-img'/>
        </div>
        
    </div>
     </>
  )
}

export default Login