import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

export default function Navbar({ onLogout, activeTab, setActiveTab, showTabs = true, userEmail }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tab) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tab);
    }
    setIsOpen(false);
    navigate('/dashboard');
  };

  const handleAppNameClick = () => {
    if (typeof setActiveTab === 'function') {
      setActiveTab('my-notes');
    }
    navigate('/dashboard');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handlePortfolioClick = () => {
    navigate('/portfolio');
  };

  const handleTextAlterClick = () => {
    navigate('/text-alter');
  };

  return (
    <nav className="p-4 bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={handleAppNameClick}
          >
            ScribbleSync
          </h1>
          {userEmail && (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="flex items-center space-x-1 px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md">
                <span>Notes</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-50 border border-gray-200">
                <DropdownMenuItem 
                  onClick={() => handleTabClick('my-notes')}
                  className={`${activeTab === 'my-notes' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  My Notes
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleTabClick('shared-notes')}
                  className={`${activeTab === 'shared-notes' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Shared Notes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <button
            onClick={handleAboutClick}
            className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md"
          >
            About
          </button>
          <button
            onClick={handlePortfolioClick}
            className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md"
          >
            Portfolio
          </button>
          <button
            onClick={handleTextAlterClick}
            className="px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md"
          >
            TextAlter
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {userEmail && (
            <>
              <span className="text-gray-500">{userEmail}</span>
              <Button onClick={onLogout}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}