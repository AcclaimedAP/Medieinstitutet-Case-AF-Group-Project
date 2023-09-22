import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const title = searchParams.get("title");
    const desc = searchParams.get("desc");
    if (title == null || desc == null) {
      return;
    }
    setHeadlineInput(title);
    setTextInput(desc);
    workTitles(title, desc);
  }, []);
  async function workTitles(title: string, description: string) {
    console.log("worktitles: ", title, description);

    if (description.trim() === "") {
      setErrorMessage("Vänligen ange en utbildningsbeskrivning.");
      return;
    }

    setErrorMessage("");
    const result: IOccupations = await searchService.fetchWorkTitles(title, description);
    dispatch({ payload: result, type: "updated" });
    navigate("/search");
    const id = searchParams.get("id") || "";
    setIsButtonClicked(true);
    setSearchParams({ title: title, desc: description, id: id });
  }

  return (
    <>
      <div className='laptop:bg-desktopBackground laptop:bg-cover laptop:h-screen'>
        <div
          className={`bg-primary min-w-[320px] p-6 gap-4 h-auto flex flex-col items-center form laptop:w-1/3 laptop:rounded-lg laptop:fixed laptop:mt-250 ${
            isButtonClicked
              ? 'laptop:left-100'
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
            onAfOnClick={() => {
          workTitles(headlineInput, textInput);
          }}
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
