import { useSelector } from "react-redux";
import { useContext } from "react";
import { commentContext } from "./Comment";
import { replyContext } from "./CommentReply";
import { formatFromNow } from "../utils/helpers";

function CommentUser() {
  // const {
  //   user: { image, username },
  //   createdAt,
  // } = useSelector((state) => state.comment);

  const username = useSelector((state) => state.user.username);
  const {
    user: { image, username: commentUsername },
    createdAt,
  } = useContext(commentContext) || useContext(replyContext);

  const isUser = username === commentUsername;
  return (
    <div className="flex items-center gap-2 user ">
      <img src={image.webp} alt={commentUsername} className="w-8 h-8" />
      <span className="text-darkBlue font-bold">{commentUsername}</span>
      {isUser && (
        <span className="bg-blue text-white px-2 py-[1px] text-sm rounded-md">
          you
        </span>
      )}
      <span>{formatFromNow(createdAt)}</span>
    </div>
  );
}
// import { useDispatch, useSelector } from "react-redux";
// import CommentButton from "./CommentButton";
// import { useContext, useState } from "react";
// import { commentContext } from "./Comment";
// import { replyContext } from "./CommentReply";
// import { formatFromNow } from "../utils/helpers";
// import { deleteComment } from "../features/CommentSlice";
// import ConfirmModal from "./ConfirmModal";

// function CommentUser({ handleClick, editId }) {
//   // const {
//   //   user: { image, username },
//   //   createdAt,
//   // } = useSelector((state) => state.comment);
//   const [isOpen, setIsOpen] = useState(false);
//   const dispatch = useDispatch();
//   const username = useSelector((state) => state.user.username);
//   const {
//     id,
//     user: { image, username: commentUsername },
//     createdAt,
//   } = useContext(commentContext) || useContext(replyContext);

//   function handleEdit() {
//     editId(id);
//     // console.log(id);
//     // console.log("working");
//   }
//   function handleDelete() {
//     console.log(id);
//     dispatch(deleteComment(id));
//   }
//   function showModal() {
//     setIsOpen(true);
//   }
//   const isUser = username === commentUsername;
//   return (
//     <div className="flex justify-between mb-4">
//       <div className="flex items-center gap-2">
//         <img src={image.webp} alt={commentUsername} className="w-8 h-8" />
//         <span className="text-darkBlue font-bold">{commentUsername}</span>
//         {isUser && (
//           <span className="bg-blue text-white px-2 py-[1px] text-sm rounded-md">
//             you
//           </span>
//         )}
//         <span>{formatFromNow(createdAt)}</span>
//       </div>
//       {isUser ? (
//         <div className="flex gap-2">
//           <CommentButton type="edit" onClick={handleEdit}>
//             {" "}
//             <span className={`capitalize text-blue font-bold`}> edit </span>
//           </CommentButton>
//           <CommentButton type="delete" onClick={showModal}>
//             <span className={`capitalize text-red font-bold`}> delete </span>
//           </CommentButton>
//         </div>
//       ) : (
//         <CommentButton type="reply" onClick={() => handleClick(id)}>
//           {" "}
//           <span className={`capitalize text-blue font-bold`}> reply </span>
//         </CommentButton>
//       )}
//       {isOpen && (
//         <ConfirmModal
//           onClose={() => setIsOpen(false)}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// }

export default CommentUser;
