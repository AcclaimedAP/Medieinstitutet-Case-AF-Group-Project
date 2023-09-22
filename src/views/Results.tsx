import { useContext, useEffect, useState } from 'react';
import IOccupations from '../interfaces/IOccupations';
import {
  OccupationContext,
  OccupationDispatchContext,
} from '../OccupationsContext';
import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { TypographyVariation } from '@digi/arbetsformedlingen';
import OccupationAccordion from '../components/OccupationAccordion';
import { EduToWorkData } from '../service/EduToWorkService';
import { calculatePages } from '../utilities/CalculatePagination';

const SearchResults = () => {
  const context = useContext(OccupationContext);
  const [occupations, setOccupations] = useState<IOccupations>();
  const searchService = EduToWorkData();
  const dispatch = useContext(OccupationDispatchContext);

  useEffect(() => {
    const updateOccupations = () => {
      setOccupations(context?.state.occupations);
    };
    updateOccupations();
  });

  const fetchMoreOccupations = async (page: number) => {
    const result: IOccupations = await searchService.fetchWorkTitles(
      String(context?.state.headlineInput),
      String(context?.state.textInput),
      page * 10
    );

    const payload = {
      occupations: result,
      headlineInput: String(context?.state.headlineInput),
      textInput: String(context?.state.textInput),
    };

    dispatch({ payload, type: 'updated' });
  };

  function OccupationMap(occupationsList: IOccupations) {
    return (
      <>
        {occupationsList.related_occupations.map((occupation, index) => (
          <div
            key={index}
            className='bg-white mb-2 pl-1 border border-primary rounded-lg'
          >
            <OccupationAccordion occupation={occupation} key={index} />
          </div>
        ))}
        <div className='flex gap-2 justify-center w-full mt-4'>
          {context?.state.occupations &&
            Array.from({
              length: calculatePages(context.state.occupations.hits_total),
            }).map((val, index) => (
              <button
                key={index}
                className='px-4 py-2 border-2 border-primary rounded-lg bg-white font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white'
                onClick={() => fetchMoreOccupations(index)}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </>
    );
  }

  if (!occupations) {
    return null;
  }

  return (
    <>
      <div className='bg-whiteDark flex flex-col items-center justify-center h-auto w-auto p-10 border-2 border-primary laptop:mt-7 laptop:absolute laptop:right-0 laptop:translate-x-[-100px]  laptop:rounded-lg'>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h1 className='text-primary'>
            Sökresultat, hittade {occupations.hits_total}st, visar{' '}
            {occupations.hits_returned}st
          </h1>
        </DigiTypography>
        <OccupationMap {...occupations}></OccupationMap>
      </div>
    </>
  );
};

export default SearchResults;

// context?.state.occupations?.hits_returned är 45
// resultatet ska bli 5 sidor, 4 med 10 hits och en sista med 5 hits
//
