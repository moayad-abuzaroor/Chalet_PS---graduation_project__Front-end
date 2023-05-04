import React, { useState, Component, useEffect  } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Image, ImageBackground, FlatList, ScrollView,SliderBase } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";

import Card from "./card";

export default function  AllChaletHome({navigation, route}) {

    const[search,setSearch]=useState("")
    console.log(route.params.data.name)
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
            case 'c72.jpeg':  pathh=images.c72; break;
            
        }
    }

    const [inPrice,setInPrice] = useState(false)
    const [inNew,setInNew] = useState(false)

    const [flag,setFlag]=useState(0)
    const [flagNew, setFlagNew]=useState(0)

    function viewChalet(){
        if(flag==0){
            getFilterPrice()
            setFlag(1)
        }
        else{
            getChalets()
            setInPrice(false)
            setFlag(0)
        }
    }

    function viewNewChalet(){
        if(flagNew==0){
            getFilterNew()
            setFlagNew(1)
        }
        else{
            getChalets()
            setInNew(false)
            setFlagNew(0)
        }
    }

    const [dataa,setData]=React.useState({})
    async function getChalets(){
        await fetch("http://192.168.0.189:3500/chalet",{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            setData(json)
            console.log(json)
        });
    }

    useEffect( () => {
        getChalets();
    }, [] );

    async function getFilterPrice(){
        await fetch("http://192.168.0.189:3500/filter",{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            setInPrice(true)
            setData(json.chale)
            console.log(json)
        });
    }

    async function getFilterNew(){
        await fetch("http://192.168.0.189:3500/filter?sort=createdAt,desc",{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            setInNew(true)
            setData(json.chale)
            console.log(json)
        });
    }

    async function getSearch(x){
        await fetch(`http://192.168.0.189:3500/filter?search=${x}`,{
            method:'GET',
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.json())
        .catch((error) => console.log("fetch error", error))
        .then(json => {
            //setInPrice(true)
            setData(json.chale)
            console.log(json)
        });
    }

    function countPlus(namee){
        fetch("http://192.168.0.189:3500/rec",{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:route.params.data.name, chaletName:namee
            })
        })
            .then((response) => {response.json() ;                
            })
            .catch("error")
            .then((responseData) => {
                
                console.log(
                    "PUT Response",
                    "Response Body -> " + JSON.stringify(responseData)
                )
            })
            
    }


    const ListFooter = () => {
        //View to set in Footer
        return (
          <View style={styles.headerFooterStyle}>
          </View>
        );
      };

    const[city,setCity]=useState("")  

    if(city==0||city==""){

    }


    return(
        <View style={styles.container}>
            <ImageBackground source={require('../images/back.jpg')} style={styles.backGround}>
            <View style={styles.head}></View>
            </ImageBackground>
            <View style={styles.header}>
                <Image
                    source={require('../images/logo.png')}
                    style={{width:35, height:35}}
                />
                <Text
                    style={{fontFamily:'monospace', fontSize:24, marginHorizontal:15, fontWeight:"bold"}}
                >
                    ChaletPS</Text>
            </View>
            <View style={styles.headTitle}>
                <Text style={styles.title}>ChaletPS</Text>
                <Text style={styles.title}>Your Second Home ...</Text>
            </View>
            
            <View style={styles.searchBar}>
                <View style={styles.searchType}>
                <View style={{flexDirection:"row",  alignItems:'center', marginLeft:12, justifyContent:'center'}}>
                <Text style={styles.listTitle}>Search:</Text>
                <TextInput
                    style={{
                        marginLeft:0,
                        borderBottomWidth:0,
                        marginTop:5,
                        width:130,                       
                        marginBottom:0,
                        height:40
                    }}                    
                    value={search}
                    onChangeText={(value)=>{getSearch(value), setSearch(value)}}
                />
            </View>
                    
                </View>

                
              
                <Pressable style={styles.buttonSearch} onPress={getSearch}>
                    <Ionicons name="md-search-sharp" size={24} color="white" />                   
                </Pressable>
            </View>
            <View style={styles.locationSearch}>                          
                        <Picker
                         style={{marginLeft:20, width:200}}
                         selectedValue={city}
                         onValueChange={(itemValue, itemIndex) =>
                           setCity(itemValue)
                         }
                        >
                        <Picker.Item label="Location" value="0" />
                        <Picker.Item label="Nablus" value="Nablus" />
                        <Picker.Item label="Nassarieh" value="Nassarieh" />
                        <Picker.Item label="Jericho" value="Jericho" />
                        <Picker.Item label="Ramallah" value="Ramallah" />
                        <Picker.Item label="Bethlehem" value="Bethlehem" />
                        </Picker>                    
                                              
                    </View>
            
            

            <View style={styles.listBy}>
                <Text style={styles.listTitle}>List By:</Text>
                <View style={styles.listDetails}>
                    <TouchableOpacity style={styles.listType} onPress={viewChalet}>
                        {!inPrice && <FontAwesome5 name="dollar-sign" size={14} color="black" style={{marginHorizontal:5}} />}
                        {!inPrice && <Text>Price</Text>}
                        {inPrice && <FontAwesome5 name="dollar-sign" size={14} color="#4380e0" style={{marginHorizontal:5}} />}
                        {inPrice && <Text style={{color:'#4380e0'}}>Price</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listType2} onPress={viewNewChalet}>
                        {!inNew && <AntDesign name="clockcircleo" size={14} color="black" style={{marginHorizontal:5}}/>}
                        {!inNew && <Text>Newest</Text>}
                        {inNew && <AntDesign name="clockcircleo" size={14} color="#4380e0" style={{marginHorizontal:5}}/>}
                        {inNew && <Text style={{color:'#4380e0'}}>Newest</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.card}>
                <FlatList
                    data={dataa}
                    ListFooterComponent={ListFooter}
                    renderItem={({item}) => (
                        <View>
                            {pic(item.pictureS)}
                        {item.city==city && <Card>
                        <View style={{flexDirection:"row",}}>
                                <Entypo name="location-pin" size={16} color="black" style={{marginRight:5}}/>
                                <Text style={styles.cardLocation}>{item.city}</Text>
                                <EvilIcons name="star" size={20} color="black" style={{marginLeft:160}} />
                                <Text style={{fontSize:12}}>{parseFloat(item.ratingV).toFixed(1)}</Text>
                            </View>
                            <Image source={pathh} style={styles.cardImage} />                        
                            <Text style={styles.cardTitile}>{item.name}</Text>
                            <Text style={styles.cardTitile}>${item.price}</Text>                            
                            <View style={styles.detailContent}>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/pool.png')}/>
                                    <Text style={styles.iconText}>{item.nofPools}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bedroom.png')}/>
                                    <Text style={styles.iconText}>{item.nofRoom}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bath.png')}/>
                                    <Text style={styles.iconText}>{item.nofBath}</Text>
                                </View>
                                {item.parking && <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/parking.png')}/>
                                    <MaterialIcons
                                        name="done-outline"
                                        size={16} color="black" style={{marginVertical:5, marginHorizontal:5}}
                                        />
                                </View>}
                            </View>
                            <Pressable style={styles.button} onPress={() =>{ navigation.navigate('ImagesSlider', item), countPlus(item.name)}}>
                                <Text style={styles.text}>Details</Text>
                            </Pressable>
                        </Card>}
                        {city=="" &&<Card>
                        <View style={{flexDirection:"row",}}>
                                <Entypo name="location-pin" size={16} color="black" style={{marginRight:5}}/>
                                <Text style={styles.cardLocation}>{item.city}</Text>
                                <EvilIcons name="star" size={20} color="black" style={{marginLeft:160}} />
                                <Text style={{fontSize:12}}>{parseFloat(item.ratingV).toFixed(1)}</Text>
                            </View>
                            <Image source={pathh} style={styles.cardImage} />
                            <Text style={styles.cardTitile}>{item.name}</Text>
                            <Text style={styles.cardTitile}>${item.price}</Text>                            
                            <View style={styles.detailContent}>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/pool.png')}/>
                                    <Text style={styles.iconText}>{item.nofPools}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bedroom.png')}/>
                                    <Text style={styles.iconText}>{item.nofRoom}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bath.png')}/>
                                    <Text style={styles.iconText}>{item.nofBath}</Text>
                                </View>
                                {item.parking && <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/parking.png')}/>
                                    <MaterialIcons
                                        name="done-outline"
                                        size={16} color="black" style={{marginVertical:5, marginHorizontal:5}}
                                        />
                                </View>}
                            </View>
                            <Pressable style={styles.button} onPress={() => {navigation.navigate('ImagesSlider', item), countPlus(item.name)}}>
                                <Text style={styles.text}>Details</Text>
                            </Pressable>
                        </Card>}

                        {city=="0" &&<Card>
                        <View style={{flexDirection:"row",}}>
                                <Entypo name="location-pin" size={16} color="black" style={{marginRight:5}}/>
                                <Text style={styles.cardLocation}>{item.city}</Text>
                                <EvilIcons name="star" size={20} color="black" style={{marginLeft:160}} />
                                <Text style={{fontSize:12}}>{parseFloat(item.ratingV).toFixed(1)}</Text>
                            </View>
                            <Image source={pathh} style={styles.cardImage} />
                            <Text style={styles.cardTitile}>{item.name}</Text>
                            <Text style={styles.cardTitile}>${item.price}</Text>                            
                            <View style={styles.detailContent}>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/pool.png')}/>
                                    <Text style={styles.iconText}>{item.nofPools}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bedroom.png')}/>
                                    <Text style={styles.iconText}>{item.nofRoom}</Text>
                                </View>
                                <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/bath.png')}/>
                                    <Text style={styles.iconText}>{item.nofBath}</Text>
                                </View>
                                {item.parking && <View style={styles.feature}>
                                    <Image style={styles.icons} source={require('../images/parking.png')}/>
                                    <MaterialIcons
                                        name="done-outline"
                                        size={16} color="black" style={{marginVertical:5, marginHorizontal:5}}
                                        />
                                </View>}
                            </View>
                            <Pressable style={styles.button} onPress={() =>{ navigation.navigate('ImagesSlider', item), countPlus(item.name)}}>
                                <Text style={styles.text}>Details</Text>
                            </Pressable>
                        </Card>}
                        
                        </View>
                    )}
                />
                
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>Copyright ©2022 All rights reserved to ChaletPS</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    head:{
        padding:50,       
        height:250,
    },
    title:{
        fontSize:22,
        fontWeight:'900',
        color:'black',
        marginTop:10,
        fontFamily:'monospace'
    },
    headTitle:{
        zIndex:9,
        marginTop:50,
        marginLeft:35,
        opacity:0.7
    },
    backGround:{
        opacity:0.35,
        position:"absolute",
        width:400
    },
    searchBar:{
        flexDirection:"row",
        marginHorizontal:24,
        width:350,
        marginTop:17,
        backgroundColor:'white',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        shadowColor:'black',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#d9d9d9'
    },
    searchText:{
        marginTop:15,
        marginLeft:10,
        fontSize:14,
        fontFamily:'monospace'
    },
    searchInput:{
        width:150,
        marginRight:20,
        marginLeft:5,
        paddingHorizontal:10,
        marginBottom:20,
        borderBottomWidth:1,
        marginTop:10,
        borderRadius:7,
        height:30,
        borderColor:'#9a9b9c'
    },
    card:{
        marginTop:20,
        paddingHorizontal:40,
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
    detailContent:{
        marginVertical:10,
        flexDirection:"row"
    },
    icons:{
        width:30,
        height:30
    },
    iconText:{
        marginHorizontal:10,
        fontSize:12,
        marginVertical:5
    },
    feature:{
        marginRight:30
    },
    button: {
        width:120,
        height:40,
        marginTop:5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'flex-end',
        paddingVertical: 7,
        paddingHorizontal: 22,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#4380e0',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 0.95,
        shadowRadius: 3.84,
        shadowColor:'black'
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      footer:{
        height:20,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'center'
      },
      footerText:{
        fontSize:8
      },
      buttonSearch:{ 
        flexDirection:'row',           
        marginLeft:70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 7,
        paddingHorizontal: 22,
        borderRadius: 7,
        elevation: 3,
        backgroundColor: '#4380e0',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 0.95,
        shadowRadius: 3.84,
        shadowColor:'black'
      },
      textButtonSearch:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginHorizontal:15
      },
      locationSearch:{
        flexDirection:'row',
        borderWidth:1,
        width:340,
        marginLeft:25,
        marginTop:15,
        borderRadius:15,
        backgroundColor:'white'
      },
      searchType:{
        flexDirection:"column"
      },
      listBy:{
        marginTop:20,
        paddingHorizontal:25,
        flexDirection:"row",
      },
      listDetails:{
        borderWidth:1,
        borderRadius:8,
        width:265,
        height:40,
        flexDirection:"row"
      },
      listTitle:{
        marginTop:7,
        marginRight:10,
        fontWeight:"bold",
        fontFamily:'monospace'
      },
      listType:{
        width:132,
        borderRightWidth:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
      },
      listType2:{
        width:132,
        borderRightWidth:0,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
      },
      header:{
        height:40,
        marginTop:44,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
      },
      recommended:{
        marginTop:30,
        marginHorizontal:32,
        flexDirection:"row"
      }

  });