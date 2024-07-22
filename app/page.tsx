"use client";

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/createClient';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import DarkModeToggle from '../components/DarkModeToggle';

interface User {
  id: number;
  name: string;
  age: number;
}

const Form: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user2, setUser2] = useState<{ id: number, name: string, age: string }>({ id: 0, name: '', age: '' });
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current!.focus();
      }, 100);
    }
  }, [user2]);

  async function fetchUsers() {
    const { data } = await supabase.from('users').select('*');
    setUsers(data as User[]);
  }

  function displayUser(userId: number) {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setUser2({ id: userToEdit.id, name: userToEdit.name, age: String(userToEdit.age) });
    }
  }

  async function updateUser(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    const ageNumber = user2.age === '' ? 0 : parseInt(user2.age, 10);
    const { error } = await supabase
      .from('users')
      .update({ name: user2.name, age: ageNumber })
      .eq('id', user2.id);
    if (error) {
      console.log(error);
    } else {
      fetchUsers();
      setUser2({ id: 0, name: '', age: '' });
    }
    setIsLoading(false);
  }

  function handleChange2(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser2(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Your Informations</h1>
        <DarkModeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <UserForm fetchUsers={fetchUsers} />
        </div>
        <div>
          <form onSubmit={updateUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800 dark:text-white">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                ref={nameInputRef}
                value={user2.name}
                onChange={handleChange2}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-0 focus:ring-2 focus:ring-offset-2 transition duration-300 ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={user2.age}
                onChange={handleChange2}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-0 focus:ring-2 focus:ring-offset-2 transition duration-300 ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="age"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <UserTable users={users} fetchUsers={fetchUsers} displayUser={displayUser} />
    </div>
  );
}

export default Form;