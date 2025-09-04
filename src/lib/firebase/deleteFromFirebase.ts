export const deleteImageFromFirebase = async (bucket, url) => {
    const bucketName = bucket.name;
    const prefix = `https://storage.googleapis.com/${bucketName}/`;

    if (url.startsWith(prefix)) {
        const filePath = url.replace(prefix, "");
        const file = bucket.file(filePath);
        await file.delete().catch(() => null);
    }
};