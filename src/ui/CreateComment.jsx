import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addnewComment, addnewReply } from "../features/CommentSlice";
import CommentButton from "./CommentButton";

function CreateComment({ id, buttonName, setNewCommentId }) {
  const [newComment, setNewComment] = useState("");
  const comments = useSelector((state) => state.comment.comments);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const repliesArr = comments.flatMap((el) => el.replies);
  const { image, username } = user;
  const {
    user: { username: commentUsername },
    content,
    replyingTo: editReplyingTo,
  } = [...comments, ...repliesArr].find((el) => el.id === id) || {
    user: { username: "" },
  };
  const isUser = commentUsername === username;
  const predefinedText = `@${isUser ? editReplyingTo : commentUsername}, `;
  // EDIT CONTENT BY USER

  const [commentContent, setCommentContent] = useState(predefinedText);
  const [editContent, setEditContent] = useState(
    `${predefinedText} ${content}`
  );

  const handleEditChange = (e) => {
    const newValue = e.target.value;

    if (newValue.startsWith(predefinedText)) {
      setEditContent(newValue);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // Only update the text if the new value starts with the predefined text
    if (newValue.startsWith(predefinedText)) {
      setCommentContent(newValue);
    }
  };

  //   console.log(commentUsername);

  const commentContenttArr = commentContent.split(" ");
  const replyingTo = commentContenttArr.shift().slice(1, -1);
  // EDIT CONTENT BY USER
  // const isUser = commentUsername === username;
  // const editContent = commentContent.concat(content);

  const commentObject = {
    id: `${commentUsername}-${Math.random()}`,
    content: id === null ? newComment : commentContenttArr.join(" "),
    createdAt: new Date().toISOString(),
    score: 1,
    user,
  };
  function handleReply() {
    console.log(id, commentObject);
    if (id === null) {
      dispatch(addnewComment({ ...commentObject, replies: [] }));
      setNewComment("");
    } else {
      dispatch(addnewReply(id, { ...commentObject, replyingTo }));
      setNewCommentId(null);
    }
  }
  //   console.log(commentObject);
  if (id === null)
    return (
      <div className="grid new-comment-grid items-center gap-4 max-[500px]:grid-rows-[1fr,auto] bg-white p-6 mb-6">
        <span className="flex self-start">
          <img src={image.png} alt={`${username}'s pics`} />
        </span>
        <textarea
          className="py-2 px-4 border-2 border-lightGray focus:border-lightGray focus:border-4 focus:outline-none h-24 rounded-md max-[500px]:row-start-1 max-[500px]:col-span-3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        {/* <button
          className="bg-blue text-lightGray px-4 py-2 rounded-md font-bold flex self-start"
          onClick={handleReply}
        >
          {buttonName}
        </button> */}
        <CommentButton
          category="primary"
          type={buttonName}
          onClick={handleReply}
        />
      </div>
    );
  return (
    <div className="grid new-comment-grid items-center max-[500px]:grid-rows-[1fr,auto] gap-4 bg-white p-6 mb-6">
      <span className="flex self-start">
        <img src={image.png} alt={`${username}'s pics`} />
      </span>
      {
        <textarea
          className="py-2 px-4 border-2 border-lightGray focus:border-lightGray focus:border-4 focus:outline-none h-24 rounded-md max-[500px]:row-start-1 max-[500px]:col-span-3"
          placeholder="Add a comment..."
          value={isUser ? editContent : commentContent}
          onChange={isUser ? handleEditChange : handleInputChange}
        />
      }

      {/* <button
        className="bg-blue text-lightGray px-4 py-2 rounded-md font-bold flex self-start justify-center items-center"
        onClick={handleReply}
      >
        {isUser ? "UPDATE" : buttonName}
      </button> */}
      <CommentButton
        category="primary"
        type={isUser ? "UPDATE" : buttonName}
        onClick={handleReply}
      />
    </div>
  );
}

export default CreateComment;
