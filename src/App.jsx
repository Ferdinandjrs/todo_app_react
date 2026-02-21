import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createTodo } from "./redux/asyncReducer";
import { Trash2, PlusCircle, ClipboardList } from "lucide-react";

const App = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = (error) => {
    error.preventDefault();
    if (!task.trim()) return alert("Masukkan tugas baru Anda!");
    dispatch(createTodo(task));
    setTask("");
  };

  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-200 antialiased">
      <header className="bg-[#0D0D0D] h-[200px] flex flex-col items-center justify-center relative">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🚀</span>
          <h1 className="text-4xl font-black tracking-tighter">
            <span className="text-[#4EA8DE]">to</span>
            <span className="text-[#5E60CE]">do</span>
          </h1>
        </div>

        <form onSubmit={handleAdd} className="absolute -bottom-7 w-full max-w-[736px] px-4 flex gap-2">
          <input 
            className="flex-1 p-4 rounded-lg bg-[#262626] border border-[#0D0D0D] focus:outline-none focus:ring-1 focus:ring-[#5E60CE] text-[#F2F2F2] placeholder-[#808080] transition-all"
            placeholder="Tambah tugas baru"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="bg-[#1E6F9F] hover:bg-[#4EA8DE] px-5 py-4 rounded-lg flex items-center gap-2 font-bold text-[#F2F2F2] text-sm transition-all shadow-lg">
            Tambah <PlusCircle size={18} />
          </button>
        </form>
      </header>

      <main className="max-w-[736px] mx-auto mt-20 px-4">
        <div className="flex justify-between mb-6 text-sm font-bold">
          <div className="flex items-center gap-2">
            <p className="text-[#4EA8DE]">Tugas dibuat</p>
            <span className="bg-[#333333] px-2.5 py-0.5 rounded-full text-[#D9D9D9] text-xs font-bold">
              {todos.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#5E60CE]">Selesai</p>
            <span className="bg-[#333333] px-2.5 py-0.5 rounded-full text-[#D9D9D9] text-xs font-bold">
              {todos.length === 0 ? "0" : `${doneCount} dari ${todos.length}`}
            </span>
          </div>
        </div>


        <div className="space-y-3 pb-20">
          {loading ? (
            <div className="text-center py-20 opacity-30 animate-pulse text-[#808080]">
              <p>Mengambil data dari API...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="border-t border-[#333333] rounded-t-lg py-16 flex flex-col items-center justify-center text-[#808080] text-center">
              <ClipboardList size={56} className="mb-4 opacity-20" />
              <p className="font-bold">Belum ada tugas untuk saat ini</p>
              <p>Silahkan tambah tugas pada form diatas</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div 
                key={todo.id} 
                className="flex items-start gap-3 p-4 bg-[#262626] border border-[#333333] rounded-lg shadow-sm hover:border-[#444444] transition-all"
              >
                <button 
                  onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
                  className={`mt-1 min-w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
                    todo.completed 
                    ? "bg-[#5E60CE] border-[#5E60CE] hover:bg-[#8284FA]" 
                    : "border-[#4EA8DE] hover:bg-[#4EA8DE]/10"
                  }`}
                >
                  {todo.completed && (
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                      <path d="M1 3.5L3.66667 6L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                <p className={`flex-1 text-sm leading-relaxed ${
                  todo.completed ? 'line-through text-[#808080]' : 'text-[#F2F2F2]'
                }`}>
                  {todo.title}
                </p>

                <button 
                  onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
                  className="p-1 text-[#808080] hover:text-[#E25858] hover:bg-[#333333] rounded transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;