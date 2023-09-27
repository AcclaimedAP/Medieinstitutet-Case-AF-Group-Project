import './App.css';
import '@digi/arbetsformedlingen/dist/digi-arbetsformedlingen/digi-arbetsformedlingen.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import OccupationProvider from './reducers/OccupationReducer';
import ShowSearchProvider from './reducers/ShowSearchReducer';

function App() {
  return (
    <>
      <ShowSearchProvider>
        <OccupationProvider>
          <RouterProvider router={router}></RouterProvider>
        </OccupationProvider>
      </ShowSearchProvider>
    </>
  );
}

export default App;
