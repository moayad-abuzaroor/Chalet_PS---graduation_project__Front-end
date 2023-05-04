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


export function UserProfile({route}){

    const images ={
        c11:require("../images/chaletImages/c11.jpeg"),
        c12:require("../images/chaletImages/c12.jpeg"),
        c21:require("../images/chaletImages/c21.jpg"),
        c22:require("../images/chaletImages/c22.jpg"),
        c31:require("../images/chaletImages/c31.jpg"),
        c32:require("../images/chaletImages/c32.jpg"),
        c41:require("../images/chaletImages/c41.jpg"),
        c42:require("../images/chaletImages/c42.jpg"),
        c51:require("../images/chaletImages/c51.jpg"),
        c52:require("../images/chaletImages/c52.jpg"),
        c61:require("../images/chaletImages/c61.jpg"),
        c62:require("../images/chaletImages/c62.jpg"),
        c71:require("../images/chaletImages/c71.jpeg"),
        c72:require("../images/chaletImages/c72.jpg"),
    }

    let pathh;

    function pic(pict){
        switch(pict){
            case 'c11.jpeg':  pathh=images.c11; break;
            case 'c12.jpeg':  pathh=images.c11; break;
            case 'c21.jpg':  pathh=images.c21; break;
            case 'c22.jpg':  pathh=images.c22; break;
            case 'c31.jpg':  pathh=images.c31; break;
            case 'c32.jpg':  pathh=images.c32; break;
            case 'c41.jpg':  pathh=images.c41; break;
            case 'c42.jpg':  pathh=images.c42; break;
            case 'c51.jpg':  pathh=images.c51; break;
            case 'c52.jpg':  pathh=images.c52; break;
            case 'c61.jpg':  pathh=images.c61; break;
            case 'c62.jpg':  pathh=images.c62; break;
            case 'c71.jpeg':  pathh=images.c71; break;
            case 'c72.jpg':  pathh=images.c72; break;
            
        }
    }

    const navigation = useNavigation();
    const[confirmOut,setConfirmOut]=useState(false)
    const [plzSelect,setPlzSelect]=useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    const[dataa,setData]=useState({})

    const[books,setBooks]=useState([])

    //console.log(dataa.name)
    
    const[haveChalet,setHaveChalet]=useState(false)

    async function getBooks(){
        await fetch(`http://192.168.0.189:3500/getChalet?search=${route.params.data.name}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            
                setBooks(json)
            
            console.log(json)
        });
    }

    async function getChalets(){
        await fetch("http://192.168.0.189:3500/findChaletOwner",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                nam:route.params.data.name
            })
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            if(json==null){
                setHaveChalet(false)
            }
            else{
                setData(json)
                setHaveChalet(true)
            }
            //console.log(json)
        });
    }

    useEffect( () => {
        getChalets();
        getBooks();
    }, [] );

    async function rentChalet(){
        await fetch("http://192.168.0.189:3500/rentOwner",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                chaletName:dataa.name, 
                date:dayy
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            console.log(
                "POST Response rent",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .done();
    }

    const ListFooter = () => {
        //View to set in Footer
        return (
          <View style={styles.headerFooterStyle}>
          </View>
        );
      };

    const nextDate = [
        '2022-11-28',
        '2021-06-29',
        '2021-07-04',
        '2021-07-05',
        '2021-09-06',
        '2021-08-05',
      ];
      
    let mark = {};
    dataa.date?.forEach(day => {
    mark[day] = {
        selected: true,
        selectedColor:'red'
    };
    });
    

    const [dayy,setDayy]=useState("");

    function modalSet(){
        if(dayy==""){
            setPlzSelect(true)
        }
        else{
            if(dataa.date.includes(dayy))
            {
                setModal2Open(true);
            }
            else {
                setModalOpen(true);
                rentChalet();
            }
            setPlzSelect(false)
        }
    }

    return(
        <ScrollView>
            <Dialog
             visible={confirmOut} onTouchOutside={()=>setConfirmOut(false)}
             dialogTitle={<DialogTitle title="Are you sure you want to LogOut?" />}
             footer={
                <DialogFooter>
                  <DialogButton
                    text="Yes"
                    onPress={() => {navigation.navigate('login'), setConfirmOut(false)}}
                  />
                  <DialogButton
                    text="No"
                    onPress={() => {setConfirmOut(false)}}
                  />
                </DialogFooter>
              }
             >
                
            </Dialog>
            <Modal visible={modal2Open} animationType='slide'>
            <View style={styles.modalContent}>
            <MaterialIcons 
                name='close'
                size={24} 
                style={{...styles.modalToggle, ...styles.modalClose}} 
                onPress={() => setModal2Open(false)} 
                />
                <AntDesign name="closecircle" size={154} color="red" style={{paddingHorizontal:120, marginTop:30}} />
                <View style={{flexDirection:'column', marginTop:30, marginHorizontal:30}}>
                <Text style={{
                        fontFamily:'monospace',fontWeight:'bold', fontSize:24, marginBottom:25
                    }}>Sorry! Try again with different Date</Text>
                <TouchableOpacity onPress={()=> setModal2Open(false)} style={{
                        backgroundColor:'#4380e0',
                        width:300,
                        marginTop:20,
                        justifyContent:"center",
                        alignItems:"center",
                        height:30,
                        borderRadius:15
                    }}>
                    <Text style={{color:'white', fontWeight:'bold', fontFamily:'monospace'}}>Back</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Modal visible={modalOpen} animationType='slide'>
            <View style={styles.modalContent}>
                <MaterialIcons 
                name='close'
                size={24} 
                style={{...styles.modalToggle, ...styles.modalClose}} 
                onPress={() => setModalOpen(false)} 
                />

                <Ionicons name="ios-checkmark-done-circle-sharp" size={154} color="green"
                    style={{paddingHorizontal:120, marginTop:30}}
                />

                <View style={{flexDirection:'column', marginTop:30, marginHorizontal:30}}>
                <Text style={{
                        fontFamily:'monospace',fontWeight:'bold', fontSize:24, marginBottom:25
                    }}>Date now is <Text style={{color:'red'}}>closed</Text></Text>
                    
                </View>                

            </View>
        </Modal>
        <View style={styles.container} >
            <View style={{
                flexDirection:'column',justifyContent:'center', marginTop:0, backgroundColor:'#4380e0',
                height:220, borderBottomLeftRadius:100,borderBottomRightRadius:100
                }}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('home')}>
                            <Ionicons name="arrow-back" size={34} color="white" style={{marginLeft:10,marginTop:20}}/>
                        </TouchableOpacity>                    
                        <Ionicons name="person-circle-outline" size={84} color="white" style={{marginTop:10,marginLeft:110}}/>
                        <TouchableOpacity onPress={() => setConfirmOut(true)}>
                            <AntDesign name="login" size={26} color="white" style={{marginLeft:100,marginTop:30}} />
                        </TouchableOpacity>
                    </View> 
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{
                            fontFamily:'monospace', fontWeight:'bold',fontSize:26,color:'white'
                            }}>{route.params.data.name}
                        </Text>
                        <Text style={{
                            fontFamily:'monospace', fontWeight:'bold',fontSize:16,color:'white', marginTop:15
                            }}>{route.params.data.email}</Text>
                    </View>                   
            </View>

            <View style={{marginTop:40}}>
                <View style={styles.input}>
                    <Ionicons name="ios-person-outline" size={24} color="black" />
                    <TextInput placeholder="User Name" style={styles.textInput}/>
                </View>
                <View
                    style={{
                        marginTop:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />

                <View style={styles.input}>
                    <AntDesign name="mobile1" size={24} color="black" />
                    <TextInput placeholder="Mobile Number" keyboardType='numeric' style={styles.textInput}/>
                </View>
                <View
                    style={{
                        marginTop:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={styles.input}>
                    <MaterialCommunityIcons name="onepassword" size={24} color="black" />
                    <TextInput placeholder="New Password" secureTextEntry={true} style={styles.textInput}/>
                </View>
                <View
                    style={{
                        marginTop:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={styles.input}>
                    <MaterialCommunityIcons name="onepassword" size={24} color="black" />
                    <TextInput placeholder="Confirm Password" secureTextEntry={true} style={styles.textInput}/>
                </View>
                <View
                    style={{
                        marginTop:10,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </View>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.calendar}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Your reservations</Text>
                <View style={styles.card}>
                    <FlatList
                            horizontal={false}
                            data={books.chale}
                            ListFooterComponent={ListFooter}
                            renderItem={({item}) => (
                                <View>
                                    {pic(item.pictureName)}
                                <Card>
                                    <View style={{flexDirection:"row", marginBottom:5}}>
                                        <Fontisto name="date" size={16} color="black" style={{marginRight:10}} />
                                        <Text style={styles.cardLocation}>{item.dateE}</Text>                                   
                                    </View>                           
                                    <Image source={pathh} style={styles.cardImage} />
                                    <Text style={styles.cardTitile}>{item.chaletName}</Text>
                                    <Text style={{fontSize:10, fontFamily:'monospace',marginTop:5}}>
                                        Call <Text style={{fontWeight:'bold'}}>0599975252</Text> for details</Text>
                                    
                                </Card>

                                
                                
                                </View>
                            )}
                    />
                </View>
            </View>

            {haveChalet && <View style={styles.books}>                
                <View style={styles.calendar}>
                <Text style={{fontWeight:'bold', fontSize:18}}>Edit Chalet Books</Text>
                <Text style={{fontFamily:'monospace', fontWeight:'bold' ,marginVertical:10}}>{dataa.name}</Text>
                <View style={{flexDirection:'row', marginBottom:10}}>
                        <FontAwesome name="circle" size={20} color="red" style={{marginLeft:10}} />
                        <Text style={{marginLeft:5, fontFamily:'monospace'}}>Not Available</Text>
                </View>
                    <Calendar
                        onDayPress={date=>{
                            setDayy(date.dateString)
                        }}                    
                        markedDates={mark}
                        
                    />

                    <Text style={{marginTop:12, color:'green', fontFamily:'monospace', fontWeight:'bold'}}>Selected Day: {dayy}</Text>

                    <View>
                        <Pressable  style={styles.buttonBook} onPress={modalSet} >
                            <Text style={{color:'white', fontWeight:'bold', fontFamily:'monospace'}}>Close Date</Text>
                        </Pressable>
                    </View>
                    {plzSelect&&<Text style={{color:'red', fontSize:13}}>Please select day</Text>}
                </View>
            </View>}
            
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
      
    },
    input:{
        flexDirection:'row',
        marginHorizontal:20,
        marginTop:20
    },
    textInput:{
        
        width:200,
        marginLeft:10   
    },
    editButton:{
        width:200,
        height:50,
        flexDirection:'row', 
        marginBottom:10,
        marginTop:20,          
        marginLeft:100,
        marginRight:20, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: '#4380e0',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 0.95,
        shadowRadius: 3.84,
        elevation:3,
        shadowColor:'black',
    },
    editText:{
        color:'white',
        fontFamily:'monospace',
        fontWeight:'bold'
    },
    books:{
        
    },
    calendar:{
        marginHorizontal:10,
        padding:20,
        marginTop:20,
        marginBottom:20,
        elevation:2,
        shadowRadius:7,
        borderColor:'#c5c7c7',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity:0.5,
        shadowColor:'black'
    },
    buttonBook:{ 
        flexDirection:'row', 
        marginBottom:10,
        marginTop:20,          
        marginLeft:20,
        marginRight:20, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 7,
        elevation: 3,
        backgroundColor: '#4380e0',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 0.95,
        shadowRadius: 3.84,
        elevation:3,
        shadowColor:'black',
        
      },
      modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
      },
      modalClose: {
        marginTop: 20,
        marginBottom: 0,
      },
      modalContent: {
        flex: 1,
      },
      card:{
          marginTop:10,
          paddingHorizontal:11,
          flex:1
      },
      cardImage:{
          width:260,
          height:100,
          borderRadius:10
      },
      cardTitile:{
          marginTop:8,
          fontWeight:"bold",
          fontFamily:'monospace'
      },
      cardLocation:{
          fontSize:10,
          marginBottom:5,
          fontFamily:'monospace'
      },
    
  });