import React, { useState } from "react";

export default function AddUser() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    role: "",
    fullName: "",
    userIp: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Create User</h1>
      <p className="text-gray-500 mb-6">Add a new user.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">E-Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tony@stark-industries.com"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="6 characters or more"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username (Optional)
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="A-z0-9_ only, between 5 and 31 characters"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
          >
            <option value="">Select user role</option>
            <option value="admin">Administrator</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
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

        {/* User IP */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User IP (Optional)
          </label>
          <input
            type="text"
            name="userIp"
            value={formData.userIp}
            onChange={handleChange}
            placeholder="127.0.0.1"
            className="mt-1 w-full border-b border-gray-300 focus:border-yellow-600 outline-none p-2"
          />
        </div>

        {/* Gender */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="accent-yellow-600"
              />
              Male
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="accent-yellow-600"
              />
              Female
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="non-binary"
                checked={formData.gender === "non-binary"}
                onChange={handleChange}
                className="accent-yellow-600"
              />
              Non-Binary
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg shadow-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}