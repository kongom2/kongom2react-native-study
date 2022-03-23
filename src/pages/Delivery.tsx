import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Complete from './Complete';
import Ing from './Ing';

const Stack = createNativeStackNavigator();

function Delivery() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      {/* 완료처리 화면, 지도는 로딩시간이 많이 걸리기에 위에 화면을 덮었다 없앴다 하는편이 좋다. */}
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Delivery;
