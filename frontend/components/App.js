import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import axiosWithAuth from '../axios/index'
import PrivateRoutes from '../utils/privateRoute'
const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'





export default function App() {

  const initialFormValues = { title: '', text: '', topic: '' }

  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState("")
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [articleFormValues, setArticleFormValues] = useState(initialFormValues)
  const [editMode, setEditMode] = useState(false)


  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => { /* ✨ implement */ }
  const redirectToArticles = () => { /* ✨ implement */ }

  const logout = () => {
      
      console.log("logout ran") 
      setMessage("Goodbye!")
      navigate("/")
    // ✨ implement
    // If a token is in local storage it should be removed,
      const token = localStorage.getItem('token')
      if(token){
        localStorage.clear(token);
        console.log("cleared local storage")
      }
  
      
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = ({ username, password }) => {

    // ✨ implement
    // We should flush the message state, turn on the spinner
      setMessage("")
      setSpinnerOn(true)
     
    // and launch a request to the proper endpoint.
    axios.post("http://localhost:9000/api/login",{username: username,password: password})
    .then(res=>{
         // On success, we should set the token to local storage in a 'token' key,
      localStorage.setItem('token', res.data.token)
    
      setMessage(res.data.message)
      navigate("./articles")
      setSpinnerOn(false)
    }).catch(err=>{
      console.log(err)
      setSpinnerOn(false)
      navigate("./")
    })
   
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
  }

  const getArticles = () => {
        setMessage("");
        setSpinnerOn(true)
    // ✨ implement
    // We should flush the message state, turn on the spinneR
    // and launch an authenticated request to the proper endpoint.
        axiosWithAuth().get("http://localhost:9000/api/articles").
        then(res=>{
         setArticles(res.data.articles)
         setMessage(res.data.message)
         setSpinnerOn(false)
        }).catch(err =>{
          setMessage("Ouch: jwt expired")
          navigate("/")
          setSpinnerOn(false)
  })
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }



  const postArticle = article => {
    axiosWithAuth().post("http://localhost:9000/api/articles", article).
    then(res=>{
 
      setArticles([...articles, res.data.article])
      setArticleFormValues(initialFormValues)
      setMessage('Here are your articles, Foo!')
    
    }).catch(err =>{
     
     console.log(err)
     
})

    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = (article_id, article ) => {
    

   
    
    console.log(article_id)
    axiosWithAuth().put(`http://localhost:9000/api/articles/${article_id}`, article)
    .then(res=>{
      const updatedArticles = articles.map(art=>{
       
        if(art.article_id === +article_id) {
          return res.data.article
        } else {
          return art
        }
      })
     
      setArticles(updatedArticles)
      setArticleFormValues(initialFormValues)
      setMessage("Nice update, Foo!")
    }).catch(
      err=>{
        console.log(err)
      }
    )
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
      axiosWithAuth().delete(`http://localhost:9000/api/articles/${article_id}`)
      .then(res=>{
        console.log(article_id)
        console.log(res.data)
        const articles1 = articles.filter(x=>{
          console.log(x)
          return x.article_id !== +article_id;
        })

        console.log(articles1)
        setArticles(articles1)
       

      }).catch(err=>{
        console.log(err)
      })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
     {spinnerOn ? <Spinner /> : ""}
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route element={<PrivateRoutes/>}>
              <Route path='/articles'element={
            <>
              <ArticleForm setEditMode={setEditMode} editMode={editMode}  currentArticleId={currentArticleId} setCurrentArticleId={setCurrentArticleId} updateArticle={updateArticle}  setArticleFormValues={setArticleFormValues} articleFormValues={articleFormValues} postArticle={postArticle} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
              <Articles setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} setEditMode={setEditMode} setArticleFormValues={setArticleFormValues} articleFormValues={articleFormValues} updateArticle={updateArticle} articles={articles} getArticles={getArticles} deleteArticle={deleteArticle}  />
            </>
          } />
             
          </Route>




          
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
