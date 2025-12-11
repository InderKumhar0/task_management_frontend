'use client';

import { Task } from '@/app/(protected)/home/page';

interface TaskFormProps {
  formData: Task;
  setFormData: (data: Task) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function TaskForm({
  formData,
  setFormData,
  onClose,
  onSubmit,
}: TaskFormProps) {
  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl">
        <h2 className="text-lg font-semibold mb-3">
          {formData.id ? 'Edit Task' : 'Add New Task'}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border p-2 rounded mb-3"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded mb-3"
        ></textarea>

        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="w-full border p-2 rounded mb-3"
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border p-2 rounded mb-3"
        >
          <option>PENDING</option>
          <option>INPROGRESS</option>
          <option>COMPLETED</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
