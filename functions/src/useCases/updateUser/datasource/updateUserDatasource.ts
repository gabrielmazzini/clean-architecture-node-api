/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IUpdateUserRepository} from "../../../repository/user-repository/IUserRepository";
import {AdminFirebase} from "../../../dataSource/firebase/repository/Admin-firebase";
import {ErrorUserNotFound} from "../errors/errors";

/**
 */
export class UpdateUserDatasource implements IUpdateUserRepository {
  private db: firestore.Firestore;
  /**
     * @param {AdminFirebase} firestoreProvider
     */
  constructor(firestoreProvider: AdminFirebase) {
    this.db = firestoreProvider.getFirestoreInstance();
  }
  /**
     * @param {string} id
     * @param {string} name
     * @param {string} email
     * @param {string} password
     */
  async updateUser(id: string, name: string, email: string, password: string): Promise<void> {
    const usersList = this.db.collection("users").doc(id);
    const userDoc = await usersList.get();
    if (!userDoc.exists) {
      throw new ErrorUserNotFound("User not found");
    }
    try {
      await this.db.collection("users").doc(id).update({name, email, password});
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
