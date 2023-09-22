import { useContext, useEffect, useState } from 'react';
import IOccupations from '../interfaces/IOccupations';
import { OccupationContext } from '../OccupationsContext';
import { DigiTypography } from '@digi/arbetsformedlingen-react';
import { TypographyVariation } from '@digi/arbetsformedlingen';
import OccupationAccordion from '../components/OccupationAccordion';

const SearchResults = () => {
  const context = useContext(OccupationContext);
  const [occupations, setOccupations] = useState<IOccupations>();

  useEffect(() => {
    const updateOccupations = () => {
      setOccupations(context?.state.occupations);
    };
    updateOccupations();
  });

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
      </>
    );
  }

  if (!occupations) {
    return null;
  }

  return (
    <>
      <div className='bg-whiteDark laptop:opacity-90 flex flex-col items-center justify-center h-auto w-auto p-10 border-2 border-primary laptop:mt-7 laptop:absolute laptop:right-0 laptop:top-20 laptop:translate-x-[-100px] laptop:rounded-lg'>
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
