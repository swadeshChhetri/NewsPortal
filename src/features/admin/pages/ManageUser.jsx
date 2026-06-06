import React, { useState } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Select } from "../../../components/common/index";
import SearchBar from "../../../components/common/SearchBar";
import ButtonLink from "../../../components/common/ButtonLink";
import { Table } from "../components/Table";
import { useUserManagement } from "../hooks/useUserManagement";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ManageUser() {
  const { users,   deleteUser, loading, error } = useUserManagement();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  let filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (sortBy === "az") {
    filteredUsers = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortBy === "za") {
    filteredUsers = [...filteredUsers].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  } else if (sortBy === "oldest") {
    filteredUsers = [...filteredUsers].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (sortBy === "newest") {
    filteredUsers = [...filteredUsers].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully!");
    } catch (err) {
      alert("Failed to delete user.");
      console.error(err);
    }
  };

  return (
    <AdminLayout className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <p className="text-sm text-gray-500">Dashboard / Users</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <ButtonLink to="/admin/user-management/create">+ Add User</ButtonLink>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            options={[
              { label: "Sort: Oldest", value: "oldest" },
              { label: "Sort: Newest", value: "newest" },
              { label: "Sort: A-Z", value: "az" },
              { label: "Sort: Z-A", value: "za" },
              { label: "Status", value: "status" },
            ]}
          />
        </div>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Table
        columns={["SL No", "User", "E-mail", "Status"]}
        data={filteredUsers} // array of user objects
        renderRow={(user, index) => (
          <tr key={user._id} className="border-t">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{user.name}</td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">{user.status || "Active"}</td>
            <td className="p-3 text-right">
              <Link
                to={`/admin/user-management/edit/${user._id}`}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg mr-2 hover:bg-gray-100"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        )}
      />
    </AdminLayout>
  );
}
