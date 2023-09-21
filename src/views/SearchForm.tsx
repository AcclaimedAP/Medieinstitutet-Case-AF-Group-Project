import { useContext, useEffect, useState } from "react";
import { DigiButton, DigiFormTextarea, DigiFormInput } from "@digi/arbetsformedlingen-react";
import { ButtonVariation, FormInputType, FormInputValidation, FormInputVariation, FormTextareaValidation, FormTextareaVariation } from "@digi/arbetsformedlingen";
import { EduToWorkData } from "../service/EduToWorkService";
import IOccupations from "../interfaces/IOccupations";
import { OccupationDispatchContext } from "../OccupationsContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const dispatch = useContext(OccupationDispatchContext);
  const searchService = EduToWorkData();
  const [headlineInput, setHeadlineInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    let id = searchParams.get("id");
    if (id === null) {
      id = "";
    }
    setSearchParams({ title: title, desc: description, id: id });
  }

  return (
    <>
      <DigiFormInput afLabel="Utbildningstitel" afVariation={FormInputVariation.MEDIUM} afType={FormInputType.TEXT} afValidation={FormInputValidation.NEUTRAL} value={headlineInput} onAfOnChange={(e) => setHeadlineInput(String(e.target.value))} />
      <DigiFormTextarea afLabel="Utbildningsbeskrivning*" afVariation={FormTextareaVariation.MEDIUM} afValidation={FormTextareaValidation.NEUTRAL} value={textInput} onAfOnChange={(e) => setTextInput(String(e.target.value))}></DigiFormTextarea>
      {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}
      <DigiButton
        onAfOnClick={() => {
          workTitles(headlineInput, textInput);
        }}
        afVariation={ButtonVariation.PRIMARY}
      >
        Sök
      </DigiButton>
    </>
  );
};

export default SearchForm;
