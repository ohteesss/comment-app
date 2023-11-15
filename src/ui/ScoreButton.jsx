function ScoreButton({ type, onClick }) {
  return (
    <button onClick={onClick}>
      <img src={`icon-${type}.svg`} alt={`${type} button`} />
    </button>
  );
}

export default ScoreButton;
