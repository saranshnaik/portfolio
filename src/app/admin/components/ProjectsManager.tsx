"use client";

import { useState, useEffect } from "react";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    displayIndex: 0,
    featured: false,
  });

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.sort((a: any, b: any) => a.displayIndex - b.displayIndex));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === "title" && !editingId) {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title || "",
      slug: project.slug || "",
      tagline: project.tagline || "",
      description: project.description || "",
      techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : (project.techStack || ""),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      displayIndex: project.displayIndex || 0,
      featured: project.featured || false,
    });
    setEditingId(project.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
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

    const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
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
        title: "", slug: "", tagline: "", description: "", techStack: "",
        liveUrl: "", githubUrl: "", imageUrl: "", displayIndex: 0, featured: false,
      });
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading projects...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Projects</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: "", slug: "", tagline: "", description: "", techStack: "",
              liveUrl: "", githubUrl: "", imageUrl: "", displayIndex: projects.length, featured: false,
            });
            setIsFormOpen(!isFormOpen);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          {isFormOpen ? "Cancel" : "Add New Project"}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input required type="text" name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
              <input type="text" name="liveUrl" value={formData.liveUrl} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Index</label>
              <input required type="number" name="displayIndex" value={formData.displayIndex} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">Featured Project</label>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              {editingId ? "Update Project" : "Save Project"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idx</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.displayIndex}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.featured ? "Featured" : ""}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
