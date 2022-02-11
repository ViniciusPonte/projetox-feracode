import { Image, Text, View } from "react-native"

interface PlayerProps {
    photo: string,
    name: string,
    age: number,
    nationality: string,
    height: string,
    weight: string
}

export const Player = (props: PlayerProps) => {
    return (
        <View style={{marginBottom: 20, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{borderRadius: 50}}>
                <Image style={{width: 100, height: 100, marginRight: 10, borderRadius: 50}} source={{uri: props.photo}}/>
            </View>
            <View>
                <Text style={{fontFamily: 'Poppins_400Regular'}}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nome: </Text>{props.name}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Idade: </Text>{props.age} anos</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Nacionalidade: </Text>{props.nationality}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Peso: </Text>{props.weight}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular'}}><Text style={{fontFamily: 'Poppins_600SemiBold'}}>Altura: </Text>{props.height}</Text>
            </View>
        </View>
    )
}