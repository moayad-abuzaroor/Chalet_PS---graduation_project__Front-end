import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Card(props){
    return(
        <View style={Styles.card}>
            <View style={Styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    card: {
      borderRadius:6,
      elevation:3,
      backgroundColor: '#fff',
      shadowOffset: {width:1, height:1},
      shadowColor:'#333',
      shadowOpacity:0.3,
      shadowRadius:3,
      marginHorizontal:4,
      marginVertical:6,
      width:300
    },
    cardContent:{
        fontSize:18,
        marginHorizontal:18,
        marginVertical:10,
    }
  });