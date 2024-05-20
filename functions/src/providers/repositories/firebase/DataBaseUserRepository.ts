/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import {User} from "../../../entities/User";
import {IUserRepository, IgetUserRepository} from "../../../repository/user-repository/IUserRepository";
import admin, {firestore} from "firebase-admin";
import {AdminFirebase} from "./repository/Admin-firebase";

admin.initializeApp();

/**
 */
export class DataBaseUserRepository implements IUserRepository {
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
    await this.db.collection("users").doc(user.id!).create(userData);
  }
}

/**
 */
export class GetUserDataBaseUserRepository implements IgetUserRepository {
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
      return null;
    }
    const user = userDoc.data() as User;
    return user;
  }
}
