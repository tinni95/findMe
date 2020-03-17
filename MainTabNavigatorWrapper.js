import React from "react"
import MainTabNavigator from './navigation/MainTabNavigator';
import io from "socket.io-client";
import { socketEndPoint } from './shared/urls';
import SocketContext from './Socket/context'
import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import FindMeSpinner from "./shared/FindMeSpinner";
import PushNotifications from "./shared/functions/PushNotifications";

const UpdateUser = gql`
mutation updateUser($pushToken:String){
    updateUser(pushToken:$pushToken){
        pushToken
    }
}
`
const User = gql`
{
    currentUser{
        id
    }
}
`
export default function MainTabNavigatorWrapper({ screenProps }) {
    const { data, loading } = useQuery(User, {
        onCompleted: (currentUser) => {
            console.log("currentUser")
        }
    })

    const [updateUser] = useMutation(UpdateUser);

    useEffect(() => {
        console.log("here")
        PushNotifications(updateUser)
    }, [])

    if (loading)
        return <FindMeSpinner />
    else
        return (<SocketContext.Provider value={io(socketEndPoint, {
            query: { token: data.currentUser.id }
        })}>
            <MainTabNavigator screenProps={screenProps}></MainTabNavigator>
        </SocketContext.Provider>)
}