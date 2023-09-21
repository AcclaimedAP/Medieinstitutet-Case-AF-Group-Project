import { useContext, useState } from 'react';
import {
  DigiButton,
  DigiFormTextarea,
  DigiFormInput,
} from '@digi/arbetsformedlingen-react';
import {
  ButtonVariation,
  FormInputType,
  FormInputValidation,
  FormInputVariation,
  FormTextareaValidation,
  FormTextareaVariation,
} from '@digi/arbetsformedlingen';
import { EduToWorkData } from '../service/EduToWorkService';
import IOccupations from '../interfaces/IOccupations';
import { OccupationDispatchContext } from '../OccupationsContext';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const dispatch = useContext(OccupationDispatchContext);
  const searchService = EduToWorkData();
  const [headlineInput, setHeadlineInput] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  async function workTitles() {
    if (textInput.trim() === '') {
      setErrorMessage('Vänligen ange en utbildningsbeskrivning.');
      return;
    }

    setErrorMessage('');
    const result: IOccupations = await searchService.fetchWorkTitles(
      headlineInput,
      textInput
    );

    dispatch({ payload: result, type: 'updated' });
    navigate('/search');
    setIsButtonClicked(true);
  }

  return (
    <>
      <div className='bg-desktopBackground !important'>
      <div className={`bg-primary p-10 h-auto w-1/3 flex flex-col items-center form rounded-lg fixed mt-250 ${
        isButtonClicked ? 'left-100' : 'left-1/2 transform -translate-x-1/2'
        } -translate-y-1/2`}
      >
        <h2 className='text-white text-h3 pb-6'>Sök efter yrken utifrån utbildning</h2>
        <DigiFormInput
          className='w-full'
          afLabel='Utbildningstitel'
          afVariation={FormInputVariation.MEDIUM}
          afType={FormInputType.TEXT}
          afValidation={FormInputValidation.NEUTRAL}
          value={headlineInput}
          onAfOnChange={(e) => setHeadlineInput(String(e.target.value))}
        />
        <DigiFormTextarea
          className='w-full'
          afLabel='Utbildningsbeskrivning*'
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
          value={textInput}
          onAfOnChange={(e) => setTextInput(String(e.target.value))}
        ></DigiFormTextarea>
        {errorMessage && (
          <div className='text-[red] mb-[10px]'>{errorMessage}</div>
        )}
        <DigiButton
          className='border-2 border-accent rounded-lg'
          onAfOnClick={workTitles}
          afVariation={ButtonVariation.PRIMARY}
        >
          Sök
        </DigiButton>
      </div>
      </div>
    </>
  );
};

export default SearchForm;
