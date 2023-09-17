import { useState } from 'react';
import { DigiButton, DigiFormTextarea, DigiFormInput } from '@digi/arbetsformedlingen-react';
import { ButtonVariation, FormInputType, FormInputValidation, FormInputVariation, FormTextareaValidation, FormTextareaVariation } from '@digi/arbetsformedlingen';
import { EduToWorkData } from "../service/EduToWorkService";
import SearchResults from './Results';

const Home = () => {
  const searchService = EduToWorkData();
  const [headlineInput, setHeadlineInput] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [occupations, setOccupations] = useState();
  async function workTitles() {
    if (textInput.trim() === '') {
      setErrorMessage('Vänligen ange en utbildningsbeskrivning.');
      return;
    }

    setErrorMessage('');
    const result = await searchService.fetchWorkTitles(headlineInput, textInput);
    setOccupations(result);
    console.log(result);
  }

  return (
    <>
      <DigiFormInput
        afLabel='Utbildningstitel'
        afVariation={FormInputVariation.MEDIUM}
        afType={FormInputType.TEXT}
        afValidation={FormInputValidation.NEUTRAL}			
        value={headlineInput}
        onAfOnChange={(e) => setHeadlineInput(String(e.target.value))}
      />
      <DigiFormTextarea
        afLabel='Utbildningsbeskrivning*'
        afVariation={FormTextareaVariation.MEDIUM}
        afValidation={FormTextareaValidation.NEUTRAL}		
        value={textInput}
        onAfOnChange={(e) => setTextInput(String(e.target.value))}
      >
      </DigiFormTextarea>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}
      <DigiButton 
        onAfOnClick={workTitles}
        afVariation={ButtonVariation.PRIMARY}
      >
        Sök
      </DigiButton>
      <SearchResults occupations={occupations}></SearchResults>
    </>
  ); 
};

export default Home;