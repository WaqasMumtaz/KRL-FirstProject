// import React from 'react';
// import { View } from 'react-native';
// import styles from '../Styling/BarchartStyle';
// // import { BarChart } from 'react-native-charts';​
// // import { BarChart, Grid } from 'react-native-svg-charts';

// import { LinearGradient, Stop, Defs } from 'react-native-svg'
// import { BarChart, Grid } from 'react-native-svg-charts'

// class ChartScreen extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         // const fill = 'rgb(134, 65, 244)'
//         // const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80];
//         const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

//         const Gradient = () => (
//             <Defs key={'gradient'}>
//                 <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
//                     <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
//                     <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
//                 </LinearGradient>
//             </Defs>
//         )
//         return (
//             <View style={styles.mainContainer}>
//                 {/* <BarChart
//                     style={{ height: 200 }}
//                     data={data}
//                     svg={{ fill }}
//                     contentInset={{ top: 30, bottom: 30 }}
//                 >
//                     <Grid />
//                 </BarChart> */}
//                 <BarChart
//                     style={{ height: 200 }}
//                     data={data}
//                     contentInset={{ top: 20, bottom: 20 }}
//                     svg={{
//                         strokeWidth: 2,
//                         fill: 'url(#gradient)',
//                     }}
//                 >
//                     <Grid />
//                     <Gradient />
//                 </BarChart>
//             </View>
//         )
//     }

// }

// export default ChartScreen;


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