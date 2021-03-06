import React, { useContext } from 'react';
import {View, StyleSheet} from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../provider/ContextProvider';

export function DrawerContent(props){
    const context = useContext(AppContext)
    const {setToken, user, setUser} = context

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <View style = {{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: !!user ? user.picture : ''
                                }}
                                size={50}
                            />
                            <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style = {styles.title}>{!!user ? user.name : 'Jane Doe'}</Title>
                                <Caption style = {styles.caption}>{!!user ? user.nickname : 'jane.doe'}</Caption>
                            </View>
                        </View>

                        <View style = {styles.row}>
                            <View style = {styles.section}>
                                <Paragraph style = {styles.paragraph, styles.caption}>{!!user && !!user.following ? user.following.length : 0}</Paragraph>
                                <Caption style = {styles.caption}>Following</Caption>
                            </View>
                            <View style = {styles.section}>
                                <Paragraph style = {styles.paragraph, styles.caption}>{!!user && !!user.followers ? user.followers.length : 0}</Paragraph>
                                <Caption style = {styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="scan-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Scan"
                        onPress={() => {props.navigation.navigate('Scan')}}
                    />
                    {/* <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="bookmark-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="settings-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Settings"
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="call-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Support"
                        onPress={() => {props.navigation.navigate('SupportScreen')}}
                    /> */}
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress = {() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents = "none">
                                    <Switch value = {isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style = {styles.bottomDrawerSection}>
                <DrawerItem
                    icon = {({color, size}) => (
                        <Icon
                        name="exit-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                      setUser(null)
                      setToken(null)
                    }} 
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      marginLeft: 3
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });