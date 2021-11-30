import React from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from "../TopHeader"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        // console.log('props', this.props);
        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <View style={styles.cardsWrapper}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333',
                        }}>
                        Notice Board
                    </Text>
                    <View style={styles.sliderContainer}>
                        <Swiper
                            autoplay
                            horizontal={true}
                            height={200}
                            activeDotColor="#FF6347"
                        // activeDotColor={theme['color-primary-700']}
                        >
                            <View style={styles.card}>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Amazing Food Place</Text>
                                    <Text style={styles.cardDetails}>sss</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Amazing Food Place</Text>
                                    <Text style={styles.cardDetails}>ddd</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardTitle}>Amazing Food Place</Text>
                                    <Text style={styles.cardDetails}>sssss</Text>
                                </View>
                            </View>
                        </Swiper>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() =>
                            this.props.navigation.navigate('SecurityAlert')
                        }
                    >
                        <View style={styles.categoryIcon}>
                            <MaterialCommunityIcons name="security" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Security Alert</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBtn} >
                        <View style={styles.categoryIcon}>
                            <MaterialCommunityIcons name="home" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Residence</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBtn} >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="timer-sharp" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Live Status</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                    <TouchableOpacity style={styles.categoryBtn} >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="construct-sharp" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Local Service</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() =>
                            this.props.navigation.navigate('Notice')
                        }
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="chatbubble-ellipses-sharp" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Notice Board</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() =>
                            this.props.navigation.navigate('QuickAction')
                        }
                    >
                        <View style={styles.categoryIcon}>
                            <Ionicons name="apps" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Quick Action</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.categoryContainer, { marginTop: 10 }]}>
                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() =>
                            this.props.navigation.navigate('Complain')
                        }
                    >
                        <View style={styles.categoryIcon}>
                            <MaterialIcons name="support-agent" size={35} color="#e32f45" />
                        </View>
                        <Text style={styles.categoryBtnTxt}>Help Desk</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#e32f45',
        fontSize: 13
    },

    sliderContainer: {
        height: 120,
        // marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },

    cardsWrapper: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    card: {
        height: 100,
        marginVertical: 10,
        flexDirection: 'row',
        shadowColor: '#999',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardInfo: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardDetails: {
        fontSize: 12,
        color: '#444',
    },
})