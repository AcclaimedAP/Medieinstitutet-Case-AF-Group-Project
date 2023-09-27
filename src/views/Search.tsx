import { useState } from 'react';
import SearchResults from './Results';
import SearchForm from './SearchForm';
import {
  DigiIconArrowUp,
  DigiIconArrowDown,
} from '@digi/arbetsformedlingen-react';

const Search = () => {
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const toggleSearchWindow = () => {
    context?.state.isMenuOpen
      ? dispatch({ type: ToggleSearch.CLOSED })
      : dispatch({ type: ToggleSearch.OPENED });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        context?.state.isMenuOpen
      ) {
        dispatch({ type: ToggleSearch.CLOSED });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, context?.state.isMenuOpen]);

  return (
    <>
      <section className='laptop:hidden relative min-h-custom'>
        <SearchResults></SearchResults>
        <div
          ref={searchContainerRef}
          className={`fixed bottom-0 w-screen ${
            !context?.state.isMenuOpen && 'h-12'
          }`}
        >
          <button
            className={`${
              context?.state.isMenuOpen
                ? 'bg-accent absolute bottom-0'
                : 'bg-primary'
            } h-12 z-20 w-full flex justify-center items-center`}
            onClick={toggleSearchWindow}
          >
            {context?.state.isMenuOpen ? (
              <DigiIconArrowDown className='w-8 h-8 arrow-icon-down' />
            ) : (
              <DigiIconArrowUp className='w-8 h-8 arrow-icon-up' />
            )}
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              context?.state.isMenuOpen
                ? 'translate-y-0 opacity-1 visible'
                : 'translate-y-full opacity-0 invisible'
            } `}
          >
            <SearchForm></SearchForm>
          </div>
        </div>
      </section>

      <section className='hidden laptop:block'>
        <SearchResults />
        <SearchForm />
      </section>
    </>
  );
};

export default Search;
