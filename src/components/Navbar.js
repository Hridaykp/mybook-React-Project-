import styles from "../styles/navbar.module.css"
import { Link } from "react-router-dom";
const Navbar =()=>{
    return(
        <div className={styles.nav} >
            <div className={styles.leftNav} >
                <Link to="/" >
                    <img src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png" alt=""/>
                </Link>
            </div>
            <div className={styles.rightNav} >
                <div className={styles.user} >
                    <a href="/" >
                        <img src="https://cdn-icons-png.flaticon.com/512/219/219970.png" alt="" className={styles.userDp}/>
                    </a>
                    <span>Hriday Kumar 'Pranit'</span>
                </div>
                <div className={styles.navLinks} >
                    <ul>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                        <li>
                            <a href="/">Log Out</a>
                        </li>
                        <li>
                            <a href="/">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;