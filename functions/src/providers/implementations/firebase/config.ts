/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
import admin from "firebase-admin";

const serviceAccount = require("./crud-mais-solid-firebase-adminsdk-asvvs-8185ccd3ec.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crud-mais-solid-default-rtdb.firebaseio.com",
});
