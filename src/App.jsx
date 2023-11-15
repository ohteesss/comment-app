import { Provider } from "react-redux";
import Comment from "./ui/Comment";
import store from "./store";
import CommentApp from "./ui/CommentApp";

function App() {
  return (
    <Provider store={store}>
      <CommentApp />
    </Provider>
  );
}

export default App;
