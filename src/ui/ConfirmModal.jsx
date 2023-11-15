import { createPortal } from "react-dom";
import CommentButton from "./CommentButton";

function ConfirmModal({ onClose, onDelete }) {
  return createPortal(
    <div className="fixed h-screen w-full top-0 left-0 z-50 bg-lightGray bg-opacity-50 transition-all duration-300">
      <div className="w-[30rem] max-[500px]:w-4/5  px-6 shadow-lg rounded-md py-6 flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white gap-6">
        <h2 className="font-bold text-lg text-darkBlue">Delete Comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>

        <div className="flex gap-4">
          <CommentButton
            color="bg-grayBlue"
            type="NO, CANCEL"
            category="primary"
            onClick={onClose}
          />
          <CommentButton
            color="bg-red"
            type="YES, DELETE"
            category="primary"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmModal;
