import React, { useEffect, useState } from "react";
import { useUserManagement } from "../hooks/useUserManagement";
import AdminLayout from "../../../components/layout/AdminLayout";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";


export default function UserForm() {
  const { id } = useParams();

  const { createUser, updateUser, getUserById, loading, error, success } =
    useUserManagement();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    fullName: "",
  });

  useEffect(() => {
    if (id) {
     ( async () => {
        const user = await getUserById(id);
        console.log(user);
        if (user) {
          setFormData({
            email: user.email,
            password: "",
            passwordConfirmation: "",
            fullName: user.name,
          });
        }
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, {
          name: formData.fullName,
          email: formData.email,
          ...(formData.password ? { password: formData.password } : {}),
        });
        toast.success("User updated successfully!");
      } else {
        await createUser({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
        });
        toast.success("User created successfully!");
      }
    } catch (err) {
      console.error("Failed to create user:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        {id ? "Update User" : "Create User"}
      </h1>
      <p className="text-gray-500 mb-6">
        {id ? "Edit this user’s details." : "Add a new user."}
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Tony Stark"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-Mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            required
          />
        </div>

        {/* Password (only for create or reset) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              id ? "Leave blank to keep existing" : "6 characters or more"
            }
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            {...(id ? {} : { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            {...(id ? {} : { required: true })}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow-md"
            disabled={loading}
          >
            {loading
              ? id
                ? "Updating..."
                : "Creating..."
              : id
              ? "Update"
              : "Create"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
