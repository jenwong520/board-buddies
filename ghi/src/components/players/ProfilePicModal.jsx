import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";


const profileImages = import.meta.glob('../../img/player-icons/*.{png,jpg}', {eager:true})


function ProfilePicModal({ setProfilePicture, user }) {
    const updateProfilePic  = async (src)  => {
        console.log("Data being sent:", { profile_picture: src });
        try {
            const data = { profile_picture: src }
            const url = `http://localhost:8000/api/players/${user.user_id}/`
            const fetchConfig = {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch (url, fetchConfig)

            const responseData = await response.json();
            console.log("Response Data:", responseData);

            if (response.ok) {
                setProfilePicture(src);
                console.log('Profile picture updated successfully', src);
                const modalElement = document.getElementById('staticBackdrop');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                console.log('Modal instance:', modalInstance);
                if (modalInstance) {
                    modalInstance.hide();
                }
            } else {
                console.error('Failed to update profile picture', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile picture', error);
        }
    };


    const imageList = Object.values(profileImages).map((image, index) =>(
        <div className="col-3 d-flex justify-content-center" key={index}>
            <img
            src={image.default || image}
            className="col-4 mt-4"
            id={index}
            onClick={() => updateProfilePic(image.default || image)}
            style={{
                cursor: 'pointer',
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50px'
            }}
            alt={`Profile image ${index}`}
            />
        </div>
    ));

    
    return(
        <>
           <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content" style={{ backgroundColor: 'rgba(47, 47, 47, 0.6)', color: 'white' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 offset-3 ps-3" id="staticBackdropLabel">
                                Select A Board Buddy
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">{imageList}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} export default ProfilePicModal
