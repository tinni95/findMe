import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from "../../../screens/ProfileStack/";
import Logout from "../../../screens/ProfileStack/Logout";
import FormazioniScreen from "../../../screens/ProfileStack/Formazioni/FormazioniScreen";
import EsperienzeScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeScreen";
import ProgettiScreen from "../../../screens/ProfileStack/Progetti/ProgettiScreen";
import CompetenzeScreen from "../../../screens/ProfileStack/CompetenzeScreen";
import FormazioneEditScreen from "../../../screens/ProfileStack/Formazioni/FormazioneEditScreen";
import EsperienzeEditScreen from "../../../screens/ProfileStack/Esperienze/EsperienzeEditScreen";
import ProgettiEditScreen from "../../../screens/ProfileStack/Progetti/ProgettiEditScreen";
import UserInfoModal from "./UserInfoModal";
import UserPosts from "../../../screens/ProfileStack/UserPosts";
import {
  headerStyle,
  headerTitleStyle
} from "../../../shared/constants/HeaderStyles";
import HeaderLeft from "../../../shared/components/HeaderLeft";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../shared/constants/Colors";
import PostScreen from "../../../screens/Explore/Post/PostScreen";
import SettingsScreen from "../../../screens/ProfileStack/SettingsStack";
import UpdatePassword from "../../../screens/ProfileStack/SettingsStack/UpdatePassword";
import UpdateEmail from "../../../screens/ProfileStack/SettingsStack/UpdateEmail";
import AboutPage from "../../../screens/ProfileStack/SettingsStack/AboutPage";
import BioScreen from "../../../screens/ProfileStack/BioScreen";

const Stack0 = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack0.Navigator>
      <Stack0.Screen
        name="Impostazioni"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name={"ios-menu"}
                size={25}
                style={{ marginLeft: 10 }}
                color={Colors.blue}
              ></Ionicons>
            </TouchableOpacity>
          )
        })}
        component={SettingsScreen}
      />
      <Stack0.Screen
        name="UpdatePassword"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={UpdatePassword}
      />
      <Stack0.Screen
        name="UpdateEmail"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={UpdateEmail}
      />
      <Stack0.Screen
        name="About"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={AboutPage}
      />
    </Stack0.Navigator>
  );
};

const Stack1 = createStackNavigator();

const LogoutStack = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen name="Logout" component={Logout} />
    </Stack1.Navigator>
  );
};

const Stack2 = createStackNavigator();

const PostsStack = () => {
  return (
    <Stack2.Navigator>
      <Stack2.Screen
        name="UserPosts"
        options={({ navigation }) => ({
          title: "I tuoi post",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name={"ios-menu"}
                size={25}
                style={{ marginLeft: 10 }}
                color={Colors.blue}
              ></Ionicons>
            </TouchableOpacity>
          )
        })}
        component={UserPosts}
      />
      <Stack2.Screen
        name="PostScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={PostScreen}
      />
    </Stack2.Navigator>
  );
};

const Stack3 = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack3.Navigator>
      <Stack3.Screen
        name="ProfilePage"
        options={({ navigation }) => ({
          title: "Profilo",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons
                name={"ios-menu"}
                size={25}
                style={{ marginLeft: 10 }}
                color={Colors.blue}
              ></Ionicons>
            </TouchableOpacity>
          )
        })}
        component={ProfilePage}
      />
      <Stack3.Screen
        name="EditProfile"
        options={{ headerShown: false }}
        component={UserInfoModal}
      />
      <Stack3.Screen
        name="BioScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={BioScreen}
      />
      <Stack3.Screen
        name="FormazioniScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={FormazioniScreen}
      />
      <Stack3.Screen
        name="EsperienzeScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={EsperienzeScreen}
      />
      <Stack3.Screen
        name="ProgettiScreen"
        options={({ navigation }) => ({
          title: "Progetti",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={ProgettiScreen}
      />
      <Stack3.Screen
        name="FormazioneEditScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={FormazioneEditScreen}
      />
      <Stack3.Screen
        name="CompetenzeScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={CompetenzeScreen}
      />
      <Stack3.Screen
        name="EsperienzeEditScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={EsperienzeEditScreen}
      />
      <Stack3.Screen
        name="ProgettiEditScreen"
        options={({ navigation }) => ({
          title: "",
          headerStyle,
          headerTitleStyle,
          headerLeft: () => <HeaderLeft navigation={navigation} />
        })}
        component={ProgettiEditScreen}
      />
    </Stack3.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const ProfileDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName={"Profilo"} drawerPosition={"left"}>
      <Drawer.Screen name="Profilo" component={ProfileStack} />
      <Drawer.Screen name="Impostazioni" component={SettingsStack} />
      <Drawer.Screen name="Logout" component={LogoutStack} />
      <Drawer.Screen name="Posts" component={PostsStack} />
    </Drawer.Navigator>
  );
};

export default ProfileDrawer;
