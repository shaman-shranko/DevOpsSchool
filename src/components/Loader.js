import React from 'react';
import { commonStyle } from '../styles/common.style'
import { ActivityIndicator, View } from 'react-native'

export default Loader = () => {
  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.Centered]}>
        <View style={commonStyle.LoaderContainer}>
          <ActivityIndicator size={50} color={'#6786DA'} />
        </View>
      </View>
    </View>
  )
}