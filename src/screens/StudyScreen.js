import React from "react";
import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View } from 'react-native'
import { commonStyle } from "../styles/common.style";
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function StudyScreen() {
  return (
    <View style={commonStyle.Container}>
      <View style={{ width: "100%", padding: 20, height: "90%" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20, height: "100%" }}>

          {/* Image */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 35,
                borderWidth: 1,
                borderColor: 'black'
              }}
              resizeMode={"contain"}
              source={require('../assets/devops.png')}
              onLoad={() => (<ActivityIndicator size={40} color={"red"} />)}
            />
          </View>
          {/* Heading */}
          <Text style={{ textAlign: "center", fontSize: 28, paddingBottom: 10 }}>Elementary</Text>

          {/* 1st line */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 20 }}>
                <Ionicons name={'stats-chart-sharp'} size={14} />
              </View>
              <Text>27 lessons</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 20 }}>
                <Ionicons name={'person-sharp'} size={14} />
              </View>
              <Text>1840 video explanations</Text>
            </View>
          </View>

          {/* 2nd line */}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 20 }}>
                <Ionicons name={'pencil-sharp'} size={14} />
              </View>
              <Text>8198 excercises</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ width: 20 }}>
                <Ionicons name={'time-sharp'} size={14} />
              </View>
              <Text>131 hours</Text>
            </View>
          </View>

          {/* Text description */}
          <Text style={{ paddingVertical: 20, textAlign: "justify" }}>
            This course is for thoose who knows a few words and phrases but doesn't know the
            difference between simple and continious times, can't ask questions and answer on it.
            Finishing this course, You'll get the knowledge of a basic grammar, will have possibility
            to take the elementary conversation in a shop, airport and drug store.
          </Text>

          {/* Progress bar */}
          <View style={{ paddingVertical: 10, flexDirection: "row", width: "100%" }}>
            <Progress.Bar progress={0.04} width={300} height={18} borderWidth={0} color={'#6786DA'} unfilledColor={"lightgrey"} />
            <Text style={{ width: 40, textAlign: "right" }}>4%</Text>
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
      </View>
    </View>
  );
}