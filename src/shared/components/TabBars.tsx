import React from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import { View, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import { Body } from '../components/StyledText';

export default function TabBars({ routes, renderScene, sent, received }) {
  const [index, setIndex] = React.useState(0);
  const initialLayout = { width: Dimensions.get('window').width };

  const renderTabBar = (props) => {
    return (
      <TabBar
        style={{
          paddingTop: 5,
          backgroundColor: '#FFFFFF',
          elevation: 0,
          borderColor: '#B9B0B0',
          borderBottomWidth: 1,
          height: 60,
        }}
        renderLabel={({ route, focused }) => (
          <View style={{ flexDirection: 'row' }}>
            <Body style={{ color: focused ? 'black' : 'grey', margin: 8 }}>{route.title}</Body>
            {route.title == 'Inviate'
              ? sent.length > 0 && (
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      backgroundColor: Colors.red,
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Body style={{ color: 'white', fontSize: 9 }}>{sent.length}</Body>
                  </View>
                )
              : received.length > 0 && (
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      backgroundColor: Colors.red,
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Body style={{ color: 'white', fontSize: 9 }}>{received.length}</Body>
                  </View>
                )}
          </View>
        )}
        {...props}
        indicatorStyle={{
          backgroundColor: Colors.semiBlue,
          height: 2.5,
          marginBottom: -2,
        }}
      />
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
