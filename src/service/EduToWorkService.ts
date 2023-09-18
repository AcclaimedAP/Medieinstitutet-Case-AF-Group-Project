export function EduToWorkData() {
  async function fetchWorkTitles(headlineInput: string, textInput: string) {
    const API = 'https://jobed-connect-api.jobtechdev.se/v1/occupations/match-by-text';
  
    const requestBody = {
      input_text: textInput,
      input_headline: headlineInput,
      limit: 10,
      offset: 0,
      include_metadata: false,
    };
  
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error when fetching work titles:', error);
      throw error;
    }
  }

  async function fetchCompetencies(occupationId: string) {
    const API = 'https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations';
  
    const queryParams = new URLSearchParams({
      occupation_id: occupationId,
      include_metadata: 'true',
    });
  
    const url = `${API}?${queryParams}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error when fetching competencies:', error);
      throw error;
    }
  }

  return { fetchWorkTitles, fetchCompetencies }
}