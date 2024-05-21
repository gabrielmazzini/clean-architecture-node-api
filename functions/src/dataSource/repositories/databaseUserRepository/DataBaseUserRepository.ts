/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import {User} from "../../../entities/user-entities/User";
import {IUpdateUserRepository, IUserRepository, IgetUserRepository} from "../../../repository/user-repository/IUserRepository";
import admin, {firestore} from "firebase-admin";
import {AdminFirebase} from "../../firebase/repository/Admin-firebase";
import {ErrorUserNotFound} from "../../../useCases/updateUser/errors/errors";

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
    try {
      await this.db.collection("users").doc(user.id!).create(userData);
    } catch (error: any) {
      throw new Error("Internal error: " + error.message);
    }
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
      throw new ErrorUserNotFound("User not found");
    }
    const user = userDoc.data() as User;
    return user;
  }
}
/**
 */
export class UpdateUserDataBaseUserRepository implements IUpdateUserRepository {
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
