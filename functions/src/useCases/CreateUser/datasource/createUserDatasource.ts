/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IUserRepository} from "../../../repository/user-repository/IUserRepository";
import {AdminFirebase} from "../../../dataSource/firebase/repository/Admin-firebase";
import {User} from "../../../entities/user-entities/User";

/**
 */
export class CreateUserDatasource implements IUserRepository {
  private db: firestore.Firestore;
  /**
     * @param {AdminFirebase} firestoreProvider
     */
  constructor(firestoreProvider: AdminFirebase) {
    this.db = firestoreProvider.getFirestoreInstance();
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
    try {
      await this.db.collection("users").doc(user.id!).create(userData);
    } catch (error: any) {
      throw new Error("Internal error: " + error.message);
    }
  }
}
