import { useState } from 'react';
import { removeToken } from '../lib/api';

const UserMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const removeHandler = () => {
    removeToken()
      .then(() => {
        alert("Token Removed");
      })
      .catch((error) => {
        alert("Error removing token:" + error.message);
      });
  };

  return (
    <div
      className={`transition-all duration-500 fixed top-0 left-0 z-[5000] h-full flex flex-col bg-gray-200 text-black ${
        isCollapsed ? 'w-[60px]' : 'w-[200px]'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="border-none bg-inherit text-accent2 text-base cursor-pointer w-full h-10 mb-4 self-center hover:bg-gray-400 hover:text-white transition-transform duration-300"
      >
        {isCollapsed ? '>' : '<'}
      </button>

      <ul className="list-none p-4 m-0 w-full">
        <li className="my-4">
          <a
            href="/"
            className={`flex items-center text-black  rounded-2xl no-underline text-base px-4 py-2 transition-all duration-300 hover:underline ${
              isCollapsed ? 'justify-center p-2' : 'justify-start hover:bg-yellow-300'
            }`}
          >
            <span className="mr-2">🏠</span>
            {!isCollapsed && 'Home'}
          </a>
        </li>
        <li className="my-4">
          <a
            href="/login"
            className={`rounded-2xl flex items-center text-black no-underline text-base px-4 py-2 transition-all duration-300 hover:underline ${
              isCollapsed ? 'justify-center p-2' : 'justify-start hover:bg-yellow-300'
            }`}
          >
            <span className="mr-2">🔐</span>
            {!isCollapsed && 'Login or Register'}
          </a>
        </li>
        <li className="my-4">
          <a
            href="/inputNotes"
            className={`flex rounded-2xl items-center text-black no-underline text-base px-4 py-2 transition-all duration-300 hover:underline ${
              isCollapsed ? 'justify-center p-2' : 'justify-start hover:bg-yellow-300'
            }`}
          >
            <span className="mr-2">📊</span>
            {!isCollapsed && 'Add Notes'}
          </a>
        </li>
        <li className="my-4">
          <a
            href="/roadmap"
            className={`flex rounded-2xl items-center text-black no-underline text-base px-4 py-2 transition-all duration-300 hover:underline ${
              isCollapsed ? 'justify-center p-2' : 'justify-start hover:bg-yellow-300'
            }`}
          >
            <span className="mr-2">🛣️</span>
            {!isCollapsed && 'Display Roadmap'}
          </a>
        </li>
        <li className="my-4">
          <a
            onClick={removeHandler}
            className={`flex rounded-2xl items-center text-black no-underline text-base px-4 py-2 transition-all duration-300 hover:underline cursor-pointer ${
              isCollapsed ? 'justify-center p-2' : 'justify-start hover:bg-yellow-300'
            }`}
          >
            <span className="mr-2">🗑️</span>
            {!isCollapsed && 'Delete GAuth'}
          </a>
        </li>
      </ul>
      
    </div>
  );
};

export default UserMenu;
