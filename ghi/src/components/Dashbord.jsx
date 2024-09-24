import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import banner from "../img/Board-buddies-banner.png"
import profileIcon from "../img/player-icons/board-buddies-icon-llama.png"
import ProfilePicModal from "./ProfilePicModal";

function Dashboard() {

    return(
        <>
            <ProfilePicModal />
            <div className="dashboard conatiner-fluid">
                <div className="card" style={{width:"30rem"}}>
                <img className="m-3" src={banner} alt="" />
                    <NavLink className="image" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <img className="dashboard-img"
                        src={profileIcon}
                        title="Profile"
                        alt="" />
                    </NavLink>
                    <div className="mb-3">
                        <h2 className="mt-2">Llama Mama</h2>
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
                            <NavLink to="/under-construction">
                                <button className="btn btn-outline-danger mb-5 col-6 mt-2" type="button">Signout</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
