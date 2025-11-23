import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleOnchangeFile = (event) => {
        if (!event.target.files || event.target.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    // console.log(">>> check file: ", preview)

    const handleUpdateUserAvatar = async () => {
        // step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            // success
            const newAvatar = resUpload.data.fileUploaded
            // step 2: upload user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser()

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            // failed
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }

    }

    return (
        <>
            <Drawer
                width={"40vw"}
                title="Detail user"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setIsDetailOpen(false)
                    setDataDetail(null)
                }}
                open={isDetailOpen}
            >
                {dataDetail
                    ?
                    (
                        <>
                            <p>id: {dataDetail._id}</p>
                            <p>full name: {dataDetail.fullName}</p>
                            <p>email: {dataDetail.email}</p>
                            <p>phone number: {dataDetail.phone}</p>
                            <div style={{
                                marginTop: "10px",
                                height: "100px",
                                width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain"
                                    }}
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                    alt="avatar" />
                            </div>

                            <div>
                                <label
                                    htmlFor="btn-upload"
                                    style={{
                                        display: "block",
                                        width: "fit-content",
                                        marginTop: "15px",
                                        padding: "5px 10px",
                                        background: "orange",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
                                >Upload avatar</label>
                                <input
                                    type="file"
                                    id="btn-upload"
                                    hidden
                                    // onChange={handleOnchangeFile}
                                    onChange={(event) => { handleOnchangeFile(event) }}
                                />
                            </div>

                            {preview &&
                                <>
                                    <div style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                        height: "100px",
                                        width: "150px",
                                    }}>
                                        <img
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "contain"
                                            }}
                                            src={preview}
                                            alt="avatar" />
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() => handleUpdateUserAvatar()}
                                    >Save</Button>
                                </>
                            }
                        </>
                    )
                    :
                    <>
                        <p>KHông có dữ liệu</p>
                    </>
                }
            </Drawer >
        </>
    )

}

export default ViewUserDetail