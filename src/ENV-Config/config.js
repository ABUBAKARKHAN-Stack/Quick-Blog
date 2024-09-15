const env = {
    AppwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    AppwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDataBaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    TINYMCEAPIKEY: String(import.meta.env.VITE_TINYMCE_API_KEY),
}
export default env