import React, { useEffect, useState, useCallback, useMemo, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createTodo } from "./redux/asyncReducer";
import { PlusCircle, ClipboardList, Search, Moon, Sun } from "lucide-react";

const TodoItem = React.lazy(() => import("./components/TodoItem"));

const App = () => {
  const [task, setTask] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

 
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  const doneCount = useMemo(() => {
    return todos.filter((t) => t.completed).length;
  }, [todos]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!task.trim()) return alert("Masukkan tugas baru!");
    dispatch(createTodo(task));
    setTask("");
  };

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  }, [dispatch]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#1A1A1A] text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      
   
      <header className={`${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-white shadow-sm'} h-[200px] flex flex-col items-center justify-center relative`}>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-700/20 transition-all"
        >
          {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
        </button>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">🚀</span>
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="text-[#4EA8DE]">to</span>
            <span className="text-[#5E60CE]">do</span>
          </h1>
        </div>

       
        <form onSubmit={handleAdd} className="absolute -bottom-7 w-full max-w-[736px] px-4 flex gap-2">
          <input 
            className={`flex-1 p-4 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#5E60CE] transition-all ${
              isDarkMode ? 'bg-[#262626] border-[#0D0D0D] text-white placeholder-[#808080]' : 'bg-white border-gray-300 text-black'
            }`}
            placeholder="Tambah tugas baru"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="bg-[#1E6F9F] hover:bg-[#4EA8DE] px-5 py-4 rounded-lg flex items-center gap-2 font-bold text-white text-sm transition-all shadow-lg">
            Buat <PlusCircle size={18} />
          </button>
        </form>
      </header>

      <main className="max-w-[736px] mx-auto mt-20 px-4">
        
      
        {/* <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080]" size={18} />
          <input 
            type="text"
            placeholder="Cari tugas Anda..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${
              isDarkMode ? 'bg-[#262626] border-[#333333] text-white' : 'bg-white border-gray-200 text-black'
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

       
        <div className="flex justify-between mb-6 text-sm font-bold">
          <div className="flex items-center gap-2">
            <p className="text-[#4EA8DE]">Tugas dibuat</p>
            <span className="bg-[#333333] px-2.5 py-0.5 rounded-full text-[#D9D9D9] text-xs font-bold">{todos.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#5E60CE]">Selesai</p>
            <span className="bg-[#333333] px-2.5 py-0.5 rounded-full text-[#D9D9D9] text-xs font-bold">
              {todos.length === 0 ? "0" : `${doneCount} dari ${todos.length}`}
            </span>
          </div>
        </div>

        {/* TODO LIST */}
        <div className="space-y-3 pb-20">
          <Suspense fallback={<div className="text-center py-10 animate-pulse text-[#808080]">Loading...</div>}>
            {loading ? (
              <p className="text-center py-20 opacity-30">Mengambil data...</p>
            ) : filteredTodos.length === 0 ? (
              <div className="border-t border-[#333333] rounded-t-lg py-16 flex flex-col items-center justify-center text-[#808080] text-center">
                <ClipboardList size={56} className="mb-4 opacity-20" />
                <p className="font-bold">Belum ada tugas atau pencarian tidak ditemukan</p>
                <p>Silahkan cek kembali atau tambah tugas baru</p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={handleToggle} 
                  onDelete={handleDelete} 
                />
              ))
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default App;