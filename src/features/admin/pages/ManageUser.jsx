import React from "react";
import { ChevronDown } from "lucide-react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Button, Select } from "../../../components/common/index";
import { Link } from "react-router-dom";
import SearchBar from "../../../components/common/SearchBar";
import ButtonLink from "../../../components/common/ButtonLink";
import { Table } from "../components/Table";

export default function ManageUser() {
  return (
    <AdminLayout className="p-6">
      {/* 1. Title & Breadcrumb */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <p className="text-sm text-gray-500">Dashboard / Users</p>
      </div>

      {/* 2. Actions: Create + Search + Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <ButtonLink to="/admin/user-management/create">+ Add User</ButtonLink>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar />

          <Select
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

      {/* 3. User Count Filters */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <span className="text-gray-800 cursor-pointer hover:text-yellow-600">
          All (1)
        </span>
        <span className="text-red-600 cursor-pointer hover:underline">
          Administrator (1)
        </span>
        <span className="text-gray-600 cursor-pointer hover:underline">
          Moderator (0)
        </span>
        <span className="text-gray-600 cursor-pointer hover:underline">
          User (0)
        </span>
      </div>

      {/* 4. User Management Table */}
      <Table
        columns={["User", "E-mail", "Role"]}
        data={[
          ["John Doe", "john@example.com", "Admin"],
          ["Jane Smith", "jane@example.com", "User"],
        ]}
        actions={(row) => (
          <>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg mr-2 hover:bg-gray-100">
              Edit
            </button>
            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">
              Delete
            </button>
          </>
        )}
      />
    </AdminLayout>
  );
}
