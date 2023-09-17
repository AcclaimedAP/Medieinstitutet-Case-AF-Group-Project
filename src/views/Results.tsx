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
            
                <div key={occupation.id}>
                    <h2>{occupation.occupation_label}</h2>
                    <h3>{ occupation.id }</h3>
                </div>
            
            )
    }




    if (!occupations) {
        return null;
    }
    
    return (
        <>
            <div>Sökresultat</div>
            <OccupationMap {...occupations}></OccupationMap>
        </>
    )
}

export default SearchResults;