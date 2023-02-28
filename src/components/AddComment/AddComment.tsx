import { useRef } from "react";
import "./AddComment.css";

type AddCommentProps = {
  src: string;
  username: string;
  sendComment: (message: string) => void;
};

const AddComment = (props: AddCommentProps) => {
  const message = useRef<HTMLTextAreaElement>(null);

  const checkNewComment = () => {
    if (message.current!.value != "") {
      props.sendComment(message.current!.value);
    }
    message.current!.value = "";
  };

  return (
    <div className="add-comment">
      <textarea
        placeholder="Add a comment..."
        className="add-comment-input"
        cols={30}
        rows={3}
        ref={message}
      ></textarea>
      <div>
        <img src={props.src} alt="" />
        <button onClick={checkNewComment}>SEND</button>
      </div>
    </div>
  );
};

export default AddComment;
