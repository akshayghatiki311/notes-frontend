import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";

export default function Navbar({ onLogout, activeTab, setActiveTab, showTabs = true, userEmail }) {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/create/new');
  };

  const handleTabClick = (tab) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tab);
    }
    navigate('/dashboard');
  };

  const handleAppNameClick = () => {
    if (typeof setActiveTab === 'function') {
      setActiveTab('my-notes');
    }
    navigate('/dashboard');
  };

  return (
    <nav className="p-4 bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={handleAppNameClick}
          >
            ScribbleSync
          </h1>
          {showTabs && (
            <div className="flex space-x-4">
              <span
                className={`cursor-pointer py-3 px-6 font-medium transition-all duration-200 hover:bg-gray-50 
                  ${activeTab === 'my-notes' 
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-500'
                  }`}
                onClick={() => handleTabClick('my-notes')}
              >
                My Notes
              </span>
              <span
                className={`cursor-pointer py-3 px-6 font-medium transition-all duration-200 hover:bg-gray-50
                  ${activeTab === 'shared-notes' 
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' 
                    : 'text-gray-500 hover:text-blue-500'
                  }`}
                onClick={() => handleTabClick('shared-notes')}
              >
                Shared Notes
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {userEmail && <span className="text-gray-500">{userEmail}</span>}
          {showTabs && (
            <div className="flex space-x-2">
              <Button onClick={handleCreateNote}>+ Create Note</Button>
              <Button onClick={onLogout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}