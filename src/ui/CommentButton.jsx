function CommentButton({
  type,
  onClick,
  color = "bg-blue",
  category,
  children,
}) {
  if (category === "primary")
    return (
      <button
        className={`${color} text-lightGray px-4 py-2 rounded-md font-bold flex self-start  max-[500px]:col-end-4  `}
        onClick={onClick}
      >
        {type}
      </button>
    );
  return (
    <button
      className=" justify-end flex items-center gap-2 max-[500px]:mt-1"
      onClick={onClick}
    >
      <span>
        <img src={`icon-${type}.svg`} alt={`${type} button`} />
      </span>{" "}
      {children}
    </button>
  );
}

export default CommentButton;
