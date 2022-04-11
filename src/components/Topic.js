import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import * as Progress from 'react-native-progress';


export default Topic = ({ data, index , navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('Lesson') }}
      style={{ backgroundColor: "white", marginBottom: 10, borderRadius: 10 }}
    >
      <View style={{ borderRadius: 10 }}>
        <Image
          style={{
            width: '100%',
            height: 180,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'lightgrey'
          }}
          resizeMode={"contain"}

          source={{
            uri: `http://192.168.0.113:5000/${data.picture}`
          }}
        />
        <View style={{ position: 'absolute', left: 10, top: 10, width: 30, height: 30, borderRadius: 30, backgroundColor: "#6786DA", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "white" }}>
            {index}
          </Text>
        </View>

      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 15, paddingVertical: 5 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: '500', color: "#3e3e3e" }}>
            {data.name}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Lessons: {data.lessons}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Progress.Circle
            progress={data.progress / 100}
            size={50}
            borderWidth={0}
            color={'green'}
            thickness={5}
            showsText={true}
            formatText={() => {
              return `${data.progress}%`
            }}
            textStyle={
              {
                fontSize: 14,
                color: "black",
                fontWeight: '700'
              }
            }
            unfilledColor={"lightgrey"}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}