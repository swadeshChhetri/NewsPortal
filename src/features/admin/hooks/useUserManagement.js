import { useEffect, useState } from "react";
import { UserAPI, UserAuthAPI } from "../../../services/api";

export const useUserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);

  // ---------------- Create User ----------------
  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await UserAuthAPI.register(userData);
      setSuccess(res);
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    ``;
    setError(null);
    setSuccess(null);
    try {
      const data = await UserAPI.fetchAll(); // make sure this endpoint exists
      const res = data.data;

      setUsers(res);
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a single user by ID
  const getUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await UserAPI.fetchById(id);
      const res = data.data;
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  

  // Update user
  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await UserAPI.update(id, userData); // API call
      setSuccess(res);
      await fetchUsers(); // refresh list after update
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await UserAPI.delete(id); // API call
      setSuccess(res);
      await fetchUsers(); // refresh the list
      return res;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    createUser,
    fetchUsers,
    getUserById,
    updateUser,
    deleteUser,
    loading,
    error,
    success,
    users,
  };
};
