import React from 'react';
import { ScrollView, View } from 'react-native'
import LessonComponent from './lesson.component';
import { commonStyle } from '../styles/common.style'

export default SectionComponent = (props) => {

  const { data, index } = props

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <ScrollView style={{ height: "100%", marginBottom: 0, paddingBottom: 20 }}>
        {data?.map((element, number) => (
          <LessonComponent
            data={element.html}
            test={element.type == 'tests' ? element : null}
            url={element.type == 'video' ? element.name : null}
            type={element.type}
            key={`lc_${index}_${number}`}
          />
        ))}
      </ScrollView>
    </View>
  )
}