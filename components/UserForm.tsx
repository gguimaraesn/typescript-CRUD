"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../utils/createClient';

interface UserFormProps {
  fetchUsers: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ fetchUsers }) => {
  const [user, setUser] = useState<{ name: string; age: number | '' }>({ name: '', age: '' });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser(prevFormData => ({
      ...prevFormData,
      [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value
    }));
  }

  async function createUser(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await supabase.from('users').insert([{ name: user.name, age: user.age }]);
    fetchUsers();
    setUser({ name: '', age: '' });
    setIsLoading(false);
  }

  return (
    <form onSubmit={createUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800 dark:text-white">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={user.age}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;