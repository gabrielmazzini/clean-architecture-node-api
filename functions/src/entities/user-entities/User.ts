import {v4 as uuidv4} from "uuid";

/**
 */
export class User {
  public readonly id: string | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  /**
 * @param {User} props
 * @param {string} id
 */
  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = uuidv4();
    }
  }
}
