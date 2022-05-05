import React, { useState } from 'react';
import { CheckBox, Button } from "react-native-elements";
import { commonStyle } from '../styles/common.style'
import { Text, View } from 'react-native'

export default Tests = (props) => {
  const { questions, needFinish = false } = props;
  const [active, setActive] = useState(0)
  const [form, setForm] = useState([])
  const count = questions.length
  
  const Correct = { borderWidth: 1, borderColor: 'green' }
  const Incorrect = { borderWidth: 1, borderColor: 'red' }

  const checkSelection = (index, subindex, correct) => {
    let style = { marginHorizontal: 0, marginLeft: 0, marginRight: 0 }
    if (form[index] >= 0) {
      if (correct || form[index] == subindex) {
        style = { ...style, ...Correct }
      }
      if (!correct && form[index] == subindex) {
        style = { ...style, ...Incorrect }
      }
    }
    return style
  }

  const checkAnswer = (index, answer) => {
    if (!form[index]) {
      form[index] = answer
      setForm({ ...form })
    }
  }

  return (
    <View style={[commonStyle.CardContainer, { width: "100%", padding: 0 }]}>
      <View style={commonStyle.Card}>

        <View style={{ flexDirection: "row" }}>
          {Array.from({ length: count }, (item, index) => (<View
            key={`index_${index}`}
            style={{
              flex: 1,
              height: 10,
              margin: 1,
              backgroundColor: !!(index <= active) ? "lightgreen" : "lightgrey"
            }}>
          </View>
          )
          )}
        </View>
        {/* Quiz */}
        <View>
          {questions && questions.map((element, index) => {
            if (index == active) {
              return (
                <View key={`question_${index}`}>
                  <Text style={{ marginVertical: 5, fontSize: 18 }}>
                    {element.question}
                  </Text>
                  <View>
                    {element.answers.map((answer, sub_index) => (
                      <View key={`answer_${index}_${sub_index}`}>
                        <CheckBox
                          title={answer.answer}
                          disabled={form[index] >= 0}
                          containerStyle={checkSelection(index, sub_index, answer.correct)}
                          checked={sub_index == form[index]}
                          onPress={() => { checkAnswer(index, sub_index) }}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              )
            }
          })}
        </View>
        {/* Next question button */}
        <View>
          {count >= 1 && active < count - 1 &&
            <Button
              title={'Next question'}
              onPress={() => { if (active < count) setActive(active + 1) }}
              disabled={!(active < count - 1)}
            />
          }
          {active == count - 1 && needFinish &&
            <Button
              title={'Finish test'}
              onPress={() => { console.log("Test finished"); }}
            />
          }
        </View>
      </View>
    </View>
  )
}