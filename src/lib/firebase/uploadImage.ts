import { admin } from "./connection";
import { v4 as uuidv4 } from "uuid";

const bucket = admin.storage().bucket();

export const uploadImageToFirebase = async (file, folder = "") => {
    const fileName = `${folder}/${uuidv4()}-${Date.now()}`;
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
        metadata: {
            contentType: file.mimetype
        }
    });

    await fileUpload.makePublic();

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
}