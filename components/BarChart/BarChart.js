import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Dimensions, Image, TouchableOpacity, animation } from 'react-native';
import styles from '../Styling/BarchartStyle';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from 'react-native-chart-kit'
import { BarChart } from 'react-native-charts';

class ChartScreen extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return ( 
            <View style = { styles.mainContainer } >
            
            <BarChart dataSets = {
                [{
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
                    {
                        fillColor: '#a6a6a6',
                        data: [{
                            value: 6,

                        }, ]
                    },
                ]
            }
            graduation = { 1 }
            horizontal = { false }
            showGrid = { true }
            barSpacing = { 8 }
            style = {
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