import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
   
  const handleGoBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    async function getGameList() {
      const { data } = await api.get(`/games/${game.id}/ads`);
      setDuos(data);
    }
    getGameList();
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left" 
              color={THEME.COLORS.CAPTION_300}
              size={20} />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image 
          source={{ uri: game.bannerUrl }} 
          style={styles.cover} 
          resizeMode="cover" />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={ duos.length > 0 ? styles.contentList : styles.emptyListContent }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}