import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Articles from "./Articles";
import LoginForm from "./LoginForm";
import Message from "./Message";
import ArticleForm from "./ArticleForm";
import Spinner from "./Spinner";
import axios from "axios";

const articlesUrl = "http://localhost:9000/api/articles";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState();
  const [spinnerOn, setSpinnerOn] = useState(false);

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => {
    /* ✨ implement */
    navigate("/");
  };
  const redirectToArticles = () => {
    /* ✨ implement */
    navigate("/articles");
  };

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem("token");
    redirectToLogin();
  };

  const login = async ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage("");
    setSpinnerOn(true);
    try {
      const response = await axios.post(loginUrl, { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage(response.data.message);
      redirectToArticles();
    } catch (err) {
      setMessage(`Login failed: ${err.response.data.message}`);
    } finally {
      setSpinnerOn(false);
    }
  };

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    setMessage("");
    setSpinnerOn(true);

    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      const fetchArticles = async () => {
        try {
          const response = await axios.get(articlesUrl, {
            headers: { Authorization: token },
          });
          setArticles(response.data);
        } catch (error) {
          if (error?.response?.status === 401) logout();
        }
      };
      fetchArticles();
    }
  };

  const postArticle = (article) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      const postArticle = async () => {
        try {
          const response = await axios.post(articlesUrl, article, {
            headers: { Authorization: token },
          });
          setArticles([...articles, response.data]);
          setMessage(response.data.message);
        } catch (error) {
          if (error?.response?.status == 401) logout();
        }
      };
      postArticle();
    }
  };

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      const putArticle = async () => {
        try {
          const response = await axios.put(
            `${articlesUrl}/${article_id}`,
            article,
            { headers: { Authorization: token } }
          );
          setArticles([...articles, response.data]);
          setMessage(response.data.message);
        } catch (error) {
          if (error?.response?.status == 401) logout();
        }
      };
      putArticle();
    }
  }
    const deleteArticle = (article_id) => {
      // ✨ implement
    const token = localStorage.getItem("token");
    if (!token) {
      redirectToLogin();
    } else {
      const delArticle = async () => {
        try {
          const response = await axios.delete(
            `${articlesUrl}/${article_id}`,
            { headers: { Authorization: token } }
          );
          setArticles(articles.filter(a => a.article_id !== article_id));
          setMessage(response.data.message);
        } catch (error) {
          if (error?.response?.status == 401) logout();
        }
      };
      delArticle();
    }
    }

    return (
      // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
      <>
        <Spinner on={spinnerOn} />
        <Message message={message} />
        <button id="logout" onClick={logout}>
          Logout from app
        </button>
        <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
          {" "}
          {/* <-- do not change this line */}
          <h1>Advanced Web Applications</h1>
          <nav>
            <NavLink id="loginScreen" to="/">
              Login
            </NavLink>
            <NavLink id="articlesScreen" to="/articles">
              Articles
            </NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<LoginForm login={login} />} />
            <Route
              path="articles"
              element={
                <>
                  <ArticleForm
                    postArticle={postArticle}
                    updateArticle={updateArticle}
                    setCurrentArticleId={setCurrentArticleId}
                    articles={articles}
                  />
                  <Articles
                    articles={articles}
                    setCurrentArticleId={setCurrentArticleId}
                    deleteArticle={deleteArticle}
                    getArticles={getArticles}
                  />
                </>
              }
            />
          </Routes>
          <footer>Bloom Institute of Technology 2024</footer>
        </div>
      </>
    );
  }
