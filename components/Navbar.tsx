import { AppDispatch } from '@/store/store';
import { logoutUser } from '@/store/user/userAction';
import { clearUser } from '@/store/user/userSlice';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    localStorage.removeItem('token');
    dispatch(clearUser());
    router.push('login');
  };

  return (
    <nav className="w-full bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Task Dashboard</h1>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Inder Kumhar</span>
        </div>

        {open && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl p-2"
            onClick={handleLogout}
          >
            <button className="flex items-center w-full gap-2 p-2 rounded-lg hover:bg-gray-100">
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
