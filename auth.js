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
  if (!email || !password) {
    alert('Preencha email e senha.');
    return;
  }

  console.log('Tentando login com', email);
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Login bem-sucedido');
      window.location.href = 'upload.html';
    })
    .catch(e => {
      console.error('Erro no login:', e);
      alert('Erro ao entrar: ' + e.message);
    });
}

function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (!email || !password) {
    alert('Preencha email e senha.');
    return;
  }

  console.log('Tentando cadastrar com', email);
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Cadastro bem-sucedido');
      alert('Cadastro realizado! Faça login.');
    })
    .catch(e => {
      console.error('Erro no cadastro:', e);
      alert('Erro no cadastro: ' + e.message);
    });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'index.html';
  });
}
