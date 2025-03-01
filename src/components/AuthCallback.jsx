import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get("code");

      if (!authCode) {
        alert("Google Authentication Failed");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.post(
          "https://test-ecomerce.xn--hrt-w-ova.de/api/user/social-login",
          {
            account_type: "google",
            code: authCode, // Send auth code to backend
          },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Google Sign-In Successful:", response.data);
        alert("Sign Up Successful!");
        navigate("/dashboard");
      } catch (error) {
        console.error("Google Authentication Error:", error);
        alert("Failed to authenticate with Google.");
        navigate("/signin");
      }
    };

    fetchGoogleToken();
  }, [navigate]);

  return <h2>Authenticating...</h2>;
};

export default AuthCallback;
