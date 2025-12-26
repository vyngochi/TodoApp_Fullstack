import { useRef, useState } from "react";
import styled from "styled-components";

const OTP_LENGTH = 6;

interface OTPCodeFormProps {
  onSubmit: (v: string) => void;
}
const OTPCodeForm = ({ onSubmit }: OTPCodeFormProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");
    onSubmit(otpCode);
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="content">
          <p style={{ textAlign: "center" }}>Enter your OTP Code</p>
          <div className="inp">
            {otp.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={value}
                maxLength={1}
                className="input"
                type="text"
                inputMode="numeric"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button type="submit" disabled={otp.some((v) => v === "")}>
            Verify
          </button>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    backdrop-filter: blur(8.2px);
    -webkit-backdrop-filter: blur(8.2px);
    border: 1.5px solid #ccc;
    width: 100%;
    height: 12em;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: auto;
    margin-bottom: auto;
  }

  .form p {
    color: #6d88ea;
    font-weight: bolder;
    margin: 0;
  }

  .inp {
    margin-left: auto;
    margin-right: auto;
    white-space: 4px;
  }

  .input + .input {
    margin-left: 0.5em;
  }

  .input {
    color: #000;
    float: left;
    text-align: center;
    background: #00000000;
    outline: none;
    border: 1px #ccc solid;
    border-radius: 5px;
    transition: all 0.6s ease;
    font-size: larger;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  .input:focus {
    outline: none;
    border: 1px #6d88ea solid;
  }

  .input:not(:placeholder-shown) {
    background-color: #fff;
    width: 1.5em;
    height: 1.5em;
  }

  .form button {
    margin-left: auto;
    margin-right: auto;
    background-color: #00000000;
    color: #6d88ea;
    width: 8.5em;
    height: 2.3em;
    border: #ccc 0.1em solid;
    border-radius: 5px;
    transition: all 0.5s ease;
    cursor: pointer;
    font-weight: 500;
  }

  .form button:hover {
    background-color: #6d88ea;
    color: white;
    font-weight: 700;
  }

  .form button:active {
    transform: translateX(1%) translateY(1%) scale(0.96);
  }
`;

export default OTPCodeForm;
