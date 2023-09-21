import { DigiExpandableAccordion, DigiTypography } from "@digi/arbetsformedlingen-react";
import IRelatedOccupation, { IEnrichedCompetence } from "../interfaces/IRelatedOccupation";
import Diagram from "./Diagram";
import { useEffect, useState } from "react";
import { EduToWorkData } from "../service/EduToWorkService";
import LoadingSpinner from "./LoadingSpinner";
import { useSearchParams } from "react-router-dom";

interface IProps {
  occupation: IRelatedOccupation;
}

const OccupationAccordion = ({ occupation }: IProps) => {
  const [diagramData, setDiagramData] = useState<IEnrichedCompetence[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const searchService = EduToWorkData();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!isExpanded) return;

    const searchCompetencies = async (taxonomyId: string): Promise<IRelatedOccupation> => {
      const result = await searchService.fetchCompetencies(taxonomyId);

      return result;
    };

    if (!diagramData.length) {
      searchCompetencies(occupation.concept_taxonomy_id)
        .then((res) => setDiagramData(res.metadata.enriched_candidates_term_frequency.competencies.slice(0, 10)))
        .catch((err) => console.error(err));
    }
  }, [isExpanded]);

  const handleAccordionClick: React.MouseEventHandler<HTMLDigiExpandableAccordionElement> = () => {
    const params = {
      title: searchParams.get("title") ? searchParams.get("title") : "",
      desc: searchParams.get("desc") ? searchParams.get("desc") : "",
      id: searchParams.get("id") ? searchParams.get("id") : "",
    };
    setIsExpanded((prev) => !prev);
    if (params.title === null || params.desc === null) {
      return;
    }
    if (params.id === occupation.id) {
      setSearchParams({ title: params.title, desc: params.desc });
    } else {
      setSearchParams({ title: params.title, desc: params.desc, id: occupation.id });
    }
  };

  return (
    <>
      <DigiExpandableAccordion afHeading={occupation.occupation_label} onClick={handleAccordionClick}>
        <div className="m-5 flex flex-col gap-4">
          <DigiTypography>
            <p>taxonomi ID: {occupation.concept_taxonomy_id}</p>
            <p>Arbetsgrupp: {occupation.occupation_group.occupation_group_label}</p>
          </DigiTypography>
          <div className="w-[250px] h-[400px] tablet:w-[500px] tablet:h-[500px]">{diagramData.length ? <Diagram diagramData={diagramData} /> : <LoadingSpinner />}</div>
        </div>
      </DigiExpandableAccordion>
    </>
  );
};

export default OccupationAccordion;
