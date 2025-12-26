import { useState } from "react";
import * as S from "./styles/OTPSending.styled";
import EmailFieldSendingOTP from "../common/EmailFieldSendingOTP";
import OTPCodeForm from "../common/OTPCodeForm";
import useValidateForm from "@/hooks/useValidateForm";
import { validateEmailChangePassword } from "@/utils/Validation/AuthValidation";
import { useChangePassword, useSendOtp, useVerifyOtp } from "@/api/MailService";
import { useNotification } from "../common/NotificationStack";
import { getErrorMessage } from "@/utils/errorHandler";
import { AUTH_NOTI_TITLE, AUTH_RES_MESS } from "@/utils/Messages/AuthMessage";
import ChangePasswordForm from "./ChangePasswordForm";
import { useNavigate } from "react-router-dom";

interface OTPSendingProps {
  setIsSignUp: (v: boolean) => void;
  setIsForgot: (v: boolean) => void;
}
export default function OTPSending({
  setIsSignUp,
  setIsForgot,
}: OTPSendingProps) {
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();
  const changePass = useChangePassword();
  const { showSuccess, showError } = useNotification();
  const [isSuccess, setIsSucess] = useState(false);
  const [isChangeForm, setIsChangeForm] = useState(false);

  const { errors, handleChange, handleSubmit, values } = useValidateForm(
    {
      email: "",
    },
    validateEmailChangePassword,
    () => handleSendOtp()
  );

  const handleSendOtp = () => {
    sendOtp.mutate(values.email, {
      onSuccess: (data) => {
        showSuccess("Send OTP", data.message || "Send OTP successfully");
        setIsSucess(true);
      },
      onError: (error) => {
        const err = getErrorMessage(error);
        showError("Send OTP", err);
      },
    });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp.mutate(
      { email: values.email, otp: otp },
      {
        onSuccess: (data) => {
          setIsChangeForm(true);
          showSuccess(
            AUTH_NOTI_TITLE.OTP_VERIFIED,
            data.message || AUTH_RES_MESS.OTP_VERIFIED
          );
        },
        onError: (error) => {
          const err = getErrorMessage(error);
          showError(AUTH_NOTI_TITLE.OTP_VERIFIED, err);
        },
      }
    );
  };

  const handleChangePassword = (password: string) => {
    changePass.mutate(
      { email: values.email, password: password },
      {
        onSuccess: (data) => {
          showSuccess(
            AUTH_NOTI_TITLE.PASS_CHANGING,
            data.message || AUTH_RES_MESS.PASS_CHANGING
          );
          setIsSignUp(false);
          setTimeout(() => {
            setIsForgot(false);
          }, 300);
        },
        onError: (error) => {
          const err = getErrorMessage(error);
          alert(err);
          showError(AUTH_NOTI_TITLE.PASS_CHANGING, err);
        },
      }
    );
  };

  if (isChangeForm) {
    return <ChangePasswordForm onSubmit={handleChangePassword} />;
  }

  return (
    <>
      <S.OTPSendingWrapper>
        <S.TitleWrapper>
          <h1>Forgot Password</h1>
        </S.TitleWrapper>
        <EmailFieldSendingOTP
          label="Email"
          placeholder="Enter your email"
          type="text"
          value={values.email}
          onChange={handleChange}
          name="email"
          error={errors.email}
          onSend={handleSubmit}
          isSuccess={isSuccess}
        />
        {isSuccess && <OTPCodeForm onSubmit={handleVerifyOtp} />}
      </S.OTPSendingWrapper>
    </>
  );
}
