const BASE_URL = import.meta.env.VITE_API_BASE;

export interface Contest {
  contestId: string;
  contestTitle: string;
  contestDate: string;
  participantCount: number;
}

export const searchContestsByUsername = async (username: string): Promise<Contest[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/contests/username-search/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in searchContestsByUsername:", error);
    throw error;
  }
}; 