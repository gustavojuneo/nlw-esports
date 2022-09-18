import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { api } from '../../services/api';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  useEffect(() => {
    async function getGameList() {
      const { data } = await api.get('/games');
      setGames(data);
    }
    getGameList();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..." />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList} />
      </SafeAreaView>
    </Background>
  );
}