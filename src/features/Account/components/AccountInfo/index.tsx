/** @format */

import React, { useState } from "react";
import ModalForms from "../ModalForms";
import { Form, Input } from "antd";
import styles from "./AccounInfot.module.scss";
import UserProfile from "../UserProfile";
import Image from "next/image";
import { editAccountIcon } from "$/assets/images";
const AccountInfo = () => {
  const [open, setOpen] = useState({
    isEmail: false,
    isUserName: false,
    isPhoneNumber: false,
    isResetPassword: false,
  });
  const onUsernameFinish = (values: any) => {
    console.log(values);
  };
  const user = {
    name: 'Lusuf',
    id: 'U240402142250854603',
    profileImage: '' // If there's an image URL, set it here
  };
  return (
    <>
      <div>
        <div className={styles.card_info}>
          <h3>Мой аккаунт</h3>
        <UserProfile user={user}/>
          <div className={styles.info}>
            <div className={styles.card}>
              <p>Электронная почта::</p>
              <div>
                <span>jusephlilkham@gmail.com</span>
                <button>Изменить</button>
                <Image src={editAccountIcon} alt="#" className={styles.info_arrow} onClick={()=>setOpen({...open, isEmail:true})}/>

              </div>
            </div>
            <div className={styles.card}>
              <p>Имя:</p>
              <div>
                <span>Юсуф Илхамов</span>
                <button>Изменить</button>
                <Image src={editAccountIcon} alt="#" className={styles.info_arrow} onClick={()=>setOpen({...open, isUserName:true})}/>
              </div>
            </div>
            <div className={styles.card}>
              <p>Номер телефона::</p>
              <div>
                <span>998946227645</span>
                <button>Изменить</button>
                <Image src={editAccountIcon} alt="#" className={styles.info_arrow} onClick={()=>setOpen({...open, isPhoneNumber:true})}/>

              </div>
            </div>
            <div className={styles.card}>
              <p>Пароль:</p>
              <div>
                <span>********</span>
                <button>Изменить</button>
                <Image src={editAccountIcon} alt="#" className={styles.info_arrow} onClick={()=>setOpen({...open, isResetPassword:true})}/>

              </div>
            </div>
          </div>
        </div>
        <ModalForms
          isOpen={open.isEmail}
          onClick={() => setOpen({ ...open, isEmail: false })}>
          <Form onFinish={onUsernameFinish}>
            <Form.Item name='username'>
              <Input placeholder='Username' />
            </Form.Item>
          </Form>
        </ModalForms>
        <ModalForms
          isOpen={open.isUserName}
          onClick={() => setOpen({ ...open, isUserName: false })}>
          <Form onFinish={onUsernameFinish}>
            <Form.Item name='username'>
              <Input placeholder='Username' />
            </Form.Item>
          </Form>
        </ModalForms>
        <ModalForms
          isOpen={open.isPhoneNumber}
          onClick={() => setOpen({ ...open, isPhoneNumber: false })}>
          <Form onFinish={onUsernameFinish}>
            <Form.Item name='username'>
              <Input placeholder='Phone number' />
            </Form.Item>
          </Form>
        </ModalForms>
        <ModalForms
          isOpen={open.isResetPassword}
          onClick={() => setOpen({ ...open, isResetPassword: false })}>
          <Form onFinish={onUsernameFinish}>
            <Form.Item name='username'>
              <Input.Password placeholder='new password' />
            </Form.Item>
            <Form.Item name='username'>
              <Input.Password placeholder='confirm password' />
            </Form.Item>
          </Form>
        </ModalForms>
      </div>
    </>
  );
};

export default AccountInfo;
