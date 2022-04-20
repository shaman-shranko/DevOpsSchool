import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native'
import * as Progress from 'react-native-progress';
import { Links } from "../constants";

export default Topic = ({ data, index, navigation }) => {
  let progress = data.progress ?? 0
  const { URL, URLS } = Links()
  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('Topic', { name: data.name, plan_id: data.id }) }}
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
            uri: URL + URLS.Public + data.picture
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
            progress={progress / 100}
            size={50}
            borderWidth={0}
            color={'green'}
            thickness={5}
            showsText={true}
            formatText={() => {
              return `${progress}%`
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