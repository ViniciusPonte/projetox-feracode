import { Select } from "../../components/Select"
import { useFilter } from "../../context/filter"
import { Page } from "./styles"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

export const Home = () => {
    const {setSeason, season, setLeague, league, leagues, seasons} = useFilter();

    const [items, setItems] = useState([
        {
            ranking: 1,
            name: 'Atlético paranaense',
            points: 30,
            goals: 9,
        },
        {
            ranking: 2,
            name: 'Corinthians',
            points: 28,
            goals: 8,
        },
        {
            ranking: 3,
            name: 'Palmeiras',
            points: 26,
            goals: 7,
        },
        {
            ranking: 4,
            name: 'Vasco da Gama',
            points: 20,
            goals: 4,
        },
        {
            ranking: 5,
            name: 'Flamengo',
            points: 14,
            goals: 2,
        },
    ])

    return (
        <Page>
            <Select options={seasons} onChange={setSeason} value={season} />
            <Select options={leagues} onChange={setLeague} value={league} />

            <ScrollView style={{flex: 1}}>
                <Grid>
                    <Row style={{maxHeight: 30, padding: 5}}>
                        <Col size={10}><Text style={{textAlign: 'center', alignItems: 'center'}}><Icon name="trophy" size={18} color="#ffec44"/></Text></Col>
                        <Col size={60}><Text style={{textAlign: 'center', fontWeight: 'bold'}}>Nome</Text></Col>
                        <Col size={15}><Text style={{textAlign: 'center', fontWeight: 'bold'}}>Pontos</Text></Col>
                        <Col size={15}><Text style={{textAlign: 'center', fontWeight: 'bold'}}>Gols</Text></Col>
                    </Row>
                    {items.map(item => (
                        <Row style={{maxHeight: 30, padding: 5}}>
                            <Col size={10}><Text style={{textAlign: 'center'}}>{item.ranking}</Text></Col>
                            <Col size={60}><TouchableOpacity onPress={() => console.log(item.name)}><Text  style={{textAlign: 'center'}}>{item.name}</Text></TouchableOpacity></Col>
                            <Col size={15}><Text style={{textAlign: 'center'}}>{item.points}</Text></Col>
                            <Col size={15}><Text style={{textAlign: 'center'}}>{item.goals}</Text></Col>
                        </Row>
                    ))}
                </Grid>
            </ScrollView>
            
        </Page>
    )
}