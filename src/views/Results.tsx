import { useContext, useEffect, useState } from "react";
import IOccupations from "../interfaces/IOccupations";
import { OccupationContext } from "../OccupationsContext";
import { DigiLayoutBlock, DigiTypography } from "@digi/arbetsformedlingen-react";
import { LayoutBlockVariation, TypographyVariation } from "@digi/arbetsformedlingen";
import OccupationAccordion from "../components/OccupationAccordion";

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
      <div>
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
