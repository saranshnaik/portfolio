"use client";

import { useState } from "react";
import ProjectsManager from "./ProjectsManager";
import ExperiencesManager from "./ExperiencesManager";
import ProfileEditor from "./ProfileEditor";
import SocialLinksManager from "./SocialLinksManager";

type Tab = "projects" | "experiences" | "profile" | "social";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectsManager />;
      case "experiences":
        return <ExperiencesManager />;
      case "profile":
        return <ProfileEditor />;
      case "social":
        return <SocialLinksManager />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Portfolio Admin</h1>
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex flex-col md:flex-row gap-8">
        <nav className="w-full md:w-64 flex-shrink-0">
          <div className="flex flex-col space-y-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {[
              { id: "projects", label: "Projects" },
              { id: "experiences", label: "Experiences" },
              { id: "profile", label: "Profile" },
              { id: "social", label: "Social Links" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[500px]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
