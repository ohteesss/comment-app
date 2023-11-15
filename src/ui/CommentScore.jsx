import { useDispatch } from "react-redux";
import Button from "./ScoreButton";
import { changeScore } from "../features/CommentSlice";
import { useContext } from "react";
import { commentContext } from "./Comment";
import { replyContext } from "./CommentReply";

function CommentScore({ id }) {
  const { score } = useContext(commentContext) || useContext(replyContext);
  // const comment = useSelector((state) => state.comment);
  // const { score } = comment;
  const dispatch = useDispatch();
  // console.log(comment);
  function handleIncrease() {
    dispatch(changeScore(id, 1));
    console.log("working");
  }
  function handleDecrease() {
    dispatch(changeScore(id, -1));
  }
  return (
    <div className="row-span-2 max-[500px]:flex-row max-[500px]:h-fit max-[500px]:w-[100px]  flex flex-col bg-veryLightGray justify-between p-2 h-24 items-center rounded-md">
      <Button type="plus" onClick={handleIncrease} />
      <span className="text-blue font-bold">{score}</span>
      <Button type="minus" onClick={handleDecrease} />
    </div>
  );
}

export default CommentScore;
