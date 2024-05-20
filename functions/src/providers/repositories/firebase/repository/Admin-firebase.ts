import {firestore} from "firebase-admin";
import {IAdminFirebase} from "./IAdmin-firebase";

/**
 */
export class AdminFirebase {
  private readonly db: IAdminFirebase;
  /**
   * @param {IAdminFirebase} db
 */
  constructor(db: IAdminFirebase) {
    this.db = db;
  }
  /**
 * @return {IAdminFirebase}
 */
  public getFirestoreInstance(): firestore.Firestore {
    return this.db.getFirestoreInstance();
  }
}

