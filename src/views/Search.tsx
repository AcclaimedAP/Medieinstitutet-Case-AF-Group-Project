import { useState } from 'react';
import SearchResults from './Results';
import SearchForm from './SearchForm';
import {
  DigiIconArrowUp,
  DigiIconArrowDown,
} from '@digi/arbetsformedlingen-react';

const Search = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <>
      <section className='tablet:hidden relative'>
        <SearchResults></SearchResults>
        <div className={`fixed bottom-0 w-screen ${!menuIsOpen && 'h-12'}`}>
          <button
            className={`${
              menuIsOpen ? 'bg-accent absolute bottom-0' : 'bg-primary'
            } h-12 z-20 w-full flex justify-center items-center`}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            {menuIsOpen ? (
              <DigiIconArrowDown className='w-8 h-8 arrow-icon-down' />
            ) : (
              <DigiIconArrowUp className='w-8 h-8 arrow-icon-up' />
            )}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              menuIsOpen
                ? 'translate-y-0 opacity-1 visible'
                : 'translate-y-full opacity-0 invisible'
            } `}
          >
            <SearchForm></SearchForm>
          </div>
        </div>
      </section>

      <section className='hidden tablet:block'>
        <SearchResults />
        <SearchForm />
      </section>
    </>
  );
};

export default Search;
