import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Image, ImageBackground, FlatList, ScrollView,SliderBase,Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Calendar } from "react-native-calendars";
import {useNavigation} from '@react-navigation/native';
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 

import Card from "./card";

export function Chat({route}){

    const navigation = useNavigation();


    const[flag,setFlag]=useState(false)


    const [msgs,SetMsgs]=useState([
        
    ])

    const [newMsgs, setNewMsgs]=useState({
        username:route.params.data.name,
        message:""
    })
    console.log(newMsgs.message)

    function sendMsg(){
        SetMsgs([...msgs, newMsgs]);
        setNewMsgs({
            message:""
        })
        fetch("http://192.168.0.189:3500/messages",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:route.params.data.name, messagee:newMsgs.message
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            console.log(
                "POST Response comment",
                "Response Body -> " + JSON.stringify(responseData),
            )
        })
        
    }

    async function getMsgs(){
        await fetch("http://192.168.0.189:3500/messages",{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            SetMsgs(json)
            console.log(msgs)
        });
    }

    useEffect( () => {
        getMsgs();
    }, [] );

    return(
        <View>
            <View style={{
                flexDirection:'column',justifyContent:'center', marginTop:0, backgroundColor:'#4380e0',
                height:220, borderBottomLeftRadius:100,borderBottomRightRadius:100
                }}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('home')}>
                            <Ionicons name="arrow-back" size={34} color="white" style={{marginLeft:10,marginTop:20}}/>
                        </TouchableOpacity>                    
                        <Ionicons name="person-circle-outline" size={84} color="white" style={{marginTop:10,marginLeft:110}}/>
                        
                    </View> 
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{
                            fontFamily:'monospace', fontWeight:'bold',fontSize:26,color:'white'
                            }}>{route.params.data.name}
                        </Text>                        
                    </View>                   
            </View>
            <View style={{marginTop:20}}>
                <FlatList
                style={{height:550}}
                    data={msgs}
                    renderItem={({item}) => (
                        <View style={{marginVertical:5, marginHorizontal:7}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>                                                                   
                                <Ionicons name="person" size={24} color="black" />
                                <Text style={{marginHorizontal:10, fontSize:14, fontWeight:'bold'}}>
                                    {item.username}
                                </Text>
                            </View>
                            <Text style={{marginHorizontal:35}}>{item.message}</Text>
                            <View
                            style={{
                                marginTop:15,
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                            />
                        </View>

                    )}
                />

                <View style={{flexDirection:'row', alignItems:'center', marginLeft:15}}>
                <Ionicons name="chatbubble" size={20} color="black" />
                    <TextInput
                        style={{marginLeft:10, width:280,}}
                        placeholder="Send Message"
                        value={newMsgs.message}
                        onChangeText={(val)=>setNewMsgs({
                            username:route.params.data.name,
                            message:val
                        })}
                    />
                    <TouchableOpacity onPress={sendMsg}>
                        <Ionicons style={{marginLeft:20}} name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

}