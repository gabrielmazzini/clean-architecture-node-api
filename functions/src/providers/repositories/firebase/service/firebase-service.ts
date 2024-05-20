import {IAdminFirebase} from "../repository/IAdmin-firebase";
import admin, {firestore} from "firebase-admin";

/**
 */
export class FirebaseService implements IAdminFirebase {
/**
  * @return {any}
*/
  public getFirestoreInstance(): firestore.Firestore {
    return admin.firestore();
  }
}
