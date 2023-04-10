import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConnection';
import { doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from 'firebase/auth';

import './app.css'


function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});


  useEffect(() => {
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            título: doc.data().título,
            autor: doc.data().autor,
          })
        })

        setPosts(listaPost);
      })
    }

    loadPosts();
  }, [])


  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        }else{
          setUser(false);
          setUserDetail({});
        }
      })
    }
    checkLogin();
  }, [])


  async function handleAdd(){
    /*await setDoc(doc(db, "posts", "12345"), {
      título: titulo,
      autor: autor,
    })
    .then(() =>{
      console.log("Dados registrados no banco!");
    })
    .catch((error) =>{
      console.log("Gerou erro" +error);
    })*/

  await addDoc(collection(db, "posts"), {
    título: titulo,
    autor: autor,
  })
  .then(() =>{
    console.log("Cadastrado com sucesso!");
    setAutor('');
    setTitulo('');
  })
  .catch((error) =>{
    console.log("Erro" +error);
  })
}

async function buscarPost(){
  // const postRef = doc(db, "posts", "12345")

  // await getDoc(postRef)
  // .then((snapshot) =>{
    // setAutor(snapshot.data().autor)
    // setTitulo(snapshot.data().título)
  // })
  // .catch(() =>{
    // console.log("ERRO")
  // })

  const postRef = collection(db, "posts")
  await getDocs(postRef)
  .then((snapshot) => {
    let lista = [];

    snapshot.forEach((doc) =>{
      lista.push({
        id: doc.id,
        título: doc.data().título,
        autor: doc.data().autor,
      })
    })

    setPosts(lista);

  })
  .catch((error) => {
    console.log("Deu erro ao buscar")
  })
}

async function editarPost(){
  const docRef = doc(db, "posts", idPost)
  await updateDoc(docRef, {
    título: titulo,
    autor: autor
  })
  .then(() => {
    console.log("Post atualizado")
    setIdPost('')
    setTitulo('')
    setAutor('')
  })
  .catch((error) => {
    console.log(error)
  })

}


  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(() =>{
      alert("Deletado")
    })
    .catch((error) =>{
      alert(error)
    })

  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("Cadastrado com sucesso")
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert("Senha fraca")
      }else if(error.code === 'auth/email-already-in-use'){
        alert('Email já cadastrado')
      }
      setEmail('')
      setSenha('')
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("Logado com sucesso")
      console.log(value.user)

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);
      
      setEmail('')
      setSenha('')
    })
    .catch(() => {
      console.log("erro ao logar")
      setEmail('')
      setSenha('')
    })
  }

  async function fazerLogout(){
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }





  return(
    <div>
      <h1>ReactJS + Firebase :)</h1>

      { user && (
        <div>
          <strong>Seja bem vindo(a) (Você está logado!)</strong> <br />
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br /> <br />
          <button onClick={fazerLogout}>Sair</button>
          <br /> <br />
        </div>
      ) }

    <div className='container'>
      <h2>Usuários</h2>
      
      <label>Email</label>
      <input
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       placeholder="Digite email..."
      /> <br />

      <label>Senha</label>
      <input
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      placeholder="Digite senha..."
      /> <br />

      <button onClick={novoUsuario}>Cadastrar</button> <br />
      <button onClick={logarUsuario}>Entrar</button>

    </div>

    <br /> 
    <hr />
    <br />

    <div className="container">
      <h2>Posts</h2>

      <label>ID do Post:</label>
      <input
        type='text'
        placeholder='Digite o ID do Post'
        value={idPost}
        onChange={(e) =>setIdPost(e.target.value)}
      /> <br />

      <label>Título:</label>
      <textarea 
        type='text'
        placeholder='Digite o título...'
        value={titulo}
        onChange={ (e) => setTitulo(e.target.value)}
      /> <br />

      <label>Autor:</label>
      <input
        type="text"
        placeholder='Digite o autor...'
        value={autor}
        onChange={ (e) => setAutor(e.target.value)}
      /> <br />

      <button onClick={handleAdd}>Cadastrar</button> <br />
      <button onClick={buscarPost}>Pesquisar Posts</button> <br />
      <button onClick={editarPost} >Atualizar Post</button>

      <ul>
        {posts.map((post) => {
          return(
            <li key={post.id}>
              <strong>ID: {post.id} </strong> <br />
              <span>Título: {post.título} </span> <br />
              <span>Autor: {post.autor} </span> <br />
              <button onClick={() => excluirPost(post.id)}>Excluir</button> <br /> <br />
            </li>
          )
        })}
      </ul>

    </div>


    </div>
  );
}

export default App;