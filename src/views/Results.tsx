import { useContext, useEffect, useState } from "react";
import IOccupations from "../interfaces/IOccupations";
import { OccupationContext } from "../OccupationsContext";


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
            
            <div key={occupation.id} className="bg-slate-100 p-5 my-3">
                <details className="border-solid border-2 border-slate-300 rounded">
                    <summary className="m-2 p-5">
                        <h2 className="inline">{occupation.occupation_label}</h2>
                    </summary>
                    <div className="m-5">
                        <h3>taxonomi ID: {occupation.concept_taxonomy_id}</h3>
                        <h4>Arbetsgrupp: {occupation.occupation_group.occupation_group_label}</h4>
                    </div>
                </details>
            </div>
            
        )
    }




    if (!occupations) {
        return null;
    }
    
    return (
        <>
            <div className="bg-slate-200">
                <h1>
                    Sökresultat, hittade {occupations.hits_total}st, visar {occupations.hits_returned}st
                </h1>
            
                <OccupationMap {...occupations}></OccupationMap>
            </div>
        </>
    )
}

export default SearchResults;