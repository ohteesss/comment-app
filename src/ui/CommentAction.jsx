import { useContext, useState } from "react";
import CommentButton from "./CommentButton";
import { commentContext } from "./Comment";
import { replyContext } from "./CommentReply";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../features/CommentSlice";
import ConfirmModal from "./ConfirmModal";

function CommentAction({ handleClick, editId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const {
    id,
    user: { username: commentUsername },
  } = useContext(commentContext) || useContext(replyContext);

  function handleEdit() {
    editId(id);
    // console.log(id);
    // console.log("working");
  }
  function handleDelete() {
    console.log(id);
    dispatch(deleteComment(id));
  }
  function showModal() {
    setIsOpen(true);
  }
  const isUser = username === commentUsername;
  return (
    <>
      {isUser ? (
        <div className="justify-end flex gap-2 max-[500px]:mt-1">
          <CommentButton type="edit" onClick={handleEdit}>
            {" "}
            <span className={`capitalize text-blue font-bold`}> edit </span>
          </CommentButton>
          <CommentButton type="delete" onClick={showModal}>
            <span className={`capitalize text-red font-bold`}> delete </span>
          </CommentButton>
        </div>
      ) : (
        <CommentButton type="reply" onClick={() => handleClick(id)}>
          {" "}
          <span className={`capitalize text-blue font-bold`}> reply </span>
        </CommentButton>
      )}
      {isOpen && (
        <ConfirmModal
          onClose={() => setIsOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default CommentAction;
