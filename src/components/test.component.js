import React, { useEffect, useState } from 'react';

export default TestComponent = (props) => {
  return (
    <View key={`question_${index}`}>
      <Text style={{ marginVertical: 5, fontSize: 18 }}>
        {element.question}
      </Text>
      <View>
        {element.answers.map((answer, sub_index) => {
          return (
            <View key={`answer_${index}_${sub_index}`}>
              <CheckBox
                title={answer.label}
                containerStyle={{ marginHorizontal: 0, marginLeft: 0, marginRight: 0 }}
                checked={sub_index == form[index]}
                onPress={() => { checkAnswer(index, sub_index) }}
              />
            </View>
          )
        })}
      </View>
    </View>
  )
}
