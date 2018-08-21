import {combineEpics} from 'redux-observable';
// import {fetchAllTablesChartDescriptorEpic, fetchMetricEpic}
//     from './containers/alltablemetrics/epics/alltablesmetricsepics';

const rootEpic = combineEpics(
    // fetchAllTablesChartDescriptorEpic,
    // fetchMetricEpic,
);

export {
    rootEpic,
};
