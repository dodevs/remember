import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight, Alert } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  defaultScreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//Constantes recebem função com componentes de tela
class HomeScreen extends React.Component{

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor, focused }) => (
      <Ionicons
        name={focused ? 'home': 'home'}
        size={20}
        style={{color: tintColor}}
      />
    ),
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.defaultScreen}>
        <Text> Home Screen </Text>
        <Button 
          onPress={() => navigate('DrawerToggle')}
          title="Open Drawer"
        />
      </View>
    )
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'person': 'person-outline'}
        size={20}
        style={{color: tintColor}}
      />
    )
  }

  render(){
    return (
      <View style={styles.defaultScreen}> 
        <Text> Profile Screen </Text>
      </View>
    )
  }
}

class RecScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recIcon: 'mic-off',
      recText: 'gravar'
    }
    this.recState = false;
    this.pausable = false;
    this.pauseState = "play"
    this.onRec = this.onRec.bind(this);
  }

  onRec = (micState) => {
    if(micState == true){
      this.setState({recIcon: 'mic-off', recText: 'gravar'});
      this.recState = false;
      this.pausable = false;
    } else if(micState == false){
      this.setState({recIcon: 'mic', recText: 'parar'});
      this.recState = true;
      this.pausable = true;
    } else if(micState == "play"){
      if(this.pausable){
        this.setState({recIcon: 'mic-none'});
        this.pauseState = "pause";
      }
    } else if(micState == "pause"){
      this.setState({recIcon: 'mic'});
      this.pauseState = "play";
    }
  }

  static navigationOptions = {
    drawerLabel: 'Record',
    drawerIcon: ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'mic' : 'mic-none'}
        size={20}
        style={{color: tintColor}}
      />
    ),
  }

  render(){
    var alertMessage = "Ao clicar em Avançar você concorda com os "+
    "seguintes termos de uso: <Termos de Uso>.";

    return (
      <View style={styles.defaultScreen}>
        <Ionicons
          name={this.state.recIcon}
          size={200}
          style={{color: '#5450f4'}}
          onPress={() => this.onRec(this.pauseState)}
          onLongPress={() => this.setState({recIcon: 'delete-sweep'})}
        />
        <Button
          /* onPress={() => Alert.alert(
            'Termos de Uso',
            alertMessage,
            [
              {text: "Avançar", onPress: () => this.setState({recIcon: 'rec'})}
            ]
          )} */
          onPress={() => this.onRec(this.recState) }
          title={this.state.recText}
          />
      </View>
    )
  }
}
//END

// Constante recebe componente de tela principal
export const RootDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen, 
  },
  Profile: {
    screen: ProfileScreen,   
  },
  Record : {
    screen: RecScreen,
  },
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return <RootDrawer/>;
  }
}

export default App;