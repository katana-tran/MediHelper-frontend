import { Card, ListItem } from 'react-native-elements'
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'

class MedicationReminderContainer extends Component{
    
    render(){
        const list = [
            {
              name: 'Amy Farha',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              subtitle: 'Vice President'
            },
            {
              name: 'Chris Jackson',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman'
            }
          ]

        return(
            <View>
            {
                list.map((l, i) => (
                <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['#FF9800', '#F44336'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                leftAvatar={{ rounded: true, source: {uri: l.avatar_url}}}
                title={l.name}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={l.subtitle}
                chevron={{ color: 'white' }}
                    // key={i}
                    // leftAvatar={{ source: { uri: l.avatar_url } }}
                    // title={l.name}
                    // subtitle={l.subtitle}
                    // bottomDivider
                />
                ))
            }
            </View>
        )
    }
}

export default MedicationReminderContainer