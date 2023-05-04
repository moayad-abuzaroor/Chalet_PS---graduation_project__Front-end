import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SignUp(){

    const navigation = useNavigation();

    const[passMsg,setPassMsg]=useState(false)
    const[fieldMsg,setFieldMsg]=useState(false)
    
    const[userName,setUserName]=useState("")
    const[userEmail,setUserEmail]=useState("")
    const[userPass,setUserPass]=useState("")
    const[userConfirmPass,setUserConfirmPass]=useState("")

    function addUser(event){
        console.log("pressed")
        event.preventDefault()
        fetch("http://192.168.0.189:3500/user",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:userName, email:userEmail, pwd:userPass, cpwd:userConfirmPass
            })
        })
            .then((response) => response.json())
            .catch("error")
            .then((responseData) => {
                if(responseData.message=="Username,Password and Email are required.")
                {
                    setFieldMsg(true)
                    setPassMsg(false)
                }
                else if(responseData.message=="The two passwords dont match.")
                {
                    setPassMsg(true)
                    setFieldMsg(false)
                    setUserPass("")
                    setUserConfirmPass("")
                }
                else {
                    navigation.navigate('login')
                    setUserName("")
                    setUserEmail("")
                    setUserPass("")
                    setUserConfirmPass("")
                }
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData)
                )
            })

    }


    return(
        <View style={styles.container}>
            <Text style={styles.logTitle}>
                SIGN UP
            </Text>
            <Text style={styles.inputTitle}>
                User Name
            </Text>
            <TextInput
                style={styles.inputBox}
                value={userName}
                onChangeText={(value)=>setUserName(value)}
            />
            <Text style={styles.inputTitle}>
                E-mail
            </Text>
            <TextInput
                style={styles.inputBox}
                value={userEmail}
                onChangeText={(value)=>setUserEmail(value)}
                
            />
            <Text style={styles.inputTitle}>
                Password
            </Text>
            <TextInput
                style={styles.inputBox}
                secureTextEntry={true}
                value={userPass}
                onChangeText={(value)=>setUserPass(value)}
            />
            <Text style={styles.inputTitle}>
                Confirm Password
            </Text>
            <TextInput
                style={styles.inputBox}
                secureTextEntry={true}
                value={userConfirmPass}
                onChangeText={(value)=>setUserConfirmPass(value)}
            />

            {passMsg&&<Text style={{
                color:'red', fontSize:12, marginBottom:5
            }}>Passwords does not match</Text>}

            {fieldMsg&&<Text style={{
                color:'red', fontSize:12, marginBottom:5
            }}>Please fill all fields</Text>}

            <Pressable style={styles.button} onPress={addUser}>
                <Text style={styles.text}>SIGN UP</Text>
            </Pressable>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:25}}>
                <View style={{flex: 1, height: 1, backgroundColor: '#cfd0d1'}} />
                <View>
                    <Text style={{width: 50, textAlign: 'center',
                     borderWidth:0.5, borderRadius:15, borderStyle:"dashed", color:'#383838'}}>
                        OR
                    </Text>
                </View>               
                <View style={{flex: 1, height: 1, backgroundColor: '#cfd0d1'}} />
            </View>
                
            <View style={styles.logos}>
                <TouchableOpacity>
                    <Image style={{marginHorizontal:5}} source={ require('../images/facebook.png') } />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{marginHorizontal:10}} source={ require('../images/insta.png') } />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{marginHorizontal:10}} source={ require('../images/mail.png') } />
                </TouchableOpacity>
            </View>

            <View style={styles.sign}>
                <Text>
                    Already have an account? 
                </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text style={styles.forgot}>  Log In</Text>
                    </TouchableOpacity>
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:50,
      paddingVertical:50,
      
    },
    logTitle:{
        marginTop:50,
        marginBottom:40,
        fontSize:26,
        color:'#383838',
        fontWeight:'bold'
    },
    inputTitle:{
        fontSize:18,    
        color:'#383838'
    },
    inputBox:{
        paddingHorizontal:10,
        marginBottom:20,
        borderWidth:1,
        marginTop:15,
        borderRadius:7,
        height:40,
        borderColor:'#9a9b9c'
    },    
    forgot:{
        fontSize:13,
        color:'#8097bd',
    },
    button: {
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#4380e0',
        shadowOffset:{
            width:15,
            height:15
        },
        shadowOpacity: 0.25,
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
      logos:{
        marginTop:15,
        flexDirection:"row",
        alignItems:"center",
        alignSelf:"center"
      },
      sign:{
        marginTop:35,
        flexDirection:"row",
        color:'#383838',
        alignSelf:"center"
      }
  });