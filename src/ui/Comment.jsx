import CommentButton from "./CommentButton";
import CommentScore from "./CommentScore";
import CommentUser from "./CommentUser";
import CommentText from "./CommentText";
import { createContext, useState } from "react";
import CommentReply from "./CommentReply";
import CreateComment from "./createComment";
import CommentAction from "./CommentAction";
// import "../../index.css";

const fakeData = {
  id: 1,
  content:
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  createdAt: "1 month ago",
  score: 12,
  user: {
    image: {
      png: "./images/avatars/image-amyrobson.png",
      webp: "./images/avatars/image-amyrobson.webp",
    },
    username: "amyrobson",
  },
  replies: [],
};
export const commentContext = createContext();
function Comment({ comment }) {
  const [newEditId, setNewEditId] = useState("");
  const [newCommentId, setNewCommentId] = useState(null);
  function handleReplyClick(id) {
    id === newCommentId ? setNewCommentId(null) : setNewCommentId(id);
  }
  function handleEditClick(id) {
    setNewEditId(id);
    // console.log("working");
  }
  const { id, replies } = comment;
  // console.log(replies);
  return (
    <>
      <commentContext.Provider value={comment}>
        <div className="bg-white grid gap-4 custom-grid p-6 mb-4">
          <CommentScore id={id} />

          <CommentUser
            handleClick={handleReplyClick}
            editId={handleEditClick}
          />
          <CommentAction
            handleClick={handleReplyClick}
            editId={handleEditClick}
          />

          <CommentText newEditId={newEditId} setNewEditId={setNewEditId} />
        </div>
        {id === newCommentId && (
          <CreateComment
            id={newCommentId}
            setNewCommentId={setNewCommentId}
            buttonName={"REPLY"}
          />
        )}
      </commentContext.Provider>
      {replies.length !== 0 &&
        replies.map((reply) => <CommentReply reply={reply} key={reply.id} />)}
    </>
  );
}

// function CommentUser({ image, username, createdAt }) {}

// function CommentText({ content }) {
//   return <div>{content}</div>;
// }

// function CommentButton() {
//   return <button>Reply</button>;
// }

// function CommentScore({ score }) {
//   return (
//     <div>
//       <button>+</button>
//       <span>{score}</span>
//       <button>-</button>
//     </div>
//   );
// }
export default Comment;
