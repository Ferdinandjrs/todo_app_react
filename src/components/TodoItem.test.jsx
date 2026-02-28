import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import "@testing-library/jest-dom";

const mockTodo = { id: 1, title: "Tugas Testing", completed: false };

describe("Komponen TodoItem", () => {
  test("Harus merender judul tugas dengan benar", () => {
    render(<TodoItem todo={mockTodo} />);
    expect(screen.getByText("Tugas Testing")).toBeInTheDocument();
  });

  test("Harus memanggil fungsi onDelete saat tombol sampah diklik", () => {
    const mockDelete = jest.fn();
    render(<TodoItem todo={mockTodo} onDelete={mockDelete} onToggle={() => {}} />);
    
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]); 
    
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});