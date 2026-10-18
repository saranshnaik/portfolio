"use client";

import { useState, useEffect } from "react";

export default function SocialLinksManager() {
  const [links, setLinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    platform: "",
    label: "",
    url: "",
    icon: "github",
    displayIndex: 0,
  });

  const fetchLinks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/social-links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data.sort((a: any, b: any) => a.displayIndex - b.displayIndex));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (link: any) => {
    setFormData({
      platform: link.platform || "",
      label: link.label || "",
      url: link.url || "",
      icon: link.icon || "github",
      displayIndex: link.displayIndex || 0,
    });
    setEditingId(link.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;
    try {
      await fetch(`/api/social-links/${id}`, { method: "DELETE" });
      fetchLinks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      displayIndex: Number(formData.displayIndex),
    };

    const url = editingId ? `/api/social-links/${editingId}` : "/api/social-links";
    const method = editingId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({
        platform: "", label: "", url: "", icon: "github", displayIndex: 0
      });
      fetchLinks();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading social links...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Social Links</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              platform: "", label: "", url: "", icon: "github", displayIndex: links.length
            });
            setIsFormOpen(!isFormOpen);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          {isFormOpen ? "Cancel" : "Add New Link"}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
              <input required type="text" name="platform" value={formData.platform} onChange={handleInputChange} placeholder="e.g. GitHub" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input required type="text" name="label" value={formData.label} onChange={handleInputChange} placeholder="e.g. @username" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
              <input required type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <select name="icon" value={formData.icon} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter / X</option>
                <option value="email">Email</option>
                <option value="website">Website</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Index</label>
              <input required type="number" name="displayIndex" value={formData.displayIndex} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              {editingId ? "Update Link" : "Save Link"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idx</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{link.displayIndex}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{link.platform}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{link.url}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(link)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(link.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {links.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No social links found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
