interface IRelatedOccupation {
  concept_taxonomy_id: string;
  id: string;
  legacy_ams_taxonomy_id: string;
  metadata: {
    enriched_candidates_term_frequency: {
      competencies: IEnrichedCompetence[];
    };
  };
  occupation_group: {
    concept_taxonomy_id: string;
    occupation_group_label: string;
    ssyk: string;
  };
  occupation_label: string;
}

export interface IEnrichedCompetence {
  term: string;
  percent_for_occupation: number;
}

export default IRelatedOccupation;
