// components/AuthModal.tsx
import React from "react";
import { useTranslations } from "next-intl";
import { Modal } from "../Modal";
import { useRouter } from "next/router";
import { Button } from "../Button";

interface AuthModalProps {
  open: boolean;
  onCancel: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onCancel }) => {
  const t = useTranslations();
  const { push } = useRouter();
  const handleClick = () => {
    push("/auth");
    onCancel();
  };
  
  return (
    <Modal
      open={open}
      title={t("authModal.title")}
      onCancel={onCancel}
      className="auth-modal"
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          label={t("authModal.cancel")}
        />,
        <Button
          key="authorize"
          type="primary"
          onClick={handleClick}
          label={t("authModal.authorize")}
        />,
      ]}
    >
      <p>{t("authModal.message")}</p>
    </Modal>
  );
};

export default AuthModal;
