import React from 'react';
import { commonStyle } from '../styles/common.style'
import { ActivityIndicator, View } from 'react-native'
import LessonComponent from './lesson.component';

export default SectionComponent = (props) => {

  const { data, index } = props

  return (
    <View style={{ height: "100%", width: "100%" }}>
      
      {data?.map((element, number) => (<LessonComponent data={element.html} type={element.type} key={`lc_${index}_${number}`} />))}
      
    </View>
  )
}