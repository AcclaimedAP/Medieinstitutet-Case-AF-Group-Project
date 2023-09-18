import './App.css';
import '@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import OccupationProvider from './reducers/OccupationReducer';

function App() {
  return (
    <>
      <OccupationProvider>
        <RouterProvider router={router}></RouterProvider>
      </OccupationProvider>
    </>
  );
}

export default App;
