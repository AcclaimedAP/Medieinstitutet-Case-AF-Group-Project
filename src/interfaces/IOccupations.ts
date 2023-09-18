import IRelatedOccupation from "./IRelatedOccupation";


interface IOccupations {
    hits_returned: number,
    hits_total: number,
    identified_keywords_for_input: {
        competencies: string[],
        occupations: string[]
    }
    related_occupations: IRelatedOccupation[]
}

export default IOccupations;
