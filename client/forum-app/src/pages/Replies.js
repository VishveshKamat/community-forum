import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Replies = () => {
  const [replyList, setReplyList] = useState([]);
  const [reply, setReply] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    setReply("");
  };

  useEffect(() => {
    const fetchReplies = () => {
      fetch("http://localhost:4000/api/thread/replies", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReplyList(data.replies);
          setTitle(data.title);
        })
        .catch((err) => console.error(err));
    };
    fetchReplies();
  }, [id]);

  return (
    <main className="replies">
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          rows={5}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          type="text"
          name="reply"
          className="modalInput"
        />

        <button className="modalBtn" type="submit">
          SEND
        </button>
      </form>
      <div className="thread__container">
        {replyList.map((reply) => (
          <div className="thread__item">
            <p>{reply.text}</p>
            <div className="react__container">
              <p style={{ opacity: "0.5" }}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
