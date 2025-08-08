const auth = firebase.auth();

window.onload = () => {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (loginBtn) loginBtn.onclick = login;
  if (registerBtn) registerBtn.onclick = register;
  if (logoutBtn) logoutBtn.onclick = logout;

  // Protege upload.html
  if (window.location.pathname.endsWith('upload.html')) {
    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = 'index.html';
      }
    });
  }
};

function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) return alert('Preencha email e senha.');

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'upload.html';
    })
    .catch(e => alert('Erro ao entrar: ' + e.message));
}

function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) return alert('Preencha email e senha.');

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert('Cadastro realizado! Faça login.'))
    .catch(e => alert('Erro no cadastro: ' + e.message));
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}
