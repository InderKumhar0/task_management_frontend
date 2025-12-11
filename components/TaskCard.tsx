'use client';

import { Pencil } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { deleteTask } from '@/store/task/taskAction';
import { Task } from '@/app/(protected)/home/page';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{task.description}</p>

      <div className="flex justify-between items-center mt-3 text-sm">
        <span className="px-2 py-1 bg-gray-100 rounded">
          Priority: {task.priority}
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded">{task.status}</span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <Pencil size={16} /> Edit
        </button>

        <button
          onClick={() => dispatch(deleteTask(task.id!))}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
