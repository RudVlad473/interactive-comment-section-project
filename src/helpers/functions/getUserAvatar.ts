import { UserName } from "./../../models/User/IUser";
function getUserAvatar(username: UserName): string {
  return require(`../../images/avatars/image-${username}.png`)
}

export default getUserAvatar