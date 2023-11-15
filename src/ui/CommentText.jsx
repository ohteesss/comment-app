import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { commentContext } from "./Comment";
import { replyContext } from "./CommentReply";
import CommentButton from "./CommentButton";
import { editComment } from "../features/CommentSlice";

function CommentText({ newEditId, setNewEditId }) {
  // const content = useSelector((state) => state.comment.content);
  const dispatch = useDispatch();
  const { content, replyingTo } =
    useContext(commentContext) || useContext(replyContext);
  // let predefinedTest;

  const predefinedText = replyingTo ? `@${replyingTo}, ${content}` : content;

  const [comment, setComment] = useState(predefinedText);

  function handleEditChange(e) {
    const newValue = e.target.value;
    if (!replyingTo) {
      setComment(newValue);
    }
    if (newValue.startsWith(`@${replyingTo}, `)) {
      setComment(newValue);
    }
  }

  function updateComment() {
    if (comment.startsWith("@")) {
      const splittedComment = comment.split(" ");
      const replyingTo = splittedComment.shift();
      // if (replyingTo) {
      console.log(splittedComment);
      dispatch(editComment(newEditId, splittedComment.join(" ")));
      // }
    } else {
      dispatch(editComment(newEditId, comment));
    }

    setNewEditId(null);
  }

  console.log(newEditId);

  if (newEditId) {
    return (
      <div className="text col-span-2">
        <textarea
          className="py-2 px-4 border-2 border-lightGray focus:border-lightGray focus:border-4 focus:outline-none h-24 rounded-md w-full"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleEditChange}
        />
        <div className="flex justify-end mt-2">
          <CommentButton
            category="primary"
            type="UPDATE"
            onClick={updateComment}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="text col-span-2">
      {" "}
      {replyingTo && (
        <span className="text-blue font-bold">@{replyingTo}, </span>
      )}{" "}
      {content}
    </div>
  );
}

export default CommentText;
