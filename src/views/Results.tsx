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
          <div key={index}>
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
      <div className='bg-accent flex flex-col items-center justify-center h-auto w-auto p-10 absolute right-0 translate-x-[-100px] border border-primary rounded-lg'>
        <DigiTypography afVariation={TypographyVariation.SMALL}>
          <h1>
            Sökresultat, hittade {occupations.hits_total}st, visar {occupations.hits_returned}st
          </h1>
        </DigiTypography>
        <OccupationMap {...occupations}></OccupationMap>
      </div>
    </>
  );
};

export default SearchResults;
