import { useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import banner from "../../img/Board-buddies-banner.png"
import { AuthContext } from "../../components/AuthProvider";

function Dashboard() {

    const { signout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Current user:', user);
    }, [user]);

    function handleSignout() {
        signout();
        navigate("/");
    }

    return(
        <div className="dashboard">
            <div className="card" style={{width:"30rem"}}>
            <img className="m-3" src={banner} alt="" />
                <NavLink className="image" to="/under-construction">
                    <img className="dashboard-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbytOw7-0igVgRdWHj3wbBAg-EFq09tAup1w&s"
                    title="View Profile"
                    alt="" />
                </NavLink>
                <div className="mb-3">
                    <h2 className="mt-2">{user?.username || 'YOU SHOULDN\'T BE HERE!!!...'}</h2>
                </div>
                <div className="">
                    <div className="nav-item">
                        <NavLink to="/game">
                            <button className="btn btn-outline-primary col-6 mt-2" type="button">Games List</button>
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/under-construction">
                            <button className="btn btn-outline-primary col-6 mt-2" type="button">My Meetups</button>
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/under-construction">
                            <button className="btn btn-outline-primary col-6 mt-2" type="button">Find Meetups</button>
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/under-construction">
                            <button className="btn btn-outline-primary col-6 mt-2" type="button">Past Meetups</button>
                        </NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/under-construction">
                            <button className="btn btn-outline-primary mb-3 col-6 mt-2" type="button">Board Buddies</button>
                        </NavLink>
                    </div>
                    <div className="nav-item">
                            <button className="btn btn-outline-danger mb-5 col-6 mt-2" type="button" onClick={handleSignout}>Signout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
