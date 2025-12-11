'use client';

import { useEffect, useState } from 'react';
import NavBar from '@/components/Navbar';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createTask, getAllTasks, updateTask } from '@/store/task/taskAction';

export interface Task {
  id: number | undefined;
  title: string;
  description: string;
  priority: string;
  status: string;
}

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.task);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null as number | null,
    title: '',
    description: '',
    priority: 'LOW',
    status: 'PENDING',
  });

  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllTasks());
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = async () => {
    if (formData.id) {
      await dispatch(updateTask(formData));
    } else {
      await dispatch(createTask(formData));
    }

    setShowForm(false);
    setFormData({
      id: null,
      title: '',
      description: '',
      priority: 'LOW',
      status: 'PENDING',
    });
  };

  const filteredTasks = tasks?.filter((task) =>
    statusFilter ? task.status.toUpperCase() === statusFilter : true
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <>{isAuthenticated}</>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded w-60 text-center"
          >
            <option value="">Filter by Status</option>
            <option value="PENDING">Pending</option>
            <option value="INPROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-gray-500 text-center col-span-full">
              Loading...
            </p>
          ) : filteredTasks?.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No tasks yet
            </p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(t) => {
                  setFormData(t);
                  setShowForm(true);
                }}
              />
            ))
          )}
        </div>
      </div>

      {showForm && (
        <TaskForm
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
