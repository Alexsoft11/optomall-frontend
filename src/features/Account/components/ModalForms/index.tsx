import { Modal } from 'antd'
import React, { FC, ReactNode } from 'react'
interface IProps {
  children:ReactNode
  isOpen: boolean;
  onClick:any;
}

const ModalForms:FC<IProps> = ({children,isOpen,onClick}) => {

  return (
    <Modal footer open={isOpen} onCancel={onClick}>
      {children}
    </Modal>
  )
}

export default ModalForms