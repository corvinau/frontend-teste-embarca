import { useCallback, useEffect, useState } from 'react';

import { ArrowRight, ArrowLeft } from 'lucide-react';

import logo from './assets/logo-star-wars.svg';

import { CharacterCard } from './components/CharacterCard';

interface Character {
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string;
}

export function App() {
  const [data, setData] = useState<Character[]>(() => {
    const data: Character[] = [];

    if (data.length !== 0) {
      return data;
    }
    return [];
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevPage = (prevPage: number) => {
    const newPage = prevPage - 1;
    setPage(newPage);
  };

  const handleNextPage = (nextPage: number) => {
    const newPage = nextPage + 1;
    setPage(newPage);
  };

  const handleList = useCallback(async () => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const result = await response.json();

    setData(result.results);
    setTotalPages(Math.round(result.count / 10 + 1));
  }, [page]);

  useEffect(() => {
    handleList();
  }, [page, handleList]);

  return (
    <div className='bg-background-image bg-no-repeat bg-cover bg-center w-screen md:h-screen max-w-full space-y-6 py-12 px-12 md:px-20 lg:px-28'>
      <div className='w-full flex justify-center'>
        <img className='md:h-36' src={logo} alt='NLW Expert' />
      </div>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-auto'>
        {data.map((character) => {
          return (
            <CharacterCard key={crypto.randomUUID()} character={character} />
          );
        })}
      </div>

      <div className='md:absolute inset-x-0 md:bottom-0'>
        <div className='flex justify-center items-center my-10 sm:mt-20'>
          <button
            className='bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded outline-none hover:ring-2 hover:ring-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400'
            onClick={() => handlePrevPage(page)}
            disabled={page === 1}>
            <ArrowLeft />
          </button>

          <span className='mx-3 text-lg bg-slate-800 p-1.5 rounded outline-none text-yellow-400'>
            Page {page} of {totalPages}
          </span>

          <button
            className='bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded outline-none hover:ring-2 hover:ring-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400'
            onClick={() => handleNextPage(page)}
            disabled={page === totalPages}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
