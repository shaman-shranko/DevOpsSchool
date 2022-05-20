import React from 'react';
import { commonStyle } from '../styles/common.style'
import { Text, View } from 'react-native'

export default Empty = ({ message = null, children = null }) => {
  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.Centered]}>
        <View style={commonStyle.LoaderContainer}>
          <Text>{message ?? "No data"}</Text>
          <View>
            {children}
          </View>
        </View>
      </View>
    </View>
  )
}