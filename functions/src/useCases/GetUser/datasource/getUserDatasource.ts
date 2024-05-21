/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IgetUserRepository} from "../../../repository/user-repository/IUserRepository";
import {AdminFirebase} from "../../../dataSource/firebase/repository/Admin-firebase";
import {User} from "../../../entities/user-entities/User";
import {ErrorUserNotFound} from "../errors/errors";

/**
 */
export class GetUserDatasource implements IgetUserRepository {
  private db: firestore.Firestore;
  /**
     * @param {AdminFirebase} firestoreProvider
     */
  constructor(firestoreProvider: AdminFirebase) {
    this.db = firestoreProvider.getFirestoreInstance();
  }
  /**
     * @param {string} id
     */
  async getInfoUser(id: string): Promise<User | null> {
    const collectionUser = this.db.collection("users").doc(id);
    const userDoc = await collectionUser.get();
    if (!userDoc.exists) {
      throw new ErrorUserNotFound("User not found");
    }
    const user = userDoc.data() as User;
    return user;
  }
}
