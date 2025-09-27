// src/hooks/useSignup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthAPI } from "../../../services/api";
import toast from "react-hot-toast";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({ name, email, password, passwordConfirmation }) => {
    setLoading(true);

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await UserAuthAPI.register({ name, email, password, passwordConfirmation });
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};
