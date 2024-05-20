import {firestore} from "firebase-admin";

export interface IAdminFirebase {
    getFirestoreInstance(): firestore.Firestore
}
