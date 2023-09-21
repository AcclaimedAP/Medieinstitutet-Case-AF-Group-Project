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

  const fetchMoreOccupations = async () => {
    const result: IOccupations = await searchService.fetchWorkTitles(
      String(context?.state.headlineInput),
      String(context?.state.textInput),
      context?.state.occupations?.related_occupations.length
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
        {context?.state.occupations && (
          <button
            className='w-[345px] tablet:w-[545px] bg-white py-3 border-2 border-primary rounded-b-lg'
            onClick={fetchMoreOccupations}
          >
            {context?.state.occupations?.hits_returned < 10
              ? 'Tillbaka'
              : 'Visa mer...'}
          </button>
        )}
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
