import {IAdminFirebase} from "../repository/IAdmin-firebase";
import admin, {firestore} from "firebase-admin";
admin.initializeApp();
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
