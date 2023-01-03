import { ICurrentUser } from "../../models/User/IUser"

interface ICurrentUserRepository {
  get(): Promise<ICurrentUser | undefined>
  create(user: Promise<ICurrentUser>): void
  update(userToUpdate: Promise<ICurrentUser>): void
  delete(id: number): void
}

export default ICurrentUserRepository
