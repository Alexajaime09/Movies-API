import { Client, Databases, ID, Query } from "appwrite";
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log("es projectId", PROJECT_ID);

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

console.log("projectID", PROJECT_ID);
const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
  try {
    const result = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      queries: [Query.equal("searchTerm", searchTerm)],
    });
    console.log("Todos los documentos:", result.documents);

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: doc.$id,
        data: { count: doc.count + 1 },
      });
    } else {
      await database.createDocument({
        databaseId: DATABASE_ID,
        collectionId: COLLECTION_ID,
        documentId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
