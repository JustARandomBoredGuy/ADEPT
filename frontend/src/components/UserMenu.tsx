import { useState } from 'react';
// import { removeToken } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '../config/queryClient';
import { useNavigate } from 'react-router';
import { logout } from '../lib/api';
import { sidebarToggle, userMenuListItem, userMenuListItemCollapsed, userMenuListItemExpanded, userMenuListItemText } from '../styles/tailwindUtils';
import useAuth from '../lib/useAuth';

const UserMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const {
    mutate: logoutUser,
    error
  } = useMutation({
    mutationFn: logout,
    onError: () => {
      alert(error?.message || "An error occurred")
    },
    onSettled: () => {
      queryClient.clear()
      alert("Logout successful")
      navigate("/login")
    }
  })

  const { user } = useAuth();

  if (!user || user === undefined) {
    return (
      <div
        className={`transition-all duration-500 fixed top-0 left-0 z-[5000] overflow-hidden h-full flex flex-col bg-black/85 text-black ${isCollapsed ? 'w-[60px]' : 'w-[250px]'}`}>
        <button onClick={toggleSidebar} className={sidebarToggle}>
          {isCollapsed ? '>' : '<'}
        </button>
  
        <ul className="list-none p-4 m-0 w-full">
          <li className="my-4">
            <a href="/" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
              <span className="mr-2 z-[5001] ">🏠</span>
              <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                Home
              </span>
            </a>
          </li>
  
          <li className="my-4">
            <a href="/login" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
              <span className="mr-2">🔐</span>
              <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                Login or Register
              </span>
            </a>
          </li>
  
          <li className="my-4">
            <a href="/inputNotes" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
              <span className="mr-2">📊</span>
              <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                Add Notes
              </span>
            </a>
          </li>
  
          <li className="my-4">
            <a href="/roadmap" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
              <span className="mr-2">🛣️</span>
              <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                Display Roadmap
              </span>
            </a>
          </li>
  
          <li className="my-4">
            <a onClick={() => logoutUser()} className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
              <span className="mr-2">🗑️</span>
              <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
                Logout
              </span>
            </a>
          </li>
        </ul>
  
        <div className={`bg-amber-300 bottom-4.5 rounded-full fixed flex overflow-hidden w-10 h-10 z-[5001] transition-all duration-500ms ${isCollapsed ? "ml-2" : "ml-5"}`}>
          UIcon
        </div>
        <div className={`fixed flex items-center transition-all overflow-hidden rounded-2xl m-2 duration-500 h-15 bottom-0 p-2  ${isCollapsed ? "w-[48px]" : "w-[234px] bg-gray-900"}`}>
          <div className={`${isCollapsed && "hidden"} ml-4`}>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    );
  }

  console.log(typeof (user))
  // @ts-expect-error idk
  const { email, createdAt } = user

  return (
    <div
      className={`transition-all duration-500 fixed top-0 left-0 z-[5000] overflow-hidden h-full flex flex-col bg-black/85 text-black ${isCollapsed ? 'w-[60px]' : 'w-[250px]'}`}>
      <button onClick={toggleSidebar} className={sidebarToggle}>
        {isCollapsed ? '>' : '<'}
      </button>

      <ul className="list-none p-4 m-0 w-full">
        <li className="my-4">
          <a href="/" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
            <span className="mr-2 z-[5001] ">🏠</span>
            <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              Home
            </span>
          </a>
        </li>

        <li className="my-4">
          <a href="/login" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
            <span className="mr-2">🔐</span>
            <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              Login or Register
            </span>
          </a>
        </li>

        <li className="my-4">
          <a href="/inputNotes" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
            <span className="mr-2">📊</span>
            <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              Add Notes
            </span>
          </a>
        </li>

        <li className="my-4">
          <a href="/roadmap" className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
            <span className="mr-2">🛣️</span>
            <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              Display Roadmap
            </span>
          </a>
        </li>

        <li className="my-4">
          <a onClick={() => logoutUser()} className={`${userMenuListItem} ${isCollapsed ? userMenuListItemCollapsed : userMenuListItemExpanded}`}>
            <span className="mr-2">🗑️</span>
            <span className={`${userMenuListItemText} ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              Logout
            </span>
          </a>
        </li>
      </ul>

      <div className={`bg-amber-300 bottom-4.5 rounded-full fixed flex overflow-hidden w-10 h-10 z-[5001] transition-all duration-500ms ${isCollapsed ? "ml-2" : "ml-5"}`}>
        UIcon
      </div>
      <div className={`fixed flex items-center transition-all overflow-hidden rounded-2xl m-2 duration-500 h-15 bottom-0 p-2  ${isCollapsed ? "w-[48px]" : "w-[234px] bg-gray-900"}`}>
        <div className={`${isCollapsed && "hidden"} ml-4`}>
          <ul>
            <li className={`text-white m-0 ml-10`}>
              {email}
            </li>
            <li className={`text-gray-400 text-sm m-0 ml-10`}>
              {new Date(createdAt).toLocaleDateString('en-IN')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
