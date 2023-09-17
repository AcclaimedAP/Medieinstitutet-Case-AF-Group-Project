import { useContext, useEffect, useState } from "react";
import IOccupations from "../interfaces/IOccupations";
import { OccupationContext } from "../OccupationsContext";
import { DigiExpandableAccordion, DigiLayoutBlock, DigiTypography } from "@digi/arbetsformedlingen-react";
import { LayoutBlockVariation, TypographyVariation } from "@digi/arbetsformedlingen";

const SearchResults = () => {
    const context = useContext(OccupationContext);
    const [occupations, setOccupations] = useState<IOccupations>();
    useEffect(() => {
        const updateOccupations = () => {
            setOccupations(context?.state.occupations);
        }
        updateOccupations();
    });
    
    function OccupationMap(occupationsList: IOccupations) {

        return occupationsList.related_occupations.map(occupation =>     
                <DigiExpandableAccordion 
                    afHeading={occupation.occupation_label}
                    key={occupation.id}
                >
                    <div className="m-5">
                        <DigiTypography>
                            <p>taxonomi ID: {occupation.concept_taxonomy_id}</p>
                            <p>Arbetsgrupp: {occupation.occupation_group.occupation_group_label}</p>
                        </DigiTypography>
                        </div>
                </DigiExpandableAccordion>
            
        )
    }




    if (!occupations) {
        return null;
    }
    
    return (
        <>
            <DigiLayoutBlock
                afVariation={LayoutBlockVariation.SECONDARY}>
                <DigiTypography
                afVariation={TypographyVariation.SMALL}
                >
                    <h1>
                        Sökresultat, hittade {occupations.hits_total}st, visar {occupations.hits_returned}st
                    </h1>
                </DigiTypography>
                <OccupationMap {...occupations}></OccupationMap>
            </DigiLayoutBlock>
        </>
    )
}

export default SearchResults;