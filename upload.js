const auth = firebase.auth();
const storage = firebase.storage();

window.onload = () => {
  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) uploadBtn.onclick = uploadFile;

  // Listar arquivos quando usuário estiver autenticado
  auth.onAuthStateChanged(user => {
    if (user) {
      listFiles(user.uid);
    }
  });
};

function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const user = auth.currentUser;
  if (!file) return alert('Selecione um arquivo.');
  if (!user) return alert('Usuário não autenticado.');

  const storageRef = storage.ref(user.uid + '/' + file.name);
  storageRef.put(file)
    .then(() => {
      alert('Arquivo enviado!');
      listFiles(user.uid);
      fileInput.value = '';
    })
    .catch(e => alert('Erro ao enviar: ' + e.message));
}

function listFiles(uid) {
  const listRef = storage.ref(uid + '/');
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = 'Carregando...';

  listRef.listAll()
    .then(res => {
      fileList.innerHTML = '';
      if (res.items.length === 0) {
        fileList.innerHTML = '<li>Nenhum arquivo enviado.</li>';
        return;
      }
      res.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(url => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = url;
          a.target = '_blank';
          a.textContent = itemRef.name;

          const delBtn = document.createElement('button');
          delBtn.textContent = 'Excluir';
          delBtn.style.marginLeft = '10px';
          delBtn.onclick = () => deleteFile(itemRef.name, uid);

          li.appendChild(a);
          li.appendChild(delBtn);
          fileList.appendChild(li);
        });
      });
    })
    .catch(e => {
      fileList.innerHTML = 'Erro ao listar arquivos: ' + e.message;
    });
}

function deleteFile(fileName, uid) {
  if (!confirm(`Deseja excluir o arquivo "${fileName}"?`)) return;
  const fileRef = storage.ref(uid + '/' + fileName);
  fileRef.delete()
    .then(() => {
      alert('Arquivo excluído!');
      listFiles(uid);
    })
    .catch(e => alert('Erro ao excluir: ' + e.message));
}
