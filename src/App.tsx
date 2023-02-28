import { useEffect, useState } from "react";
import AddComment from "./components/AddComment/AddComment";
import Comment from "./components/Comment/Comment";
import "./index.css";

type User = { username: string; image: { png: string; webp: string } };

type Comments = {
  user: User;
  createdAt: string;
  content: string;
  score: number;
  id: number;
  replies?: [];
};

const App = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComments, setNewComments] = useState<string[]>([]);
  const [user, setUser] = useState<User>({
    username: "",
    image: { png: "", webp: "" },
  });

  const formatSrc = (src: string): string => src.split("/").slice(2).join("/");

  const sendComment = (message: string) => {
    // const toBeAdded:  = {user}
    setNewComments([...newComments, message]);
    console.log(newComments);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setUser(data.currentUser);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {comments &&
        comments.map((comment) => (
          <Comment
            username={comment.user.username}
            when={comment.createdAt}
            src={formatSrc(comment.user.image.png)}
            text={comment.content}
            score={comment.score}
            key={comment.id}
            replies={comment.replies}
          />
        ))}
      {newComments &&
        newComments.map((comment) => (
          <Comment
            username={user.username}
            src={`/${formatSrc(user.image.png)}`}
            score={0}
            text={comment}
            when={"Just now"}
            key={newComments.indexOf(comment) + 4}
            classes={"new"}
          />
        ))}
      {user && (
        <AddComment
          src={`/${formatSrc(user.image.png)}`}
          username={user.username}
          sendComment={sendComment}
        />
      )}
    </>
  );
};

export default App;
