import { SelectLeagues, SelectSeasons } from "../../components/Select"
import { useFilter } from "../../context/filter"
import { Page } from "./styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { RootStackParamList } from "../../routes";
import { api } from "../../services/api";
import { football } from "../../config/football-api";
import { colors } from "../../assets/styles";

interface Team{
    team: { 
         id: number; 
         name: string; 
         logo: string; 
    }; 
    rank: number; 
    points: number; 
    goalsDiff: number; 
}

interface Item{
    id: number,
    ranking: number,
    name:  string,
    logo: string,
    points: number,
    goals: number
}

export const Home = () => {
    const {setSeason, season, setLeague, league, leagues, seasons} = useFilter();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [items, setItems] = useState<Array<Item>>([])
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        async function getClassificationTable(){
            setItems([]);
            setLoader(true);
            
            await api.get(`/standings?league=${league}&season=${season}`, {
                headers: {
                    'x-rapidapi-host': football.host,
                    'x-rapidapi-key': football.key
                }
            })
            .then(response => {
                response.data.response[0].league.standings.length > 0 && response.data.response[0].league.standings[0].map((team: Team) => {
                    let object = {
                        id: team.team.id,
                        ranking: team.rank,
                        name:  team.team.name,
                        logo: team.team.logo,
                        points: team.points,
                        goals: team.goalsDiff
                    }

                    setItems(old => [...old, object])
                })
            })
            .then(() => setLoader(false))
            .catch(err => console.log(err))
        }
        
        if(!season && !league){
            return
        } else {
            getClassificationTable()
        }
    }, [season, league])

    return (
        <Page>
            <SelectLeagues options={leagues} onChange={setLeague} value={league} ph="Selecione uma liga"/>
            
            <SelectSeasons options={seasons} onChange={setSeason} value={season} ph="Selecione um ano"/>

            {loader ? <ActivityIndicator size={30} color={colors.primary} style={{alignSelf: 'center'}}/> : (
                items.length > 0 ? (
                    <Grid style={{marginBottom: 40}}>
                        <Row style={{maxHeight: 40, padding: 10}}>
                            <Col size={10}><Text style={{textAlign: 'center', fontFamily: 'Poppins_600SemiBold', alignItems: 'center'}}><Icon name="trophy" size={18} color={colors.primary}/></Text></Col>
                            <Col size={10}></Col>
                            <Col size={50}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nome</Text></Col>
                            <Col size={30}><Text style={{textAlign: 'center', fontFamily: 'Poppins_600SemiBold'}}>Pontos</Text></Col>
                        </Row>
                        {items.map(item => (
                            <Row style={{maxHeight: 40, padding: 10}}>
                                <Col size={10}><Text style={{textAlign: 'center', fontFamily: 'Poppins_400Regular'}}>{item.ranking}</Text></Col>
                                <Col size={10}><Image style={{height: 20, width: 20}} source={{uri: item.logo}}/></Col>
                                <Col size={50}><TouchableOpacity onPress={() => navigation.navigate("Detalhes", {team: item.id, league})}><Text  style={{fontFamily: 'Poppins_400Regular'}}>{item.name}</Text></TouchableOpacity></Col>
                                <Col size={30}><Text style={{textAlign: 'center', fontFamily: 'Poppins_400Regular'}}>{item.points}</Text></Col>
                            </Row>
                        ))}
                    </Grid>
                ) : (
                    <View style={{padding: 16, backgroundColor: colors.secondary, borderRadius: 8}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold'}}>Não encontramos informações para esses filtros... 🙁 Por favor tente novamente.</Text>
                    </View>
                )
            )}
            
        </Page>
    )
}