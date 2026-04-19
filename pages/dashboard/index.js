import { useAuth } from '../../context/AuthContext';
import { useAppSettings } from '../../context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, fontSize } = useAppSettings();
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>  
      <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 flex justify-between items-center`}>  
        <h1 className="text-3xl font-bold">Математика 4</h1>  
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-xl"> Шығу </button>  
      </nav>  
      <div className="max-w-6xl mx-auto p-8">  
        <h2 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}> Құтты келдіңіз, {user.email}! </h2>  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">  
          <Link href="/lessons">  
            <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-8 rounded-lg text-center text-2xl transition transform hover:scale-105"> 📚 Сабақтар </a>  
          </Link>  
          <Link href="/games">  
            <a className="bg-green-500 hover:bg-green-600 text-white font-bold p-8 rounded-lg text-center text-2xl transition transform hover:scale-105"> 🎮 Ойындар </a>  
          </Link>  
          <Link href="/progress">  
            <a className="bg-amber-500 hover:bg-amber-600 text-white font-bold p-8 rounded-lg text-center text-2xl transition transform hover:scale-105"> 📊 Прогресс </a>  
          </Link>  
        </div>  
        {user.role === 'parent' && (  
          <div className="mt-12 p-8 bg-purple-100 rounded-lg">  
            <h3 className="text-2xl font-bold mb-4">👨‍👩‍👧 Ата-ана режимі</h3>  
            <Link href="/parent-dashboard">  
              <a className="text-blue-600 font-bold hover:underline text-lg">Баланың прогресін қарау →</a>  
            </Link>  
          </div>  
        )}  
        {user.role === 'teacher' && (  
          <div className="mt-12 p-8 bg-indigo-100 rounded-lg">  
            <h3 className="text-2xl font-bold mb-4">🧑‍🏫 Мұғалім режимі</h3>  
            <Link href="/teacher-dashboard">  
              <a className="text-blue-600 font-bold hover:underline text-lg">Сабақ құру →</a>  
            </Link>  
          </div>  
        )}  
      </div>  
    </div>
  );
}