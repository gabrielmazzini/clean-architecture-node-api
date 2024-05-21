/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IDeleteUserRepository} from "../../../repository/user-repository/IUserRepository";
import {AdminFirebase} from "../../../dataSource/firebase/repository/Admin-firebase";
import {ErrorUserNotFound} from "../errors/errors";
// admin.initializeApp();
/**
 */
export class DeleteUserDatasource implements IDeleteUserRepository {
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
  async deleteUser(id: string): Promise<void> {
    const userCollection = this.db.collection("users").doc(id);
    const userDoc = await userCollection.get();
    if (!userDoc.exists) {
      throw new ErrorUserNotFound("User not found");
    }
    try {
      await this.db.collection("users").doc(id).delete();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
