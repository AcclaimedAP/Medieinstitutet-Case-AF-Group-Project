import {
  DigiExpandableAccordion,
  DigiTypography,
} from '@digi/arbetsformedlingen-react';
import IRelatedOccupation, {
  IEnrichedCompetence,
} from '../interfaces/IRelatedOccupation';
import Diagram from './Diagram';
import { useEffect, useState } from 'react';
import { EduToWorkData } from '../service/EduToWorkService';
import LoadingSpinner from './LoadingSpinner';
import { TypographyVariation } from '@digi/arbetsformedlingen';
import { useSearchParams } from 'react-router-dom';
import { DigiExpandableAccordionCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';

interface IProps {
  occupation: IRelatedOccupation;
}

const OccupationAccordion = ({ occupation }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const idParamsCheck = () => {
    return searchParams.get('id') == occupation.id;
  };
  const [diagramData, setDiagramData] = useState<IEnrichedCompetence[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(idParamsCheck());
  const searchService = EduToWorkData();

  useEffect(() => {
    if (!isExpanded) return;

    const searchCompetencies = async (
      taxonomyId: string
    ): Promise<IRelatedOccupation> => {
      const result = await searchService.fetchCompetencies(taxonomyId);

      return result;
    };

    if (!diagramData.length) {
      searchCompetencies(occupation.concept_taxonomy_id)
        .then((res) =>
          setDiagramData(
            res.metadata.enriched_candidates_term_frequency.competencies.slice(
              0,
              10
            )
          )
        )
        .catch((err) => console.error(err));
    }
  }, [isExpanded]);

  const handleAccordionClick = (
    e: DigiExpandableAccordionCustomEvent<MouseEvent>
  ) => {
    const params = {
      title: searchParams.get('title') || '',
      desc: searchParams.get('desc') || '',
      page: searchParams.get('page') || '',
      id: searchParams.get('id') || '',
    };
    setIsExpanded((prev) => !prev);
    if (
      !params.title ||
      !params.desc ||
      e.target.classList.contains('buttonWrapper')
    ) {
      return;
    }
    if (params.id === occupation.id) {
      setSearchParams({
        title: params.title,
        desc: params.desc,
        page: params.page,
      });
    } else {
      setSearchParams({
        title: params.title,
        desc: params.desc,
        page: params.page,
        id: occupation.id,
      });
    }
  };

  return (
    <>
      <DigiExpandableAccordion
        afHeading={occupation.occupation_label}
        onAfOnClick={handleAccordionClick}
        afExpanded={idParamsCheck()}
      >
        <div className='m-5 flex flex-col gap-4'>
          <DigiTypography afVariation={TypographyVariation.SMALL}>
            <p>taxonomi ID: {occupation.concept_taxonomy_id}</p>
            <p>
              Arbetsgrupp: {occupation.occupation_group.occupation_group_label}
            </p>
          </DigiTypography>
          <div className='w-[300px] h-[400px] tablet:w-[500px] tablet:h-[500px]'>
            {diagramData.length ? (
              <Diagram diagramData={diagramData} />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </DigiExpandableAccordion>
    </>
  );
};

export default OccupationAccordion;
