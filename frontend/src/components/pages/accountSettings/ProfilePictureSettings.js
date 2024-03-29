import React, { useRef, useState, useEffect } from "react";
import SideBar_AccountSettings from './SideBar_AccountSettings'; 
import { withTokenRequest, requestHeaders } from '../../../http';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import "../../modules/crop/Crop.css";
import "../../modules/crop/CropImage";
import noImage from "../../../assets/img/no image/noimage.png"
import { deleteBackSlash } from "../../../utils/function";
import { ItemPreviewWithCrop } from "../../modules/crop/CropImage";

const ProfilePictureSettings = () => {
    const previewMethodsRef = useRef();
    const [profilePicturesCropped, setProfilePicturesCropped] = useState({profilePictureCropped1: '', profilePictureCropped2: '', profilePictureCropped3: ''});
    requestHeaders.Authorization = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
    const date= Date.now();

    useEffect(() => {
        getProfilePictureCropped();
    }, []);

    function getProfilePictureCropped() {
        withTokenRequest.post('/getProfilePictureCropped', {user_id: localStorage.getItem('user_id')},
            {headers: requestHeaders}
        )
        .then((res) => {
            if (!res.data.data.profilePictureCropped1) {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped1: noImage }));
            } else {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped1: '../../storage/' + deleteBackSlash(res.data.data.profilePictureCropped1) }));
            }
            if (!res.data.data.profilePictureCropped2) {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped2: noImage }));
            } else {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped2: '../../storage/' + deleteBackSlash(res.data.data.profilePictureCropped2) }));
            }
            if (!res.data.data.profilePictureCropped3) {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped3: noImage }));
            } else {
                setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped3: '../../storage/' + deleteBackSlash(res.data.data.profilePictureCropped3) }));
            }
        });
    }

    function deleteProfilePicture(profilePictureNumber) {
        withTokenRequest.post('/deleteProfilePicture', {user_id: localStorage.getItem('user_id'), profilePictureNumber: profilePictureNumber},
            {headers: requestHeaders}
        )
        .then(() => {
            switch (profilePictureNumber) {
                case 1:
                    setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped1: noImage }));
                    break;
                case 2:
                    setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped2: noImage }));
                    break;
                case 3:
                    setProfilePicturesCropped((prevState) => ({ ...prevState, profilePictureCropped3: noImage }));
                    break;
            }
        })
    }

    function getProfilePictureOriginal(profilePictureNumber) {
        switch (profilePictureNumber) {
            case 1:
                if (profilePicturesCropped.profilePictureCropped1 == noImage) {
                    return;
                }
                break;
            case 2:
                if (profilePicturesCropped.profilePictureCropped2 == noImage) {
                    return;
                }
                break;
            case 3:
                if (profilePicturesCropped.profilePictureCropped3 == noImage) {
                    return;
                }
                break;
        }
        withTokenRequest.post('/getProfilePictureOriginal', {user_id: localStorage.getItem('user_id'), profilePictureNumber: profilePictureNumber},
            {headers: requestHeaders}
        )
        .then((res) => {
            if (!res.data.data.profilePictureOriginal) {
                return;
            } else {
                window.open('../../storage/' + deleteBackSlash(res.data.data.profilePictureOriginal));
            }
        })
    }

    /** css */
    const mainContents = {
        float: 'left',
        margin: '10px',
        width: 'calc(100% - 362px)'
    }

    const profilePictureSettings = {
        float: 'left',
        margin: '10px',
        padding: '10px',
    }

    const croppedStyle = {
        width: '200px',
        height: '200px',
        cursor: 'pointer'
    }

    const deleteButtonStyle = {
        'margin-left': '50px'
    }

    return (
        <>
            <SideBar_AccountSettings />
            <div style={mainContents}>
                <Uploady
                    multiple={false}
                >
                    <div className="ProfilePicture1" style={profilePictureSettings}>
                        <img src={profilePicturesCropped.profilePictureCropped1 + "?" + date} alt="picture" style={croppedStyle}
                            onClick={() => getProfilePictureOriginal(1)}>
                        </img><br></br>
                        <UploadButton>SETTINGS</UploadButton>
                        <button style={deleteButtonStyle} onClick={() => deleteProfilePicture(1)}>DELETE</button>
                        <br />
                    <UploadPreview
                        PreviewComponent={ItemPreviewWithCrop}
                        previewComponentProps={{ 
                            previewMethods: previewMethodsRef, aspectProps: 1 / 1, api: 'setProfilePicture', 
                            aspectControllButtonsVisible: false, inputTextVisible: false,
                            distinctiveParam: {profilePictureNumber: 1, distinctiveFunc: getProfilePictureCropped}
                        }}
                        previewMethodsRef={previewMethodsRef}
                    />
                    </div>
                </Uploady>
                <Uploady
                    multiple={false}
                >
                    <div className="ProfilePicture2" style={profilePictureSettings}>
                        <img src={profilePicturesCropped.profilePictureCropped2 + "?" + date} alt="picture" style={croppedStyle}
                            onClick={() => getProfilePictureOriginal(2)}>
                        </img><br></br>
                        <UploadButton>SETTINGS</UploadButton>
                        <button style={deleteButtonStyle} onClick={() => deleteProfilePicture(2)}>DELETE</button>
                        <br />
                    <UploadPreview
                        PreviewComponent={ItemPreviewWithCrop}
                        previewComponentProps={{ 
                            previewMethods: previewMethodsRef, aspectProps: 1 / 1, api: 'setProfilePicture', 
                            aspectControllButtonsVisible: false, inputTextVisible: false,
                            distinctiveParam: {profilePictureNumber: 2, distinctiveFunc: getProfilePictureCropped}
                        }}
                        previewMethodsRef={previewMethodsRef}
                    />
                    </div>
                </Uploady>
                <Uploady
                    multiple={false}
                >
                    <div className="ProfilePicture3" style={profilePictureSettings}>
                        <img src={profilePicturesCropped.profilePictureCropped3 + "?" + date} alt="picture" style={croppedStyle}
                            onClick={() => getProfilePictureOriginal(3)}>
                        </img><br></br>
                        <UploadButton>SETTINGS</UploadButton>
                        <button style={deleteButtonStyle} onClick={() => deleteProfilePicture(3)}>DELETE</button>
                        <br />
                    <UploadPreview
                        PreviewComponent={ItemPreviewWithCrop}
                        previewComponentProps={{ 
                            previewMethods: previewMethodsRef, aspectProps: 1 / 1, api: 'setProfilePicture', 
                            aspectControllButtonsVisible: false, inputTextVisible: false,
                            distinctiveParam: {profilePictureNumber: 3, distinctiveFunc: getProfilePictureCropped}
                        }}
                        previewMethodsRef={previewMethodsRef}
                    />
                    </div>
                </Uploady>
            </div>
        </>
    );
}

export default ProfilePictureSettings;

