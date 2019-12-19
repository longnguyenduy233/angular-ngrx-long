export function feature_index_ts(
    featureNameClassName: string,
    dirName: string
  ): string {
    return `
import * as ${featureNameClassName}StoreState from './state';
import * as ${featureNameClassName}StoreActions from './actions';
import * as ${featureNameClassName}StoreEffects from './effects';
import * as ${featureNameClassName}StoreSelectors from './selectors';
import * as ${featureNameClassName}StoreReducer from './reducer';
export {
    ${featureNameClassName}StoreModule
} from './${dirName}.module';

export {
    ${featureNameClassName}StoreState,
    ${featureNameClassName}StoreActions,
    ${featureNameClassName}StoreEffects,
    ${featureNameClassName}StoreSelectors,
    ${featureNameClassName}StoreReducer
};
`;
}