import axios from "axios";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
    dispatch({ type: "FETCH_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "FETCH_ERROR", payload: err.message });
  }
};

export const createTodo = (title) => async (dispatch) => {
  const newTodo = {
    id: Date.now(),
    title: title,
    completed: false,
  };
  dispatch({ type: "ADD_TODO", payload: newTodo });
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_START": return { ...state, loading: true };
    case "FETCH_SUCCESS": return { ...state, loading: false, todos: action.payload };
    case "FETCH_ERROR": return { ...state, loading: false, error: action.payload };
    case "ADD_TODO": return { ...state, todos: [action.payload, ...state.todos] };
    case "DELETE_TODO": return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case "TOGGLE_TODO": return {
      ...state,
      todos: state.todos.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)
    };
    default: return state;
  }
};

export default todoReducer;