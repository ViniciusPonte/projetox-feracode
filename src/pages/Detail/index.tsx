import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import { colors } from "../../assets/styles"
import { Player } from "../../components/Player"
import { football } from "../../config/football-api"
import { useFilter } from "../../context/filter"
import { RootStackParamList } from "../../routes"
import { api } from "../../services/api"
import { Page } from "./styles"

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>

interface Team{
    code: string,
    id: number,
    name: string,
    country: string,
    founded: number,
    logo: string,
    national: boolean
}

interface Venue{
    name: string,
    city: string,
    capacity: number,
    image: string,
    address: string,
    id: number,
    surface: string
}

interface Player{
    player: { 
        photo: string; 
        name: string; 
        age: number; 
        nationality: string; 
        height: string; 
        weight: string 
    }
}


export const Detail = (props: Props) => {
    const {season} = useFilter()
    const [team, setTeam] = useState<Team>();
    const [venue, setVenue] = useState<Venue>();
    const [players, setPlayers] = useState<Array<Player>>([])
    const [loaderTeam, setLoaderTeam] = useState(true);
    const [loaderPlayers, setLoaderPlayers] = useState(true);

    useEffect(() => {
        async function getTeamInfo(){
            await api.get(`/teams?id=${props.route.params.team}`, {
                headers: {
                    'x-rapidapi-host': football.host,
                    'x-rapidapi-key': football.key
                }
            })
            .then(response => {
                setTeam(response.data.response[0].team);
                setVenue(response.data.response[0].venue);
            })
            .then(() => setLoaderTeam(false))
            .catch(err => console.log(err))
        }   

        getTeamInfo();
    }, []);

    useEffect(() => {
        async function getTeamInfo(){
            setPlayers([]);

            await api.get(`/players?team=${props.route.params.team}&season=${season}`, {
                headers: {
                    'x-rapidapi-host': football.host,
                    'x-rapidapi-key': football.key
                }
            })
            .then(response => {
                response.data.response.map((plr: Player) => {
                    const data = {
                        player: {
                            photo: plr.player.photo,
                            name: plr.player.name,
                            age: plr.player.age,
                            nationality: plr.player.nationality,
                            height: plr.player.height,
                            weight: plr.player.weight
                        }
                    }

                    setPlayers(old => [...old, data])
                })
            })
            .then(() => setLoaderPlayers(false))
            .catch(err => console.log(err))
        }   

        getTeamInfo();
    }, []);

    return (
        <Page>
            {loaderTeam ? <ActivityIndicator size={30} color={colors.primary}/> : (
                <>
                {team && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 40}}>
                        <Image style={{width: 100, height: 100}} source={{uri: team.logo}}/>
                        <View>
                            <Text style={{fontFamily: 'Poppins_800ExtraBold', fontSize: 20}}>{team.name}</Text>
                            <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18, textAlign: 'center'}}>{team.country} - {team.founded}</Text>
                        </View>
                    </View>
                )}

                {venue && (
                    <View style={{marginBottom: 40}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18}}>Estádio - {venue.name}</Text>
                        <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16}}>Capacidade: {venue.capacity} pessoas</Text>
                        <View style={{borderRadius: 20}}>
                            <Image style={{height: 160, borderRadius: 20}} source={{uri: venue.image}}/>
                        </View>
                    </View>
                )}
                </>
            )}
            
            {loaderPlayers ? <ActivityIndicator size={30} color={colors.primary}/> : (
                <>
                {players.length > 0 && (
                    <View style={{marginBottom: 40}}>
                        <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 18}}>Jogadores</Text>

                        {players.map(player => 
                            <Player 
                                age={player.player.age} 
                                height={player.player.height}
                                name={player.player.name} 
                                nationality={player.player.nationality}
                                photo={player.player.photo}
                                weight={player.player.weight}
                            />
                        )}
                    </View>
                )}
                </> 
            )}
            
        </Page>
    )
}