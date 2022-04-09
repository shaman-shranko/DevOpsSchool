import React from 'react';
// import { commonStyle } from '../styles/common.style'
import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View } from 'react-native'
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default Item = ({ data, isCourse = false }) => {
  return (
    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20, height: "100%" }}>

      {/* Image */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: 'lightgrey'
          }}
          resizeMode={"contain"}
          source={{
            uri: `http://192.168.0.113:5000/${data.picture}`
          }}
          onLoad={() => (<ActivityIndicator size={40} color={"red"} />)}
        />
      </View>
      {/* Heading */}
      <Text style={{ textAlign: "center", fontSize: 28, paddingBottom: 10 }}>{data.heading}</Text>

      {/* 1st line */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 20 }}>
            <Ionicons name={'stats-chart-sharp'} size={14} />
          </View>
          <Text>{data.lessons} lessons</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 20 }}>
            <Ionicons name={'person-sharp'} size={14} />
          </View>
          <Text>{data.video} video explanations</Text>
        </View>
      </View>

      {/* 2nd line */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 20 }}>
            <Ionicons name={'pencil-sharp'} size={14} />
          </View>
          <Text>{data.exercises} excercises</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 20 }}>
            <Ionicons name={'time-sharp'} size={14} />
          </View>
          <Text>{data.hours} hours</Text>
        </View>
      </View>

      {/* Text description */}
      <Text style={{ paddingVertical: 20, textAlign: "justify" }}>
        {data.description}
      </Text>

      {!isCourse ?
        <View>
          {/* Progress bar */}
          <View style={{ paddingVertical: 10, flexDirection: "row", width: "100%" }}>
            <Progress.Bar progress={data.progress / 100} width={285} height={18} borderWidth={0} color={'#6786DA'} unfilledColor={"lightgrey"} />
            <Text style={{ width: 40, textAlign: "right" }}>{data.progress}%</Text>
          </View>

          {/* Details */}
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Text>Details</Text>
              <Ionicons name={'chevron-forward'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Button */}
          <View style={{ paddingVertical: 10 }}>
            <Button
              title="Learn More"
              color="#6786DA"
            />
          </View>
        </View>
        :
        <View>

          {/* Details */}
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Text>Details</Text>
              <Ionicons name={'chevron-forward'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Price */}
          <View style={{ alignItems: "center", paddingVertical: 10 }}>
            <Text style={{ textAlign: "center", fontSize: 28, paddingBottom: 10 }}>
              {data.price}$
            </Text>
          </View>

          {data.isBought ?
            <View style={{ alignItems: "center", paddingVertical: 10 }}>
              <Text>
                Course is bought
              </Text>
            </View>
            :
            <View>
              {/* Button */}
              <View style={{ paddingVertical: 10 }}>
                <Button
                  title="Buy course"
                  color="#6786DA"
                />
              </View>
            </View>
          }

        </View>
      }
    </View>
  )
}