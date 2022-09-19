import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'

import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input'
import { api } from '../services/api';

interface Game {
  id: string;
  title: string;
}

interface Props {
  handleCloseDialog: () => void;
}

export function CreateAdModal({ handleCloseDialog }: Props) {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await api.post(`games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel === 'on' ? true : false
      });

      handleCloseDialog();
      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err);
      alert('Erro ao criar anúncio!');
    }
  }

  useEffect(() => {
    async function getGameList() {
      const { data } = await api.get("games");

      setGameList(data);
    } 

    getGameList();
  }, [])

  return (
    <Dialog.Portal>
      <div className="fixed w-full h-full inset-0 bg-black/50"/>
      <Dialog.Content className="fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-black/25 rounded-lg">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="game">Qual o game?</label>
            <Select.Root name="game">
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 flex justify-between items-center">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown size={24} />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="absolute bg-zinc-700 rounded-lg top-12 left-7 w-[94.5%]">
                  <Select.ScrollUpButton className="flex items-center justify-center py-2 color-zinc-900 cursor-default">
                    <CaretUp size={20} className="text-zinc-800" />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="py-3 px-4 flex flex-col gap-1">
                    {gameList.map(game => (
                      <Select.Item 
                        key={game.id} 
                        className="text-white text-sm flex items-center select-none relative pl-8 pr-5 py-2 rounded radix-highlighted:bg-zinc-800" value={game.id}>
                        <Select.ItemText>
                          {game.title}
                        </Select.ItemText>
                        <Select.ItemIndicator 
                          className="absolute left-1 w-25 h-25 inline-flex items-center justify-center">
                          <Check size={20} className="text-emerald-400" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex items-center justify-center py-2 color-zinc-900 cursor-default">
                    <CaretDown size={20} className="text-zinc-800" />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)?</label>
            <Input id="name" name="name" placeholder="Como te chama dentro do jogo?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root 
                type="multiple" 
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}>
                <ToggleGroup.Item 
                  value="0" 
                  title="Domingo"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="1" 
                  title="Segunda"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="2" 
                  title="Terça"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="3" 
                  title="Quarta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="4" 
                  title="Quinta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5" 
                  title="Sexta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="6" 
                  title="Sábado"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500">
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-2 items-center">
            <Checkbox.Root id="useVoiceChannel" name="useVoiceChannel" className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
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
  )
}