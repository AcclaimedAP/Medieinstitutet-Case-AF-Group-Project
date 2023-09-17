
interface IRelatedOccupation {
    concept_taxonomy_id: string,
    id: string,
    legacy_ams_taxonomy_id: string,
    occupation_group: {
        concept_taxonomy_id: string,
        occupation_group_label: string,
        ssyk: string,
    },
    occupation_label: string
}

export default IRelatedOccupation;