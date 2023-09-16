import { DigiButton } from '@digi/arbetsformedlingen-react';
import { ButtonVariation } from '@digi/arbetsformedlingen';
import { EduToWorkData } from "../service/EduToWorkService";

const Home = () => {
  const searchService = EduToWorkData();

  async function workTitles() {
    const result = await searchService.fetchWorkTitles();
    console.log(result);
  }

	return (
		<DigiButton onAfOnClick={workTitles} afVariation={ButtonVariation.PRIMARY}>Sök</DigiButton>
	);
};

export default Home;