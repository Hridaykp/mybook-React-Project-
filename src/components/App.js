import { Routes, Route, Navigate} from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Signup, Setting, UserProfile }  from '../pages';
import Navbar from "./Navbar";

const Page404 = () =>{
    return <h1>There's nothing here: 404!</h1>
}

const PrivateRoute =({children})=>{
    const auth = useAuth();
    return auth.user ? children : <Navigate to="/login"/>
}


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element= {<Home posts={[]} />} />
                <Route exact path="/login" element= {<Login/>} />
                <Route exact path="/register" element= {<Signup/>} />
                <Route exact path="/settings" element= {<PrivateRoute><Setting/></PrivateRoute>} />
                <Route exact path="/user/:userId" element= {<PrivateRoute><UserProfile/></PrivateRoute>} />
                <Route exact path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}
export default App;
