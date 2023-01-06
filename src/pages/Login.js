import { useState } from 'react';
import styles from '../styles/login.module.css'
import { useToasts } from "react-toast-notifications"
import { login } from '../api';
const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const {addToast} = useToasts();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoggingIn(true);
        if(!email || !password){
            return addToast("Please enter email & password",{
                appearance: "error"
            }) 
        }
        const response  = await login(email, password);

        if(response.success){
            addToast("Successfuly Logged in...",{
                appearance: "success"
            }) 
        }else{
            addToast(response.message,{
                appearance: "error"
            })
        }
        setLoggingIn(false);
    }
    return (
        <form className={styles.loginForm} onSubmit = {handleSubmit} >
            <span className={styles.loginSignupHeader}>
                Login
            </span>
            <div className={styles.field}>
                <input type="email" 
                placeholder="Email" 
                // required  
                value={email} 
                onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={styles.field}>
                <input type="password" 
                placeholder="Password" 
                // required 
                value={password} 
                onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            <div className={styles.field}>
                <button disabled ={loggingIn} > {loggingIn ? "Logging In..." : "Log In"} </button>
            </div>

        </form>
    )
}


export default Login;