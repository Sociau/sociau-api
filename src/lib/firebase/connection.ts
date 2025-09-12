import * as admin from "firebase-admin";
import * as serviceAccount from "../../../firebase-key.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: `${serviceAccount.project_id}.appspot.com`
})

export { admin };