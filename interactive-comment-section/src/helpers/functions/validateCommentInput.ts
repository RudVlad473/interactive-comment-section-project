export enum MessageStates {
    Short = "Your comment looks a bit short. Try again with some longer message of yours.",
    Empty = "Your comment looks empty. Try again with some message of yours.",
    Normal = "Your comment will be added soon!",
}

function validateCommentInput(text: string): MessageStates {
    if (!text) {
        return MessageStates.Empty
    } else if (text.length < 4) {
        return MessageStates.Short
    } else {
        return MessageStates.Normal
    }
}

export default validateCommentInput
