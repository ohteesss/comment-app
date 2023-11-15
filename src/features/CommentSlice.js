import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "2023-10-02T18:31:08.773Z",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2023-08-12T18:31:08.773Z",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "2023-11-01T18:31:08.773Z",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2023-10-02T13:31:08.773Z",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    changeScore: {
      prepare(id, value) {
        return {
          payload: { id, value },
        };
      },
      reducer(state, action) {
        const repliesArr = state.comments
          .flatMap((el) => el.replies)
          .find((el) => el.id === action.payload.id);
        // repliesArr ? repliesArr.score += action.payload.value :
        console.log(repliesArr);
        if (!repliesArr) {
          state.comments.find(
            (comment) => comment.id === action.payload.id
          ).score += action.payload.value;
        } else {
          repliesArr.score += action.payload.value;
        }
        // repliesArr.find((comment) => comment.id === action.payload.id).score +=
        //   action.payload.id;
      },
    },
    // changeScore(state, action) {
    //   state.score += action.payload;
    // },
    addnewComment(state, action) {
      state.comments.unshift(action.payload);
    },
    editComment: {
      prepare(id, comment) {
        return {
          payload: { id, comment },
        };
      },
      reducer(state, action) {
        // find comment
        const comment = state.comments.find(
          (comment) => comment.id === action.payload.id
        );
        if (comment) {
          comment.content = action.payload.comment;
        } else {
          const replies = state.comments.flatMap((comment) => comment.replies);
          const reply = replies.find((reply) => reply.id === action.payload.id);
          reply.content = action.payload.comment;
        }
      },
    },
    deleteComment(state, action) {
      // Find comment
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      console.log(index);
      // Delete comment
      if (index !== -1) {
        state.comments.splice(index, 1);
      }
      if (index === -1) {
        const comment = state.comments.find((commment) =>
          commment.replies.some((reply) => reply.id === action.payload)
        );
        const reply = comment.replies.filter((el) => el.id !== action.payload);

        comment.replies = reply;
      }

      // All reply
      // const replies = state.comments.flatMap((comment) => comment.replies);

      // // Find reply from id
      // const reply = replies.find((reply) => (reply.id = action.payload));

      // find comment that has the reply amidst its replies
    },
    addnewReply: {
      prepare(id, comment) {
        return {
          payload: { id, comment },
        };
      },
      reducer(state, action) {
        const replyEl = state.comments
          .flatMap((el) => el.replies)
          .find((comment) => comment.id === action.payload.id);
        if (!replyEl) {
          const val1 = state.comments.find(
            (comment) => comment.id === action.payload.id
          );
          console.log(val1);
          val1?.replies.push(action.payload.comment);
        } else {
          // state.comments.replies
          const val = state.comments.find((comment) =>
            comment.replies.some((reply) => reply.id === action.payload.id)
          );
          val.replies.push(action.payload.comment);
          // replyEl.reply = action.payload.comment;
          // console.log(replyEl);
        }
      },
    },
  },
});

export default commentSlice.reducer;

export const {
  addnewComment,
  addnewReply,
  changeScore,
  deleteComment,
  editComment,
} = commentSlice.actions;

// export const { changeScore } = commentSlice.actions;
