import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if no token
    }
  }, [navigate]);

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='container mt-5'>
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <button className='btn btn-danger' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
