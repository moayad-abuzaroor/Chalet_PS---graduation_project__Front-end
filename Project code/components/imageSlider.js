
import React, { useState, Component,useEffect  } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Image, ImageBackground, Dimensions,ScrollView, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import CalendarPicker from 'react-native-calendar-picker';
import { Calendar } from "react-native-calendars";
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons'; 
import { Rating } from 'react-native-ratings'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';



export default function ImagesSlider({route}){

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

    let pathh1;
    let pathh2;

    function pic1(pict){
        switch(pict){
            case 'c11.jpeg':  return images.c11; break;
            case 'c12.jpeg':  return images.c11; break;
            case 'c21.jpg':  return images.c21;
            case 'c22.jpg':  return images.c22;
            case 'c31.jpg':  return images.c31; break;
            case 'c32.jpg':  return images.c32; break;
            case 'c41.jpg':  return images.c41; break;
            case 'c42.jpg':  return images.c42; break;
            case 'c51.jpg':  return images.c51; break;
            case 'c52.jpg':  return images.c52; break;
            case 'c61.jpg':  return images.c61; break;
            case 'c62.jpg':  return images.c62; break;
            case 'c71.jpeg':  return images.c71; break;
            case 'c72.jpeg':  return images.c72; break;
            
        }
    }
    function pic2(pict){
        switch(pict){
            case 'c11.jpeg':  return images.c11; break;
            case 'c12.jpeg':  return images.c11; break;
            case 'c21.jpg':  return images.c21; 
            case 'c22.jpg':  return images.c22; 
            case 'c31.jpg':  return images.c31; break;
            case 'c32.jpg':  return images.c32; break;
            case 'c41.jpg':  return images.c41; break;
            case 'c42.jpg':  return images.c42; break;
            case 'c51.jpg':  return images.c51; break;
            case 'c52.jpg':  return images.c52; break;
            case 'c61.jpg':  return images.c61; break;
            case 'c62.jpg':  return images.c62; break;
            case 'c71.jpeg':  return images.c71; break;
            case 'c72.jpeg':  return images.c72; break;
            
        }
    }


    const [rentName,setRentName]=useState("")
    const [rentNumber,setRentNumber]=useState("")
    const [rate,setRate]=useState("")
    const [adminRes,setAdminRes]=useState(false)
    const [plzSelect,setPlzSelect]=useState(false)


    async function getChalets(){
        setComments([...comments, newComments]);
        await fetch("http://192.168.0.189:3500/comment",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                nam:route.params.name, comment:newComments
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
        .done();
    }

    async function rentChalet(){
        await fetch("http://192.168.0.189:3500/rent",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:rentName, chaletName:route.params.name, phone:rentNumber,
                 pict:route.params.pictureS, date:dayy, price:route.params.price
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            setModalOpen(false)
            setAdminRes(true)
            console.log(
                "POST Response rent",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .done();
    }

    /*useEffect( () => {
        getChalets();
    }, [] );*/

    const[newComments,setNewComments] = useState("");

    const[comments,setComments]=useState(
        route.params.comment
    )

    console.log(comments)

    const ratingCompleted=(rating) => {
        console.log("Rating is: " + rating);
        fetch("http://192.168.0.189:3500/ratinggg",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                nam:route.params.name, rate:rating
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        

      }

    const navigation = useNavigation();

    const nextDate = [
        '2022-11-28',
        '2021-06-29',
        '2021-07-04',
        '2021-07-05',
        '2021-09-06',
        '2021-08-05',
      ];
      
    let mark = {};
    route.params.date.forEach(day => {
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
            if(route.params.date.includes(dayy))
            {
                setModal2Open(true);
            }
            else setModalOpen(true);
            setPlzSelect(false)
        }
    }
    
    const imagess =[
        pic1(route.params.pictureS),
        pic2(route.params.pictureS1),

    ]

    const WIDTH= Dimensions.get('window').width;
    const HEIGHT= Dimensions.get('window').height;

    const [imgActive,setImgActive]=useState(0);

    const onChange = (nativeEvent) => {
        if(nativeEvent){
            const slide=Math.ceil(nativeEvent.contentOffset.x/nativeEvent.layoutMeasurement.width);
            if(slide!=imgActive){
                setImgActive(slide);
            }
        }
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    return (
    <ScrollView>
        <Dialog
             visible={adminRes} onTouchOutside={()=>setAdminRes(false)}
             dialogTitle={<DialogTitle title="Admin will response to you soon" />}
             footer={
                <DialogFooter>
                  <DialogButton
                    text="OK"
                    onPress={() => {setAdminRes(false)}}
                  />
                  
                </DialogFooter>
              }
             >
                
            </Dialog>
        <Modal visible={modal2Open} animationType='slide'>
            <View style={Styles.modalContent}>
            <MaterialIcons 
                name='close'
                size={24} 
                style={{...Styles.modalToggle, ...Styles.modalClose}} 
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
            <View style={Styles.modalContent}>
                <MaterialIcons 
                name='close'
                size={24} 
                style={{...Styles.modalToggle, ...Styles.modalClose}} 
                onPress={() => setModalOpen(false)} 
                />

                <Ionicons name="ios-checkmark-done-circle-sharp" size={154} color="green"
                    style={{paddingHorizontal:120, marginTop:30}}
                />

                <View style={{flexDirection:'column', marginTop:30, marginHorizontal:30}}>
                <Text style={{
                        fontFamily:'monospace',fontWeight:'bold', fontSize:24, marginBottom:25
                    }}>Complete <Text style={{color:'#4380e0'}}>book</Text> steps</Text>
                    <Text style={{
                        fontFamily:'monospace',fontWeight:'bold'
                    }}>Name</Text>
                    <TextInput onChangeText={(value)=>setRentName(value)} style={{
                        borderBottomWidth:1,width:300,height:40
                    }} />
                </View>
                <View style={{flexDirection:'column', marginTop:30, marginHorizontal:30}}>
                    <Text style={{
                        fontFamily:'monospace',fontWeight:'bold'
                    }}>Moblie Number</Text>
                    <TextInput onChangeText={(value)=>setRentNumber(value)} keyboardType='numeric' style={{
                        borderBottomWidth:1,width:300,height:40
                    }}/>
                    <TouchableOpacity onPress={rentChalet} style={{
                        backgroundColor:'#4380e0',
                        width:300,
                        marginTop:20,
                        justifyContent:"center",
                        alignItems:"center",
                        height:30,
                        borderRadius:15
                    }}>
                        <Text style={{color:'white', fontWeight:'bold', fontFamily:'monospace'}}>
                            Done
                        </Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily:'monospace',fontWeight:'bold', fontSize:24, marginTop:20
                    }}>Admin will response to you soon</Text>
                </View>
                

            </View>
        </Modal>
    <View style={Styles.container}>
        <View style={Styles.wrap}>
            <ScrollView
                onScroll={({nativeEvent})=>onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={Styles.wrap}
            >
                {
                    imagess.map((e, index)=>
                    <Image
                        key={e}
                        resizeMode='stretch'
                        style={Styles.wrap}
                        source={e}
                    />
                    )
                }
            </ScrollView>
            <View style={Styles.wrapDot}>
                {
                    imagess.map((e, index)=>
                        <Text
                            key={e}
                            style={imgActive==index?Styles.dotActive:Styles.dot}
                        >●</Text>
                    )
                }
            </View>
        </View>
        <View style={Styles.chaletInformation}>
            
            <Text style={{fontFamily:'monospace', fontWeight:'bold', fontSize:22, paddingVertical:5, marginBottom:5}}>{route.params.name}</Text>
            <View style={{flexDirection:'row'}}>
                <Entypo name="location-pin" size={16} color="black" style={{marginRight:5}}/>
                <Text style={{fontSize:12, fontFamily:'monospace'}}>{route.params.city}</Text>
            </View>
                
            <View style={Styles.description}>
                <View style={{padding:10}}>
                    <View style={{flexDirection:'row', marginTop:8, alignItems:'center'}}>
                        <FontAwesome name="dollar" size={18} color="black" />
                        <Text
                         style={{fontWeight:'bold',color:'black', fontSize:16, marginLeft:5,fontFamily:'monospace'}}
                         >{route.params.price}</Text>
                    </View>
                    <Text style={{fontWeight:'bold',color:'black', fontSize:16, marginTop:19}}>Description</Text>
                    <Text style={{fontSize:12, marginHorizontal:10, color:'#333333', marginVertical:7}}>{route.params.description}</Text>
                </View>

                <View style={{flexDirection:'row', marginRight:80, marginBottom:5}}>
                    <View style={{marginRight:120, marginLeft:10}}>
                        <Text style={{fontWeight:'bold',color:'black', fontSize:16, marginTop:8}}>Start Time</Text>
                        <Text style={{fontSize:12, marginHorizontal:10, color:'#333333', marginVertical:2}}>10:00</Text>
                    </View>
                    <View style={{marginRight:80}}>
                        <Text style={{fontWeight:'bold',color:'black', fontSize:16, marginTop:8}}>End Time</Text>
                        <Text style={{fontSize:12, marginHorizontal:10, color:'#333333', marginVertical:2}}>21:00</Text>
                    </View>
                    
                </View>
                <TouchableOpacity style={Styles.buttonBook} onPress={() => navigation.navigate('map', route.params)}>
                    <Text style={{color:'white', fontWeight:'bold', fontFamily:'monospace'}}>Get Location</Text>
                </TouchableOpacity>


            </View>

            <View style={Styles.calendar}>
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
                    <Pressable data={route} style={Styles.buttonBook} onPress={modalSet} >
                        <Text style={{color:'white', fontWeight:'bold', fontFamily:'monospace'}}>Book Now</Text>
                    </Pressable>
                </View>
                {plzSelect&&<Text style={{color:'red', fontSize:13}}>Please select day</Text>}
            </View>

            <View style={Styles.comments}>
                <Text style={{fontWeight:'bold',color:'black', fontSize:16, marginTop:0}}>Comments</Text>
                <FlatList
                    style={{marginTop:15}}
                    data={comments}
                    renderItem={({item})=>(
                        <View style={{marginVertical:5, marginHorizontal:7}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Ionicons name="person" size={24} color="black" />
                                <Text style={{marginHorizontal:10}}>{item}</Text>
                            </View>
                            
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
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                    <FontAwesome name="comment" size={20} color="black" />
                    <TextInput
                        style={{marginLeft:10, width:150,}}
                        placeholder="Add comment"
                        onChangeText={(val)=>setNewComments(val)}
                    />
                    
                    <Ionicons style={{marginLeft:120}} name="add-circle" size={24} color="black"
                     onPress={getChalets}/>
                     
                </View>
                <Text style={{fontFamily:'monospace', marginTop:20}}>Rate Now</Text>
                <Rating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    imageSize={20}
                />
            </View>

        </View>
    </View>
    </ScrollView>
    )
      
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    wrap:{
        width:400,
        height:250
    },wrapDot:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignSelf:'center'
    },
    dotActive:{
        margin:3,
        color:'#4380e0',
        fontSize:20
    },
    dot:{
        margin:3,
        color:'white',
        fontSize:20
    },
    chaletInformation:{
        paddingTop:10,
        paddingHorizontal:10
    },
    description:{
        marginTop:20,
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
    calendar:{
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
      comments:{
        height:350,
        padding:20,
        marginTop:0,
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
      }
  });