import { useState } from "react";

type ReplyProps = {
  username: string;
  when: string;
  src: string;
  text: string;
  score: number;
};

const Reply = (props: ReplyProps) => {
  const [score, setScore] = useState<number>(props.score);

  const increment = () => setScore(score + 1);
  const decrement = () => (score != 0 ? setScore(score - 1) : setScore(score));

  return (
    <div className="wrapper">
      <div className="main">
        <div className="top">
          <img src={props.src} alt="Profile picture" />
          <p>{props.username}</p>
          <p>{props.when}</p>
        </div>
        <p className="text">{props.text}</p>
      </div>
      <div className="score">
        <img src="src/assets/icon-plus.svg" alt="plus" onClick={increment} />
        {score}
        <img src="src/assets/icon-minus.svg" alt="minus" onClick={decrement} />
      </div>
      {/* <div className="reply">
          <img src="src/assets/icon-reply.svg" alt="reply" />
          Reply
        </div> */}
    </div>
  );
};

export default Reply;
