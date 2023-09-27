import { BarChartVariation } from '@digi/arbetsformedlingen';
import { IEnrichedCompetence } from '../interfaces/IRelatedOccupation';
import { DigiBarChart } from '@digi/arbetsformedlingen-react';

interface IProps {
  diagramData: IEnrichedCompetence[];
}

const Diagram = ({ diagramData }: IProps) => {
  const chartLineSeries = {
    yValues: diagramData.map((data) => data.percent_for_occupation),
    title: '%',
  };

  const chartData = {
    data: {
      xValues: diagramData.map((_, index) => index + 1),
      series: [chartLineSeries],
      xValueNames: diagramData.map((data) => data.term.toString()),
    },
    x: 'Kompetens',
    y: '%',
    title: 'Mest efterfrågade kompetenserna inom detta yrke, visat i %',
  };

  return (
    <>
      <DigiBarChart
        afChartData={chartData}
        afVariation={'horizontal' as BarChartVariation}
      ></DigiBarChart>
    </>
  );
};

export default Diagram;
