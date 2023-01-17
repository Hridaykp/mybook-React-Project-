// import PropTypes from 'prop-types';
import Comment from '../components/Comment';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import  FriendsList  from '../components/FriendsList';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);
  const auth = useAuth();
     useEffect(()=>{
        const fetchPosts = async() => {
            const response = await getPosts();
            console.log('response', response);
            if(response.success){
                setPosts(response.data.posts)
            }
            setLoading(false)
        };
        fetchPosts();
    }, []);

    if(loading){
      return <Loader/> ;
    }
  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} >
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="user-pic"
              />
              <div>
                <Link 
                 to={{
                  pathname: `/user/${post.user._id}`,
                  state: {
                    user: post.user,
                  },
                }}
                className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/456/456115.png"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4081/4081342.png"
                  alt="comments-icon"
                />
                <span>2</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
            {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
      {auth.user && <FriendsList/>}
    </div>
  );
};


// Home.propTypes ={
//     posts: PropTypes.array.isRequired
// }
export default Home;
