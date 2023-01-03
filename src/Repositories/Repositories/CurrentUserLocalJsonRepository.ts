import getCurrentUserFromLocalJson from "../../api/userApi"
import extractCurrentUser from "../../helpers/functions/extractCurrentUser"
import { ICurrentUser } from "../../models/User/IUser"
import ICurrentUserRepository from "../IRepositories/ICurrentUserRepository"

class CurrentUserLocalJsonRepository implements ICurrentUserRepository {
  async get(): Promise<ICurrentUser | undefined> {
    const fetchedCurrentUser = await getCurrentUserFromLocalJson()
    return extractCurrentUser(fetchedCurrentUser)
  }
  create(user: Promise<ICurrentUser>): void {
    throw new Error("Method not implemented.")
  }
  update(userToUpdate: Promise<ICurrentUser>): void {
    throw new Error("Method not implemented.")
  }
  delete(id: number): void {
    throw new Error("Method not implemented.")
  }
}

export default CurrentUserLocalJsonRepository
