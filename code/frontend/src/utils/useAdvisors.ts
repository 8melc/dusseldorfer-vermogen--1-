import { useState, useEffect } from 'react';
import { firebaseApp } from "app"; // Correct import for initialized Firebase app
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  limit, 
  getDocs, 
  DocumentData, 
  QueryDocumentSnapshot 
} from "firebase/firestore";

// Define an interface for the Advisor data structure
interface Advisor extends DocumentData {
  id: string;
  // Add other expected fields from your advisor documents here
  // e.g., name: string; expertiseTags: string[]; region: string;
}

// Define an interface for the filters
interface AdvisorFilters {
  expertise?: string | null;
  location?: string | null;
  search?: string | null;
}

const db = getFirestore(firebaseApp);

export function useAdvisors(filters: AdvisorFilters): Advisor[] {
  const [list, setList] = useState<Advisor[]>([]);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        let advisorsQuery = query(collection(db, 'advisors'));

        if (filters.expertise) {
          advisorsQuery = query(advisorsQuery, where('tags', 'array-contains', filters.expertise));
        }
        if (filters.location) {
          advisorsQuery = query(advisorsQuery, where('region', '==', filters.location));
        }
        // Firestore does not support full-text search on array fields directly with 'array-contains' for partial matches.
        // The 'keywords' field approach assumes 'filters.search' is a whole keyword.
        // For more complex search, consider a dedicated search service like Algolia or Typesense.
        if (filters.search) {
          advisorsQuery = query(advisorsQuery, where('keywords', 'array-contains', filters.search.toLowerCase()));
        }

        advisorsQuery = query(advisorsQuery, limit(12)); // Apply limit

        const snapshot = await getDocs(advisorsQuery);
        const advisorsList = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...(doc.data() as Omit<Advisor, 'id'>),
        }));
        setList(advisorsList);
      } catch (error) {
        console.error("Error fetching advisors:", error);
        setList([]); // Set to empty list on error
      }
    };

    fetchAdvisors();
  }, [filters]);

  return list;
}
