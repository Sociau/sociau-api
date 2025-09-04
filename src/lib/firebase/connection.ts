import * as admin from "firebase-admin";
<<<<<<< HEAD
import * as serviceAccount from "../../../firebase-key.json";
=======
import * as serviceAccount from "./firebase-key.json";
>>>>>>> 54b671d (feat: firebase)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: `${serviceAccount.project_id}.firebasestorage.app`
})

export { admin };