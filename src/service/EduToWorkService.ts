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

  return { fetchWorkTitles }
}