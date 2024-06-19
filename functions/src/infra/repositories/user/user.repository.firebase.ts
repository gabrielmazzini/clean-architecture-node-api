/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import admin, {firestore} from "firebase-admin";
import {IUserGateway} from "../../../domain/gateway/user-gateway";
import {User} from "../../../domain/entity/user-entity";

admin.initializeApp();

/**
 */
export class CreateUserRepositoryFirebase implements IUserGateway {
  /**
     * @param {firestore} firestoreProvider
     */
  private constructor(private readonly firestoreProvider: firestore.Firestore) {}
  /**
   * @param {firestore} firestoreProvider
   * @return {CreateUserRepositoryFirebase}
   */
  public static create(firestoreProvider: firestore.Firestore) {
    return new CreateUserRepositoryFirebase(firestoreProvider);
  }
  /**
     * @param {string} email
     * @return {object}
     */
  async fyndByEmail(email: string): Promise<object | null> {
    const usersRef = this.firestoreProvider.collection("users");
    const query = usersRef.where("email", "==", email);
    const userSnapshot = await query.get();
    if (userSnapshot.empty) return null;
    const user = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      password: doc.data().password,
    }));
    return user as object;
  }
  /**
     * @param {User} user
     */
  async save(user: User): Promise<void> {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await this.firestoreProvider.collection("users").doc(user.id).create(userData);
  }
}

