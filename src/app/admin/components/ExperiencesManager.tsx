"use client";

import { useState, useEffect } from "react";

export default function ExperiencesManager() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    companyUrl: "",
    duration: "",
    description: "",
    techStack: "",
    displayIndex: 0,
  });

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/experiences");
      if (res.ok) {
        const data = await res.json();
        setExperiences(data.sort((a: any, b: any) => a.displayIndex - b.displayIndex));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (exp: any) => {
    setFormData({
      role: exp.role || "",
      company: exp.company || "",
      companyUrl: exp.companyUrl || "",
      duration: exp.duration || "",
      description: exp.description || "",
      techStack: Array.isArray(exp.techStack) ? exp.techStack.join(", ") : (exp.techStack || ""),
      displayIndex: exp.displayIndex || 0,
    });
    setEditingId(exp.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      fetchExperiences();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: formData.techStack.split(",").map((t: string) => t.trim()).filter(Boolean),
      displayIndex: Number(formData.displayIndex),
    };

    const url = editingId ? `/api/experiences/${editingId}` : "/api/experiences";
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
        role: "", company: "", companyUrl: "", duration: "", description: "", techStack: "", displayIndex: 0
      });
      fetchExperiences();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading experiences...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Experiences</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              role: "", company: "", companyUrl: "", duration: "", description: "", techStack: "", displayIndex: experiences.length
            });
            setIsFormOpen(!isFormOpen);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          {isFormOpen ? "Cancel" : "Add New Experience"}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input required type="text" name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input required type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input required type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="e.g. Jan 2023 - Present" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company URL</label>
              <input type="text" name="companyUrl" value={formData.companyUrl} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
              <input required type="text" name="techStack" value={formData.techStack} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Index</label>
              <input required type="number" name="displayIndex" value={formData.displayIndex} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              {editingId ? "Update Experience" : "Save Experience"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idx</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {experiences.map((exp) => (
              <tr key={exp.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.displayIndex}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exp.role} at {exp.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exp.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(exp.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No experiences found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
