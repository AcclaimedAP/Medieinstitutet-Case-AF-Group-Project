import { useContext, useEffect } from "react";
import IOccupations from "../interfaces/IOccupations";
import { OccupationContext, OccupationDispatchContext } from "../OccupationsContext";
import { DigiTypography } from "@digi/arbetsformedlingen-react";
import { TypographyVariation } from "@digi/arbetsformedlingen";
import OccupationAccordion from "../components/OccupationAccordion";
import { EduToWorkData } from "../service/EduToWorkService";
import { calculatePages } from "../utilities/CalculatePagination";
import { useSearchParams } from "react-router-dom";


const SearchResults = () => {
  const context = useContext(OccupationContext);
  const searchService = EduToWorkData();
  const dispatch = useContext(OccupationDispatchContext);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        title: searchParams.get("title"),
        desc: searchParams.get("desc"),
        page: searchParams.get("page"),
      };

      if (params.title && params.desc) {
        const result = await searchService.fetchWorkTitles(params.title!, params.desc!, (Number(params.page) - 1) * 10);

        const payload = {
          occupations: result,
          headlineInput: params.title,
          textInput: params.desc,
        };

        dispatch({ payload, type: "updated" });
      }
    };
    fetchData();
  }, [searchParams.get("title"), searchParams.get("desc"), searchParams.get("page")]);

  const changePage = async (page: number) => {
    console.log(page);
    const result: IOccupations = await searchService.fetchWorkTitles(String(context?.state.headlineInput), String(context?.state.textInput), page * 10);

    const payload = {
      occupations: result,
      headlineInput: String(context?.state.headlineInput),
      textInput: String(context?.state.textInput),
    };

    dispatch({ payload, type: "updated" });

    setSearchParams({
      title: payload.headlineInput,
      desc: payload.textInput,
      page: (page + 1).toString(),
    });
  };

  function OccupationMap(occupationsList: IOccupations) {
    return (
      <>
        {occupationsList.related_occupations.map((occupation, index) => (
          <div
            key={index}
            className='bg-white mb-2 pl-1 border border-primary rounded-lg'
          >
            <OccupationAccordion
              occupation={occupation}
              key={index}
            />
          </div>
        ))}
        <div className='flex gap-2 justify-center w-full mt-4'>
          {context?.state.occupations &&
            Array.from({
              length: calculatePages(context.state.occupations.hits_total),
            }).map((val, index) => (
              <button
                key={index}
                aria-label={`Visa sida ${index + 1}`}
                className={`px-4 py-2 border-2 border-primary rounded-lg bg-white font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white ${
                  Number(searchParams.get('page')) === index + 1 &&
                  '!bg-primary !text-whiteDark'}`}
                onClick={() => changePage(index)}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </>
    );
  }

  if (!context?.state.occupations) {
    return null;
  }

  return (
    <>
      <div className='bg-whiteDark laptop:opacity-90 flex flex-col items-center justify-center h-auto w-auto p-10 border-2 border-primary laptop:mt-7 laptop:absolute laptop:right-0 laptop:top-0 laptop:translate-x-[-100px] laptop:rounded-lg'>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h1 className='text-primary'>
            Sökresultat, hittade {context.state.occupations.hits_total}st, visar {context.state.occupations.hits_returned}st
          </h1>
        </DigiTypography>
        {context?.state.occupations && <OccupationMap {...context?.state.occupations}></OccupationMap>}
      </div>
    </>
  );
};

export default SearchResults;
