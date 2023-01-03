import variables from "./../../stylesheets/abstracts/colors/_colors.module.scss"

export enum ActionTypes {
    DELETE = "Delete",
    EDIT = "Edit",
    REPLY = "Reply",
}
export default interface IAction {
    iconUrl: string
    actionName: string
    color: string
}

export const AuthorActions: IAction[] = [
    {
        iconUrl: require("./../../images/icon-delete.svg"),
        actionName: ActionTypes.DELETE,
        color: variables["red"],
    },
    {
        iconUrl: require("./../../images/icon-edit.svg"),
        actionName: ActionTypes.EDIT,
        color: variables["blue"],
    },
]

export const UserActions: IAction[] = [
    {
        iconUrl: require("./../../images/icon-reply.svg"),
        actionName: ActionTypes.REPLY,
        color: variables["blue"],
    },
]
