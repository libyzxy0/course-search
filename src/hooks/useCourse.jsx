import { databases, config } from "@/config/appwrite";
import { ID, Query } from "appwrite";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export const useCourse = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCourse = async (name) => {
    try {
      setLoading(true);
      const rt = await databases.listDocuments(
        config.databaseID,
        config.courseCollectionID,
      );
      const d = rt.documents;

      const out = d.filter((doc) => doc.user_id === user.$id);
      const isDup = out.find((e) => e.name === name);

      if (isDup) {
        return console.log("Duplicate ignore");
      }

      const result = await databases.createDocument(
        config.databaseID,
        config.courseCollectionID,
        ID.unique(),
        {
          name,
          user_id: user.$id,
        },
      );
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const readCourse = async () => {
    try {
      setLoading(true);
      const result = await databases.listDocuments(
        config.databaseID,
        config.courseCollectionID,
      );
      const d = result.documents;
      const out = d.filter((doc) => doc.user_id === user.$id);
      setError("");
      setData(out);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    readCourse();
  }, []);

  return { data, loading, error, createCourse };
};
