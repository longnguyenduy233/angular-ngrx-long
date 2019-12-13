export function feature_reducer_ts(
    featureNameClassName: string,
    featureNameVarName: string
  ): string {
    return `
import { Action, createReducer, on } from '@ngrx/store';
import * as ${featureNameVarName}Actions from './actions';
import { ${featureNameVarName}Adapter, initialState, State } from './state';

const featureReducer = createReducer(
  initialState,
  on(${featureNameVarName}Actions.load, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(${featureNameVarName}Actions.search${featureNameClassName}s, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(${featureNameVarName}Actions.updateTotal, (state, { total }) => {
    return {...state, total};
  }),
  on(${featureNameVarName}Actions.loadSuccess, (state, { ${featureNameVarName}s }) => {
    return ${featureNameVarName}Adapter.addAll(${featureNameVarName}s, {
      ...state,
      isLoading: false,
      error: null
    });
  }),
  on(${featureNameVarName}Actions.actionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(${featureNameVarName}Actions.select, (state, { selected${featureNameClassName}Id }) => {
    return ({
      ...state,
      selected${featureNameClassName}Id
    });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return featureReducer(state, action);
}
`;
  }