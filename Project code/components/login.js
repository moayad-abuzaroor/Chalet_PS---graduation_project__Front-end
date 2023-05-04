import React,{useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Image, Modal, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';



export default function Login(){

    const navigation = useNavigation();

    const[updated,setUpdated]=useState(false)

    const[msgInvalid,setMsgInvalid]=useState(false)
    const[msgCorrect,setMsgCorrect]=useState(false)

    const[errorMsg,setErrorMsg]=useState(false)

    const[modal1Open,setModal1Open]=useState(false)
    const[modal2Open,setModal2Open]=useState(false)

    const[userName,setUserName]=useState("")
    const[userPass,setUserPass]=useState("")

    const[forgetEmail,setForgetEmail]=useState("")
    const[otp,setOTP]=useState("")
    const[fPass,setFPass]=useState("")
    const[secondEmail,setSecondEmail]=useState("")



    function logUser(event){
        console.log("pressed")
        event.preventDefault()
        fetch("http://192.168.0.189:3500/login",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:userName,  pwd:userPass
            })
        })
            .then((response) => response.json())
            .catch("error")
            .then((responseData) => {
                if(responseData.message=="Username and password are required.")
                    setErrorMsg(true)
                else if(responseData.success==false){
                    setErrorMsg(true)
                    setUserName("")
                    setUserPass("")
                }
                else if(responseData.data.Admin=="0"){
                    setErrorMsg(false)
                    setUserName("")
                    setUserPass("")
                    navigation.navigate('home', responseData)                    
                }
                else setErrorMsg(true)
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData)
                )
            })

    }

    function sendEmail(){
        fetch("http://192.168.0.189:3500/fogetPassword",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                email:forgetEmail
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            if(responseData.msg=="This email is not exists ."){
                setMsgInvalid(true)
                setForgetEmail("")
            }
            else {
                setModal2Open(true)
                setMsgInvalid(false)
                setForgetEmail("")
            }
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData),
            )
        })
        
    }

    function sendOTP(){
        fetch("http://192.168.0.189:3500/updatePassword",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                emaill:secondEmail, opt:otp, password:fPass
            })
        })
        .then((response) => response.json())
        .catch("error")
        .then((responseData) => {
            setUpdated(true)
            setModal1Open(false)
            setModal2Open(false)
            setForgetEmail("")
            setSecondEmail("")
            setOTP("")
            setFPass("")
            console.log(
                "POST Responset",
                "Response Body -> " + JSON.stringify(responseData),
            )
        })
        
    }


    return(
        <View style={styles.container}>
            <Dialog
             visible={updated} onTouchOutside={()=>setUpdated(false)}
             dialogTitle={<DialogTitle title="Password Updated" />}
             footer={
                <DialogFooter>
                  <DialogButton
                    text="Done"
                    onPress={() => {navigation.navigate('login'), setUpdated(false), setModal1Open(false), setModal2Open(false)}}
                  />
                  
                </DialogFooter>
              }
             >
                
            </Dialog>
            <Modal visible={modal2Open} animationType="slide" >
                <View style={styles.modalContent}>
                    
                    <View style={{
                        backgroundColor:'white',
                        justifyContent:'center',
                        paddingHorizontal:30,
                        paddingVertical:50,
                        marginHorizontal:30,
                        marginVertical:100,
                        borderRadius:15,
                    }}>
                        <Text style={{
                            fontSize:22,
                            fontWeight:'bold'
                        }}>Reset password</Text>
                        <Text style={{
                            paddingVertical:15,
                            fontSize:12
                        }}>Please verify tour email and enter the Code sent to your email {forgetEmail}</Text>

                        <Text style={{
                            fontSize:12,
                            marginTop:30
                        }}>Enter email address</Text>
                        <TextInput style={styles.inputBox}
                            value={secondEmail}
                            onChangeText={(value)=>setSecondEmail(value)}
                        />
                        <Text style={{
                            fontSize:12,
                            marginTop:0
                        }}>Verify Code</Text>
                        <TextInput keyboardType="numeric" style={styles.inputBox}
                            value={otp}
                            onChangeText={(value)=>setOTP(value)} />
                        <Text style={{
                            paddingVertical:0,
                            fontSize:12
                        }}>Enter new password</Text>
                        <TextInput secureTextEntry={true} style={styles.inputBox}
                            value={fPass}
                            onChangeText={(value)=>setFPass(value)}
                        />
                        <Pressable style={styles.button} onPress={sendOTP}>
                            <Text style={styles.text}>Reset Password</Text>
                        </Pressable>

                        <TouchableOpacity onPress={() => setModal2Open(false)} style={{
                            alignItems:'center',
                            marginTop:30
                        }}>
                            <Text style={{
                                color:'#4380e0',
                                fontWeight:'bold'
                            }}>Back</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>


            <Modal visible={modal1Open} animationType="slide" >
                <View style={styles.modalContent}>
                    
                    <View style={{
                        backgroundColor:'white',
                        justifyContent:'center',
                        paddingHorizontal:30,
                        paddingVertical:50,
                        marginHorizontal:30,
                        marginVertical:100,
                        borderRadius:15,
                    }}>
                        <Text style={{
                            fontSize:22,
                            fontWeight:'bold'
                        }}>Forgot your password</Text>
                        <Text style={{
                            paddingVertical:15,
                            fontSize:12
                        }}>Please enter the email address you'd like your password reset information sent to</Text>

                        <Text style={{
                            fontSize:12,
                            marginTop:30
                        }}>Enter email address</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={forgetEmail}
                            onChangeText={(value)=>setForgetEmail(value)}
                        />
                        {msgInvalid&&<Text style={{
                            color:'red', fontSize:12, marginBottom:5
                        }}>This email is not exists.</Text>}
                        <Pressable style={styles.button} onPress={sendEmail}>
                            <Text style={styles.text}>Send</Text>
                        </Pressable>

                        <TouchableOpacity onPress={() => setModal1Open(false)} style={{
                            alignItems:'center',
                            marginTop:30
                        }}>
                            <Text style={{
                                color:'#4380e0',
                                fontWeight:'bold'
                            }}>Back to Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <Text style={styles.logTitle}>
                LOGIN
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
                Password
            </Text>
            <TextInput
                style={styles.inputBox}
                secureTextEntry={true}
                value={userPass}
                onChangeText={(value)=>setUserPass(value)}
            />
            {errorMsg&&<Text style={{
                color:'red', fontSize:12, marginBottom:5
            }}>User Name or Password is incorrect</Text>}
            <TouchableOpacity onPress={()=>setModal1Open(true)}>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <Pressable style={styles.button} onPress={logUser}>
                <Text style={styles.text}>LOGIN</Text>
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
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/LotusChaletPal')}>
                    <Image style={{marginHorizontal:5}} source={ require('../images/facebook.png') } />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/lotuschaletpal/')}>
                    <Image style={{marginHorizontal:10}} source={ require('../images/insta.png') } />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:chalet_ps2022@outlook.com')}>
                    <Image style={{marginHorizontal:10}} source={ require('../images/mail.png') } />
                </TouchableOpacity>
            </View>

            <View style={styles.sign}>
                <Text>
                    need an account? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                    <Text style={styles.forgot}>  Sign UP</Text>
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
    modalContent:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    logTitle:{
        marginTop:50,
        marginBottom:50,
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
  });