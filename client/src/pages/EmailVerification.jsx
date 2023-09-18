import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const { emailToken } = useParams();
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          `http://3.110.108.170:5000/api/verify-email/${emailToken}`
        );
        const data = res.data;

        if (data.isVerified) {
          setVerificationStatus("Email Verified Successfully");
        } else {
          setVerificationStatus("Email Verification Failed");
        }
      } catch (error) {
        console.error(error);
        setVerificationStatus("Email Verification Failed");
      }
    };

    verifyEmail();
  }, [emailToken]);

  return (
    <div>
      <h1>Email Verification Status</h1>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerification;
