import CommentScore from "./CommentScore";
import CommentUser from "./CommentUser";
import CommentText from "./CommentText";
import { createContext, useState } from "react";
import CommentReply from "./CommentReply";
import CreateComment from "./createComment";
import CommentAction from "./CommentAction";
// import "../../index.css";

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

          <CommentUser />
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
