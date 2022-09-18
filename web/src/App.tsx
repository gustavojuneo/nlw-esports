import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react';

import './styles/main.css'

import logoImg from './assets/logo.svg';
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [gameList, setGameList] = useState<Game[]>([])

  useEffect(() => {
    async function getGameList() {
      const { data } = await api.get("games");

      setGameList(data);
    } 

    getGameList();
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="NLW eSports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {gameList.map(game => (
          <GameBanner 
            key={game.id}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
            title={game.title} />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-black/25 rounded-lg">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="game">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)?</label>
                <Input id="name" placeholder="Como te chama dentro do jogo?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2">
                    <ToggleGroup.Item 
                      value="0" 
                      title="Domingo"
                      className="w-8 h-8 rounded bg-zinc-900">
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="1" 
                      title="Segunda"
                      className="w-8 h-8 rounded bg-zinc-900">
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="2" 
                      title="Terça"
                      className="w-8 h-8 rounded bg-zinc-900">
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="3" 
                      title="Quarta"
                      className="w-8 h-8 rounded bg-zinc-900">
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="4" 
                      title="Quinta"
                      className="w-8 h-8 rounded bg-zinc-900">
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="5" 
                      title="Sexta"
                      className="w-8 h-8 rounded bg-zinc-900">
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item 
                      value="5" 
                      title="Sábado"
                      className="w-8 h-8 rounded bg-zinc-900">
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-2 items-center">
                <Checkbox.Root id="useVoiceChannel" className="bg-white w-25 h-25 flex items-center justify-center">
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="useVoiceChannel">Costumo me conectar ao chat de voz</label>
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close aria-label="Cancelar" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>
                <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content> 
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
