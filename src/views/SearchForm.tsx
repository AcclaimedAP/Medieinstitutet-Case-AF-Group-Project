import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { OccupationDispatchContext } from '../contexts/OccupationsContext';

const SearchForm = () => {
  const dispatch = useContext(OccupationDispatchContext);
  const searchService = EduToWorkData();
  const [headlineInput, setHeadlineInput] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const title = searchParams.get('title');
    const desc = searchParams.get('desc');

    if (title && desc) {
      setHeadlineInput(title);
      setTextInput(desc);
      workTitles(title, desc);
    }
  }, []);

  async function workTitles(title: string, description: string) {
    if (description.trim() === '') {
      setErrorMessage('Vänligen ange en utbildningsbeskrivning.');
      return;
    }

    setErrorMessage('');
    const result: IOccupations = await searchService.fetchWorkTitles(
      title,
      description
    );

    const payload = {
      occupations: result,
      headlineInput: headlineInput,
      textInput: textInput,
    };

    dispatch({ payload, type: 'updated' });
    navigate('/search');

    setIsButtonClicked(true);

    const id = searchParams.get('id') || '';

    if (id) {
      return setSearchParams({
        title: title,
        desc: description,
        page: '1',
        id: id,
      });
    }
    setSearchParams({ title: title, desc: description, page: '1' });
  }

  return (
    <>
      <div
        className={`bg-primary pb-16 laptop:pb-6 min-w-[320px] p-6 gap-4 h-auto flex flex-col items-center form laptop:w-1/3 laptop:rounded-lg laptop:fixed laptop:mt-260 ${
          isButtonClicked
            ? 'laptop:left-[100px]'
            : 'laptop:left-1/2 laptop:transform laptop:-translate-x-1/2'
        } laptop:-translate-y-1/2`}
      >
        <h2 className='text-white text-h3 pb-2 laptop:pb-6'>
          Sök efter yrken utifrån utbildning
        </h2>
        <DigiFormInput
          className='w-full'
          afLabel='Utbildningstitel'
          afVariation={FormInputVariation.MEDIUM}
          afType={FormInputType.TEXT}
          afValidation={FormInputValidation.NEUTRAL}
          afAriaLabelledby='Lägg till utbildningstitel'
          value={headlineInput}
          onAfOnChange={(e) => setHeadlineInput(String(e.target.value))}
        />
        <DigiFormTextarea
          className='w-full'
          afLabel='Utbildningsbeskrivning*'
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
          aria-labelledby='Lägg till utbildningsbeskrivning'
          value={textInput}
          onAfOnChange={(e) => setTextInput(String(e.target.value))}
        ></DigiFormTextarea>
        {errorMessage && (
          <div
            className='text-[red] mb-[10px]'
            aria-live='polite'
            aria-atomic='true'
          >
            {errorMessage}
          </div>
        )}
        <DigiButton
          className='border-2 border-accent rounded-lg'
          onAfOnClick={() => {
            workTitles(headlineInput, textInput);
          }}
          afVariation={ButtonVariation.PRIMARY}
          aria-label='Sök efter yrken'
        >
          Sök
        </DigiButton>
      </div>
    </>
  );
};

export default SearchForm;
