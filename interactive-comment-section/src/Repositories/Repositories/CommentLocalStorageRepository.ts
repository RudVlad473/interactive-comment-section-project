import { IComment } from "../../models/Comment/IComment";
import ICommentsRepository from "../IRepositories/ICommentRepository";

class CommentLocalStorageRepository implements ICommentsRepository {
    get(): Promise<IComment[]> {
        throw new Error("Method not implemented.");
    }
    create(comments: Promise<IComment[]>): void {
        throw new Error("Method not implemented.");
    }
    update(commentsToUpdate: Promise<IComment[]>): void {
        throw new Error("Method not implemented.");
    }
    delete(id: number): void {
        throw new Error("Method not implemented.");
    }
    
}

export default CommentLocalStorageRepository