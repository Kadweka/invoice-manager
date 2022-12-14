import { FlatList,Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import * as Progress from 'react-native-progress';
import { FontAwesome5 } from '@expo/vector-icons';
import React,{useContext,useEffect} from 'react'

const HomeScreen = () => {
    const navigation = useNavigation();
    const {getInvoiceData,data,userInfo} = useContext(AuthContext);
    useEffect(() =>{
        if(userInfo.access_token){
            getInvoiceData(userInfo.email)
        }
      })
  return (
    <View translucent={true}>
        <View style={styles.topContainer}>
        <View style={{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            flex:1,
            marginBottom:-10
        }}>
        <Text style={{
            fontSize:40,
            fontWeight:'700'
        }}>KES:</Text>
        <Text 
        style={{
            fontSize:40,
            fontWeight:'700'
        }}
        >{data.not_paid}</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',marginBottom:30}}>
        <Progress.Bar progress={data.percentage} width={200} color='white'/>
        </View>
        </View>
       {data.items>0?(
        <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>My Invoices</Text>
        </View>
       ):(
        <></>
       )}
        <View style={styles.bottomContainer}>
       
            {data.items >0 ?(
                <FlatList showsVerticalScrollIndicator={true}
            data={data.response}
            renderItem={({item})=>(
                <View style={{alignItems:'center',justifyContent:'center'}}>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'90%',borderWidth:1,borderColor:'#AD40AF',height:60,marginTop:20,borderRadius:10}}>
            <View style={{marginLeft:10,height:50,width:50,backgroundColor:'#FFFFFF',borderRadius:100,alignItems:'center',justifyContent:'center'}}>
            <FontAwesome5 name="file-invoice-dollar" size={24} color="#AD40AF" />
                </View>
                <View>
                    <Text style={{fontSize:20,fontWeight:'bold',marginRight:20,marginTop:-20}}>{item.ref}</Text>
                    <Text style={{fontSize:15,fontWeight:'300'}}>{item.due_date}</Text>
                </View>
                <View style={{marginRight:10,marginTop:-20}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}><Text style={{fontSize:15,fontWeight:'bold'}}>KES.</Text>{item.due_amount}</Text>
                    <Text>-{item.paid_amount}</Text>
                </View>
            </View>
                </View>
            )}
        />
            ):(
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <View style={{marginBottom:20}}>
                        <Image source={require('../../assets/images/noinvoices.jpg')}
                            style={{height:50,width:50}}
                        />
                    </View>
                    <Text style={{fontSize:10,fontWeight:'bold',color:'#AD40AF'}}>There is nothing to show here!!!!</Text>
                </View>
            )}
        </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    // mainContainer:{
    //     backgroundColor:'yellow'
    // },
    topContainer:{
        backgroundColor:'#AD40AF',
        borderBottomEndRadius:20,
        borderBottomStartRadius:20,
        height:'20%'
    },
    bottomContainer:{
        height:'80%'
    },
    iconContainer:{
        height:60,
        width:60,
        backgroundColor:'#FFFFFF',
        marginLeft:20,
        marginTop:20,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    }
})