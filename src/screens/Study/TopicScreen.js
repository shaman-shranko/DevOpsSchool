import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from "../../context/auth.context";
import Loader from "../../components/loader.component";
import Empty from "../../components/empty.component";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import { Button } from "react-native-elements";

export default function TopicScreen({ navigation, route }) {
  const [topic, setTopic] = useState(null)
  const { loading, error, errors, request } = useHttp();
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let plan_id = route?.params?.plan_id ?? 0
      let response = await request(
        Links?.TopicLink + plan_id,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && response.data) {
        setTopic(response.data)
        navigation.setOptions({ title: response.data.name })
      }
    } catch (err) {
      console.log("Topic screen reports:", err.message);
    }
  }, [request, Links])

  useEffect(() => {
    dataLoading();
    return () => { }
  }, [dataLoading])

  const Item = ({ name, description, index, stars, id }) => (
    <TouchableOpacity onPress={() => { navigation.navigate('Lesson', { name: "Lesson" + (index) + ": " + name, lesson_id: id }) }}>
      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "lightgrey", paddingVertical: 5 }}>
        {/* Number */}
        <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "#6786DA" }}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: 'bold' }}>{index}</Text>
          </View>
        </View>
        {/* Texts */}
        <View style={{ flex: 7 }}>
          <Text style={{ fontSize: 18, paddingVertical: 10, color: "#3e3e3e" }}>
            {name}
          </Text>
          <Text style={{ paddingBottom: 5, color: "#3e3e3e" }}>
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
    <Item index={index + 1} stars={item.stars} name={item.name} id={item.id} description={item.description} />
  );

  if (loading) {
    return <Loader />
  }

  if (!topic) {
    return <Empty />
  }

  const done = topic?.lessons?.filter(item => item.stars != null && item.stars > 0).length ?? 0
  return (
    <View>
      {/* Progress */}
      <View>
        {topic && topic.count &&
          <View style={{ flexDirection: "row" }}>
            {Array.from({ length: topic.count }, (item, index) =>
              <View key={`index_${index}`} style={{ flex: 1, height: 7, margin: 1, backgroundColor: (index < done) && done > 0 ? "green" : "lightgrey" }}></View>
            )}
          </View>
        }
      </View>
      {/* Progress text */}
      <View>
        <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 14, paddingVertical: 5, color: "#3e3e3e" }}>
          {`Выполнено уроков: ${done} из ${topic && topic.count}`}
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
              borderWidth: 1,
              borderColor: 'lightgrey'
            }}
            resizeMode={"contain"}
            source={{
              uri: Links.Public + topic.picture
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