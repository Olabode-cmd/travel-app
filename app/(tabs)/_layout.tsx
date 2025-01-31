import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { View, StyleSheet, Pressable } from 'react-native';
import { MonoText, PoppinsText } from '@/components/StyledText';

import Colors from '@/constants/Colors';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function AntIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const router = useRouter();

  const logout = () => {
    router.push('/logout')
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="default"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntIcon name="home" color={color} />,
          headerTitle: '',
          headerLeft:() => (
            <View style={styles.left}>
              <PoppinsText style={{}}>Discover</PoppinsText>
            </View>
          ),
          headerRight: () => (
            <Pressable onPress={logout} style={{paddingRight: 12}}>
              <PoppinsText>Logout</PoppinsText>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'My Cart',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          headerShown: false
        }}
      />
    </Tabs>
  );
}

// headerRight: () => (
//   <Link href="/modal" asChild>
//     <Pressable>
//       {({ pressed }) => (
//         <FontAwesome
//           name="info-circle"
//           size={25}
//           color={Colors.light.text}
//           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//         />
//       )}
//     </Pressable>
//   </Link>
// ),

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    gap: 4,
  },
});