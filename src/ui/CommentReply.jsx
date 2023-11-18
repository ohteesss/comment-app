import { createContext, useState } from "react";
import CommentScore from "./CommentScore";
import CommentUser from "./CommentUser";
import CommentText from "./CommentText";
import CreateComment from "./CreateComment";
import CommentAction from "./CommentAction";

export const replyContext = createContext();
function CommentReply({ reply }) {
  const [newEditId, setNewEditId] = useState("");
  const { id } = reply;
  const [newCommentId, setNewCommentId] = useState(null);
  function handleReplyClick(id) {
    id === newCommentId ? setNewCommentId(null) : setNewCommentId(id);
  }
  // function handleReply() {
  //   console.log(id, commentObject);
  //   dispatch(addnewReply(id, commentObject));
  //   setNewCommentId(null);
  // }
  return (
    <>
      <div className="bg-white grid gap-4 custom-grid p-6 mb-4 ml-12 max-[500px]:ml-2 border-l-2 border-lightBlue">
        <replyContext.Provider value={reply}>
          <CommentScore id={id} />

          <CommentUser
            handleClick={handleReplyClick}
            editId={() => setNewEditId(id)}
          />
          <CommentAction
            handleClick={handleReplyClick}
            editId={() => setNewEditId(id)}
          />
          <CommentText newEditId={newEditId} setNewEditId={setNewEditId} />
        </replyContext.Provider>
      </div>
      {id === newCommentId && (
        <CreateComment
          id={newCommentId}
          setNewCommentId={setNewCommentId}
          buttonName={"REPLY"}
        />
      )}
    </>
  );
}

export default CommentReply;
