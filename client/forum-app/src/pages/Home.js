import React, { useEffect, useState } from "react";
import Navbar from "../components/Shared/Navbar";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Likes from "../components/Shared/Likes";
import Comments from "../components/Shared/Comments";

const Home = () => {
  const [thread, setThread] = useState("");
  const navigate = useNavigate();
  const [threadList, setThreadList] = useState([]);

  const createThread = () => {
    fetch("http://localhost:4000/api/create/thread", {
      method: "POST",
      body: JSON.stringify({
        thread,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setThreadList(data.threads);
        console.log(data.message);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    createThread();
    setThread("");
  };

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    } else {
      console.log("Authenticated");
      fetch("http://localhost:4000/api/all/threads")
        .then((res) => res.json())
        .then((data) => setThreadList(data.threads))
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="home">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          <div className="home__container">
            <label htmlFor="thread">Title / Description</label>
            <input
              type="text"
              name="thread"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <button className="homeBtn">CREATE THREAD</button>
        </form>
        <div className="thread__container">
          {threadList.map((thread) => (
            <div className="thread__item" key={thread.id}>
              <p>{thread.title}</p>
              <div className="react__container">
                <Likes
                  numberOfLikes={thread.likes.length}
                  threadId={thread.id}
                />
                <Comments
                  numberOfComments={thread.replies.length}
                  threadId={thread.id}
                  title={thread.title}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
