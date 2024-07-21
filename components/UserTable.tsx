"use client";

import React from 'react';
import { supabase } from '../utils/createClient';

interface User {
  id: number;
  name: string;
  age: number;
}

interface UserTableProps {
  users: User[];
  fetchUsers: () => void;
  displayUser: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, fetchUsers, displayUser }) => {
  async function deleteUser(userId: number) {
    const { error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
      console.log(error);
    } else {
      fetchUsers();
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-800 text-white dark:bg-gray-900">
          <tr>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-left">ID</th>
            <th className="w-2/6 py-3 px-4 uppercase font-semibold text-sm text-left">Name</th>
            <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-left">Age</th>
            <th className="w-2/6 py-3 px-4 uppercase font-semibold text-sm text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 dark:text-gray-300">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="w-1/6 py-3 px-4 text-left">{user.id}</td>
              <td className="w-2/6 py-3 px-4 text-left">{user.name}</td>
              <td className="w-1/6 py-3 px-4 text-left">{user.age}</td>
              <td className="w-2/6 py-3 px-4 flex space-x-2 text-left">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => displayUser(user.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;