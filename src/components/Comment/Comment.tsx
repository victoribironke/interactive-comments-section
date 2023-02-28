import Reply from "../Reply";
import "./Comment.css";
import { useState } from "react";

type CommentProps = {
  username: string;
  when: string;
  src: string;
  text: string;
  score: number;
  classes?: string;
  replies?: {
    createdAt: string;
    user: { username: string; image: { png: string; webp: string } };
    content: string;
    score: number;
    id: number;
  }[];
};

const Comment = (props: CommentProps) => {
  const [score, setScore] = useState<number>(props.score);

  const increment = () => setScore(score + 1);
  const decrement = () => (score != 0 ? setScore(score - 1) : setScore(score));

  return (
    <div className={`container ${props.classes}`}>
      <div className="wrapper">
        <div className="main">
          <div className="top">
            <img src={props.src} alt="Profile picture" />
            <p>{props.username}</p>
            <p>{props.when}</p>
          </div>
          <div className="text">{props.text}</div>
        </div>
        <div className="score">
          <img src="/icon-plus.svg" alt="plus" onClick={increment} />
          {score}
          <img src="/icon-minus.svg" alt="minus" onClick={decrement} />
        </div>
        <div className="reply">
          <img src="/icon-reply.svg" alt="reply" />
          Reply
        </div>
      </div>
      {props.replies && (
        <div className="reply-div">
          {props.replies?.map((reply) => (
            <Reply
              username={reply.user.username}
              when={reply.createdAt}
              src={`/avatars/${reply.user.image.png.split("/").at(-1)}`}
              text={reply.content}
              score={reply.score}
              key={reply.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
