import { DigiButton, DigiFormTextarea, DigiFormInput } from '@digi/arbetsformedlingen-react';
import { ButtonVariation } from '@digi/arbetsformedlingen';
import { EduToWorkData } from "../service/EduToWorkService";

const Home = () => {
  const searchService = EduToWorkData();

  async function workTitles() {
    const headlineInput = 'front-end utvecklare';
    const textInput = 'react';
    const result = await searchService.fetchWorkTitles(headlineInput, textInput);
    console.log(result);
  }

	return (
    <>
    <DigiFormInput
      af-variation='medium'
      af-type="text"
      af-validation="neutral"
      afLabel={'Utbildningstitel'}
    >
    </DigiFormInput>
    <DigiFormTextarea
      af-variation="medium"
      af-validation="neutral" 
      afLabel={'Utbildningsbeskrivning'}
    >
    </DigiFormTextarea>
    <DigiButton 
      onAfOnClick={workTitles}
      afVariation={ButtonVariation.PRIMARY}
    >
      Sök
    </DigiButton></>
	); 
};

export default Home;