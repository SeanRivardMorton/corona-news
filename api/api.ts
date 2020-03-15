import * as firebase from "firebase";
import { firebaseConfig } from "../config.ts";

export class api {
  app: typeof firebase | firebase.app.App;
  authLevel: number;
  constructor() {
    this.authLevel = 0;
    this.app =
      firebase.app.length === 0
        ? firebase.initializeApp(firebaseConfig)
        : firebase;
  }

  authenticate() {
    this.authLevel += 1;
    return this.authLevel;
  }
}
