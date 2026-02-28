import React from "react";
import { Trash2 } from "lucide-react";

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#262626] border border-[#333333] rounded-lg shadow-sm hover:border-[#444444] transition-all">
      <button 
        onClick={() => onToggle(todo.id)}
        className={`mt-1 min-w-[18px] h-[18px] rounded-full border-2 transition-all flex items-center justify-center ${
          todo.completed ? "bg-[#5E60CE] border-[#5E60CE]" : "border-[#4EA8DE]"
        }`}
      >
        {todo.completed && (
          <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
            <path d="M1 3.5L3.66667 6L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <p className={`flex-1 text-sm leading-relaxed ${todo.completed ? 'line-through text-[#808080]' : 'text-[#F2F2F2]'}`}>
        {todo.title}
      </p>

      <button 
        onClick={() => onDelete(todo.id)}
        className="p-1 text-[#808080] hover:text-[#E25858] rounded transition-all"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
});

export default TodoItem;