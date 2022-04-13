import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TopicScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [topic, setTopic] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/lesson');
      setTopic(response)
    } catch (err) {
      console.log("Lessons screen reports:", err.message);
    }
  }, [request])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }
  const Item = ({ name, description, index, stars }) => (
    <TouchableOpacity onPress={() => { navigation.navigate('Lesson', { name: name }) }}>
      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "lightgrey", paddingVertical: 5 }}>
        {/* Number */}
        <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "#6786DA" }}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: 'bold' }}>{index}</Text>
          </View>
        </View>
        {/* Texts */}
        <View style={{ flex: 7 }}>
          <Text style={{ fontSize: 18, paddingVertical: 10 }}>
            {name}
          </Text>
          <Text style={{ paddingBottom: 5 }}>
            {description}
          </Text>
        </View>
        {/* Stars */}
        <View style={{ flex: 2, justifyContent: "center", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {Array.from({ length: 3 }, (item, star_index) =>
              <Ionicons key={`star_${index}_${star_index}`} name={'star'} size={24} color={star_index + 1 <= stars ? "gold" : "lightgrey"} />
            )}
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Ionicons name={'chevron-forward'} size={24} color={"lightgrey"} />
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item, index }) => (
    <Item index={index + 1} stars={item.stars} name={item.name} description={item.description} />
  );
  return (
    <View>
      {/* Progress */}
      <View>
        {topic && topic.count && topic.done &&
          <View style={{ flexDirection: "row" }}>
            {Array.from({ length: topic.count }, (item, index) =>
              <View key={`index_${index}`} style={{ flex: 1, height: 5, margin: 1, backgroundColor: (index + 1) <= topic.done ? "green" : "lightgreen" }}></View>
            )}
          </View>
        }
      </View>
      {/* Progress text */}
      <View>
        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 14, paddingVertical: 5 }}>
          {`Выполнено уроков: ${topic && topic.done} из ${topic && topic.count}`}
        </Text>
      </View>
      {/* Finish topic now button */}
      <View style={{ padding: 10 }}>
        <Button
          type="outline"
          buttonStyle={{
            borderWidth: 2,
            borderColor: "#6786DA",
            borderRadius: 5
          }}
          title="Сдать тему досрочно"
        />
      </View>
      {/* Topic image */}
      <View>
        {topic && topic.picture &&
          <Image
            style={{
              width: "100%",
              height: 200,
              // borderRadius: 35,
              borderWidth: 1,
              borderColor: 'lightgrey'
            }}
            resizeMode={"contain"}
            source={{
              uri: `http://192.168.0.113:5000/${topic.picture}`
            }}
            onLoad={() => (<ActivityIndicator size={40} color={"red"} />)}
          />
        }
      </View>
      {/* Lessons list */}
      <View style={{ height: 330 }}>
        {topic && topic.lessons &&
          <FlatList
            data={topic.lessons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        }
      </View>
    </View>
  )
}