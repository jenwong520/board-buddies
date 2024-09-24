import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { tryFetch } from "../utils";


const profileImages = import.meta.glob('../img/player-icons/*.{png,jpg}', {eager:true})

function ProfilePicModal() {

    const updateProfilePic  = async (src)  => {
        const data = {}
        data.profile_pic = src
        const url = 'http://localhost:8000/api/players/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await tryFetch (url, fetchConfig)
    }

    const imageList = Object.values(profileImages).map((image, index) =>(
        <img
        key={index}
        src={image.default}
        className="col-4 mt-4"
        id={index}
        onClick={() => updateProfilePic(image.default)}
        />
    ))


    return(
        <>
           <div className="modal fade"
           id="staticBackdrop"
           data-bs-backdrop="static"
           data-bs-keyboard="false"
           tabIndex="-1"
           aria-labelledby="staticBackdropLabel"
           aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5"
                        id="staticBackdropLabel">Select a Board Buddy</h1>
                        <button type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {imageList}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
} export default ProfilePicModal
