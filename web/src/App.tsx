import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'

import logoImg from './assets/logo.svg';
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [openedDialog, setOpenedDialog] = useState(false);

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

      <Dialog.Root open={openedDialog} onOpenChange={setOpenedDialog}>
        <CreateAdBanner />
        <CreateAdModal handleCloseDialog={() => setOpenedDialog(false)} />
      </Dialog.Root>
    </div>
  )
}

export default App
