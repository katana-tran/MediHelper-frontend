import { Card, ListItem } from 'react-native-elements'
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'

class MedicationReminderContainer extends Component{
    
    render(){
        const list = [
            {
              name: 'Reminder 1',
              avatar_url: 'https://www.strata.com/wp-content/uploads/2017/06/Prescription-container-1.png',
              subtitle: 'Taken once a week: Monday'
            },
            {
              name: 'Medication 2',
              avatar_url: 'https://previews.123rf.com/images/72soul/72soul1202/72soul120200111/12739944-illustration-depicting-a-single-medication-container-with-the-words-brighter-future-tablets-on-the-f.jpg',
              subtitle: 'Taken every 4 hours'
            }
          ]

        return(
            <View>
            {
                list.map((l, i) => (
                <ListItem
                key={i}
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