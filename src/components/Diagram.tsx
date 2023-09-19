import { IEnrichedCompetence } from '../interfaces/IRelatedOccupation';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface IProps {
  diagramData: IEnrichedCompetence[];
  occupationLabel: string;
}

const Diagram = ({ diagramData, occupationLabel }: IProps) => {
  const data = {
    labels: diagramData.map((data) => data.term.toString()),
    datasets: [
      {
        label: occupationLabel,
        data: diagramData.map((data) => data.percent_for_occupation),
        backgroundColor: 'blue',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: '%',
        },
      },
    },
  };

  return (
    <>
      <h2 className='text-base'>
        De vanligaste kompetenserna som arbetsgivare efterfrågar för detta yrke,
        visat i %:
      </h2>
      <Bar className='w-full h-auto' data={data} options={options}></Bar>
    </>
  );
};

export default Diagram;
