import { Routes, Route} from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Signup }  from '../pages';
import Navbar from "./Navbar";

const Page404 = () =>{
    return <h1>404</h1>
}

function App() {
    
    const auth = useAuth();
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element= {<Home posts={[]} />} />
                <Route exact path="/login" element= {<Login/>} />
                <Route exact path="/register" element= {<Signup/>} />
                {/* <Route exact path="/user/kjdhdh" element= {<UserInfo/>} /> */}
                <Route element={<Page404/>}/>
            </Routes>
           
        </div>
    );
}
export default App;
