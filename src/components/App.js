import { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import { getPosts } from '../api'
import { Home, Login }  from '../pages';
import Loader from "./Loader";
import Navbar from "./Navbar";
const About = () =>{
    return <h1>About</h1>
}

const UserInfo = () =>{
    return <h1>User</h1>
}


const Page404 = () =>{
    return <h1>404</h1>
}

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
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
        <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element= {<Home posts={posts} />} />
                <Route exact path="/login" element= {<Login/>} />
                <Route exact path="/about" element= {<About />} />
                <Route exact path="/user/kjdhdh" element= {<UserInfo/>} />
                <Route element={<Page404/>}/>
            </Routes>
           
        </div>
    );
}
export default App;
