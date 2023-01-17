import { useContext, useEffect, useState } from "react"
import { AuthContext, PostsContext} from "../providers";
import { editProfile, fetchUserFriends, login as userLogin, register, getPosts} from "../api";
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemInLocalStorage, getItemInLocalStorage } from "../utils";
import jwt from "jwt-decode";

export const useAuth =()=>{
    return useContext(AuthContext);
}

export const useProvideAuth =()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getUser = async () =>{
            const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
            if(userToken){
                const user = jwt(userToken);
                const response = await fetchUserFriends();
                let friends = [];
                if(response.success){
                    friends = response.data.friends
                }
                setUser({
                    ...user,
                    friends,
                });
            }
            setLoading(false);
        }
        getUser();
    }, []);

    const updateUser = async(userId, name, password, confirmPassword)=>{
        const response  = await editProfile(userId, name, password, confirmPassword);
        console.log('response', response);
        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token: null);
            return{
                success: true,
            }
        }else{
            return {
                success: false,
                message: response.message
            }
        }
    }

    const login = async (email, password)=>{
        const response  = await userLogin(email, password);

        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token: null);
            return{
                success: true,
            }
        }else{
            return {
                success: false,
                message: response.message
            }
        }
    };

    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);
    
        if (response.success) {
          return {
            success: true,
          };
        } else {
          return {
            success: false,
            message: response.message,
          };
        }
      };
      
    const logout = ()=>{
        setUser(null);
        removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };


    const updateUserFriends = (addFriend, friend)=>{
        if(addFriend){
            setUser({
                ...user,
                friends: [...user.friends, friend]
            })
            return;
        }
        const newFriends = user.friends.filter(
            (frnd) =>frnd.to_user._id !== friend.to_user._id
        );
        
        setUser({
            ...user,
            friends: newFriends
        })
    }


    return {
        user,
        login,
        logout,
        signup,
        loading,
        updateUser,
        updateUserFriends,
    };
};

export const usePosts =()=>{
    return useContext(PostsContext)
}

export const useProvidePosts =()=>{
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await getPosts();
          if (response.success) {
            setPosts(response.data.posts);
          }
          setLoading(false);
        };

        fetchPosts();
    }, []);

    const addPostToState = () =>{

    }
    return {
        data: posts,
        loading,
        addPostToState
    }
}