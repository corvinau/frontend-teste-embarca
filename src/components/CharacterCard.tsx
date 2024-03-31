import { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface CharacterCardProps {
  character: {
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
  };
}

export function CharacterCard({ character }: CharacterCardProps) {
  const [homeworld, setHomeworld] = useState('');
  const [species, setSpecies] = useState('');

  const handleHomeworld = (url: string) => {
    fetch(`${url}`)
      .then((result) => result.json())
      .then((data) => setHomeworld(data.name));
  };

  const handleSpecies = (url: string) => {
    fetch(`${url}`)
      .then((result) => result.json())
      .then((data) => {
        setSpecies(data.name);
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger
        onClick={() => {
          handleHomeworld(character.homeworld);
          if (character.species.length !== 0) {
            handleSpecies(character.species);
          }
        }}
        className='rounded-md items-center flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400'>
        <p className='text-lg font-bold text-slate-300'>{character.name}</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed inset-0 text-center md:inset-auto overflow-hidden md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[550px] w-full md:h-[65vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 rounded-bl-md outline-none hover:ring-2 hover:ring-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-400'>
            <X className='size-5' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <p className='text-xl font-bold text-slate-300'>{character.name}</p>

            <div className='h-px bg-slate-400' />

            <p className='text-lg leading-6 text-slate-400'>
              <b>Height:</b>{' '}
              <span className='text-slate-300'>{character.height} cm</span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Mass:</b>{' '}
              <span className='text-slate-300'>{character.mass} kg</span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Hair color:</b>{' '}
              <span className='text-slate-300 capitalize'>
                {character.hair_color}
              </span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Skin color:</b>{' '}
              <span className='text-slate-300 capitalize'>
                {character.skin_color}
              </span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Eye color:</b>{' '}
              <span className='text-slate-300 capitalize'>
                {character.eye_color}
              </span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Birth year:</b>{' '}
              <span className='text-slate-300'>{character.birth_year}</span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Gender:</b>{' '}
              <span className='text-slate-300 capitalize'>
                {character.gender}
              </span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Homeworld:</b>{' '}
              <span className='text-slate-300'>{homeworld}</span>
            </p>
            <p className='text-lg leading-6 text-slate-400'>
              <b>Species:</b>{' '}
              <span className='text-slate-300'>{species || '-'}</span>
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
