/** @format */

import SvgSelector from "$/assets/icons/SvgSelector";
import { UploadIcon } from "$/assets/images";
import { Avatar, Upload, UploadProps, message } from "antd";
import { GetProp } from "antd/lib";
import Image from "next/image";
import styles from "./UserProfile.module.scss";
import React, { useState } from "react";

const UserProfile = ({ user }: any) => {
  const [imageUrl, setImageUrl] = useState(user?.profileImage);

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      // Get the uploaded file URL here, assume the URL is returned in response
      setImageUrl(info.file.response.url);
    }
  };
  return (
    <div className={styles.profile}>
      {imageUrl ? (
        <>
          <Avatar size={64} src={imageUrl} />
          <div className={styles.uploadIcon}>
            <Upload
              name='profile'
              showUploadList={false}
              onChange={handleChange}>
              {/* <Image className={styles.icon} src={UploadIcon} alt='#' /> */}
            </Upload>
          </div>
        </>
      ) : (
        <>
          <Avatar size={64} style={{ backgroundColor: "#D0D0D0" }}>
            {user?.name.charAt(0)}
          </Avatar>
          <div className={styles.uploadIcon}>
            {/* <Image className={styles.icon} src={UploadIcon} alt='#' /> */}
          </div>
        </>
      )}
      <div className={styles.profile_info}>
        <p>{user?.name}</p>
        <span>ID: {user?.unique_id}</span>
      </div>
    </div>
  );
};

export default UserProfile;
