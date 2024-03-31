import { ChangeEvent, useCallback, useEffect, useState } from 'react';

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
  const [search, setSearch] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearch(query);
  };

  const filteredData =
    search !== ''
      ? data.filter((item) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : data;

  const handleList = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/people/');
    const result = await response.json();

    setData(result.results);
  }, []);

  useEffect(() => {
    handleList();
  }, [data.length, handleList]);

  return (
    <div className='bg-background-image bg-no-repeat bg-cover bg-center w-screen md:h-screen max-w-full space-y-6 py-12 px-12 md:px-20 lg:px-28'>
      <div className='w-full flex justify-center'>
        <img className='md:h-36' src={logo} alt='NLW Expert' />
      </div>

      <form className='w-full'>
        <input
          type='text'
          placeholder='Search character...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-300 text-yellow-400'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-auto'>
        {filteredData.map((character) => {
          return (
            <CharacterCard key={crypto.randomUUID()} character={character} />
          );
        })}
      </div>
    </div>
  );
}
