import React from 'react';
import { View } from 'react-native';
import styles from '../Styling/BarchartStyle';
import { BarChart } from 'react-native-charts';
class ChartScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.mainContainer} >
                <BarChart dataSets={
                    //current week graph
                    [
                        {
                            fillColor: '#FF6200',
                            data: [
                                { value: 6 },
                                { value: 0 },
                            ]
                        },
                        {
                            fillColor: '#FF6200',
                            data: [
                                { value: 0 },
                                // { value: 0 },
                            ]
                        },
                        //last week graph
                        {
                            fillColor: '#a6a6a6',

                            data: [{
                                value: 6,

                            },]
                        },
                    ]
                }
                    graduation={1}
                    horizontal={false}
                    showGrid={true}
                    barSpacing={8}
                    style={
                        {
                            height: 90,
                            margin: 15,
                            width: 140,

                        }
                    }
                />
            </View>
        )
    }
}
export default ChartScreen;