/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import {User} from "../../entities/User";
import {IUserRepository} from "../IUserRepository";
import admin from "firebase-admin";
import {Firestore} from "firebase-admin/firestore";

admin.initializeApp();

/**
 */
export class DataBaseUserRepository implements IUserRepository {
  private db: Firestore;
  /**
   */
  constructor() {
    this.db = admin.firestore();
  }

  /**
   * @param {string} email
   * @return {object}
   */
  async fyndByEmail(email: string): Promise<User | null> {
    const usersRef = this.db.collection("users");
    const query = usersRef.where("email", "==", email);
    const userSnapshot = await query.get();

    if (!userSnapshot) return null;

    const user = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      password: doc.data().password,
    })) as User[];
    return user[0];
  }

  /**
   * @param {User} user
   */
  async save(user: User): Promise<void> {
    const userData = {...user};
    await this.db.collection("users").doc(user.id!).create(userData);
  }
}
