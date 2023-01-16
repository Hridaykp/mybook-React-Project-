import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/setting.module.css";
import { useEffect, useState} from "react";
import { fetchUserProfile } from "../api";
import { useToasts } from "react-toast-notifications";
import Loader from "../components/Loader";
import { useAuth } from "../hooks";

const UserProfile = () =>{
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const {userId} = useParams();
    const {addToast} = useToasts();
    const navigate = useNavigate();
    const auth = useAuth();
    // console.log("userId", userId)
    
    useEffect(()=>{
        const getUser = async()=>{
            const response = await fetchUserProfile(userId);
            if(response.success){
                setUser(response.data.user)
            }else{
                addToast(response.message,{
                    appearance: "error"
                });
                return navigate("/");
            }
            setLoading(false)
        }
        getUser();
    },[userId, navigate, addToast]);
    
    if(loading){
        return <Loader/>
    }
    const checkIfUserIsFriend =()=>{
        const friends = auth.user.friends;
        const friendIds = friends.map((friend) => friend.to_user._id);
        console.log(friends.to_user._id)
        const index = friendIds.indexOf(userId);
        
        if(index !== -1){
            return  true;
        }
        return false;   
    }
    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                    alt=""
                />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{ user.email }</div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <div className={styles.fieldValue}>{ user.name }</div>  
            </div>
            <div className={styles.btnGrp}>
            {checkIfUserIsFriend ?
            (<button className={`button${styles.saveBtn}`}>Remove Friend</button>
            ) : (
            <button className={`button${styles.saveBtn}`}>Add Friend</button>)
            }
            </div>
        </div>
    )
}

export default UserProfile;