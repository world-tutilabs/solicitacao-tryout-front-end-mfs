describe('Acessar Sistema de Usuário e realizar Login', () => {
  it('Acessar Sistema de Usuário', () => {
    const token = "Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOiIzODMxIiwiaWF0IjoxNjkxNDk0Mjg5LCJleHAiOjE2OTE1MjMwODksInN1YiI6ImM3NTA5YTkxLWVmY2UtNGQ2MS1hOGE5LWIzNmVhNDQyNGEzYSJ9.yx6THRfaRpyJx0o_NXgFiTbRxHXOj7HxRzaU7-Jh0g8";

    cy.visit("http://192.168.0.240:8500/");
    cy.setCookie("auth._token.local", token);

    cy.get('nav > :nth-child(1) > h3').should('contain', 'Solicitação de TryOut')
  })


})