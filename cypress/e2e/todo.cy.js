describe('Todo App E2E Test', () => {
  it('Harus bisa menambah tugas dan menghapusnya', () => {
    // buka web
    cy.visit('http://localhost:5173'); 

    // Tambah Tugas Baru
    const taskName = 'Tugas Akhir React';
    cy.get('input[placeholder="Tambah tugas baru"]').type(taskName);
    cy.get('form button').click(); 
    cy.contains(taskName).should('be.visible');

    // tes Hapus Tugas
    cy.get('button').last().click();
    cy.contains(taskName).should('not.exist');
  });
});