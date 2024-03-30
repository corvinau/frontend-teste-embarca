import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import logo from './assets/logo-star-wars.svg';

import { CharacterCard } from './components/CharacterCard';

interface Character {
  id: string;
  name: string;
}

// {
//   "name": "Luke Skywalker",
//   "height": "172",
//   "mass": "77",
//   "hair_color": "blond",
//   "skin_color": "fair",
//   "eye_color": "blue",
//   "birth_year": "19BBY",
//   "gender": "male",
//   "homeworld": "https://swapi.dev/api/planets/1/",
//   "films": [
//     "https://swapi.dev/api/films/1/",
//     "https://swapi.dev/api/films/2/",
//     "https://swapi.dev/api/films/3/",
//     "https://swapi.dev/api/films/6/"
//   ],
//   "species": [],
//   "vehicles": [
//     "https://swapi.dev/api/vehicles/14/",
//     "https://swapi.dev/api/vehicles/30/"
//   ],
//   "starships": [
//     "https://swapi.dev/api/starships/12/",
//     "https://swapi.dev/api/starships/22/"
//   ],
//   "created": "2014-12-09T13:50:51.644000Z",
//   "edited": "2014-12-20T21:17:56.891000Z",
//   "url": "https://swapi.dev/api/people/1/"
// }

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
          placeholder='Procurar personagem...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-300 text-yellow-400'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-auto'>
        {filteredData.map((item) => {
          return <CharacterCard key={crypto.randomUUID()} character={item} />;
        })}
      </div>
    </div>
  );
}
