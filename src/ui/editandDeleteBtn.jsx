import CommentButton from "./CommentButton";

function editandDeleteBtn() {
  return (
    <div className="flex">
      <CommentButton type="edit" />
      <CommentButton type="delete" />
    </div>
  );
}

export default editandDeleteBtn;
