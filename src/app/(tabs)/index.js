import { View, ScrollView } from "react-native";
import { Text, Button } from 'react-native-paper';
import React, {useState} from 'react';
import GreetingHeader from "../../components/GreetingHeader";
import SummaryCards from "../../components/SummaryCards";
import NotificationsBanner from "../../components/Notification";
import RecentActivity from "../../components/RecentActivity";
import QuickActions from "../../components/QuickActions";
import SearchBarItem from "../../components/SearchBar";
import AppDrawer from "../../components/Drawer";
import { Drawer, IconButton, Portal, Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext';

export default function Index() {

    const { user } = useAuth();
    const [bannerVisible, setBannerVisible] = useState(true)
    // const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [active, setActive] = React.useState('');


    return (
        
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            
            <GreetingHeader userName={user?.username || 'User'} />
            <SearchBarItem />
            <View style={{ marginBottom: 16 }}>
                <NotificationsBanner
                    visible={bannerVisible}
                    onDismiss={() => setBannerVisible(false)}
                    message="Welcome to the WEE Farmers system. Are you a Pro or you prefer a tour "
                />
            </View>
            <SummaryCards />
            <QuickActions />
            <RecentActivity />
                   
            
        </ScrollView>
    );
}
