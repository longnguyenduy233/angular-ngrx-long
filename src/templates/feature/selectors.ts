export function feature_selector_ts(
    featureNameClassName: string,
    featureNameVarName: string
  ): string {
    return `
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ${featureNameClassName} } from '../../../models';
import { ${featureNameVarName}Adapter, State } from './state';

export const select${featureNameClassName}State = createFeatureSelector<State>('${featureNameVarName}');

export const selectAll${featureNameClassName}Items: (
    state: object
) => ${featureNameClassName}[] = ${featureNameVarName}Adapter.getSelectors(select${featureNameClassName}State).selectAll;

export const selectTotal${featureNameClassName}Items = createSelector(
    select${featureNameClassName}State,
    (state: State): number => {
        return state.total;
    }
);

const selectSelected${featureNameClassName}Id = createSelector(
    select${featureNameClassName}State,
    (state: State): string | number => state.selected${featureNameClassName}Id
);

export const selectCurrent${featureNameClassName} = createSelector(
    selectAll${featureNameClassName}Items,
    selectSelected${featureNameClassName}Id,
    (all${featureNameClassName}s: ${featureNameClassName}[], selected${featureNameClassName}Id: string | number ) => {
        if (all${featureNameClassName}s && selected${featureNameClassName}Id) {
            return all${featureNameClassName}s.find(p => p.id === selected${featureNameClassName}Id);
        } else {
            return null;
        }
    }
);

export const select${featureNameClassName}Error = createSelector(
    select${featureNameClassName}State,
    (state: State): any => state.error
);

export const select${featureNameClassName}IsLoading = createSelector(
    select${featureNameClassName}State,
    (state: State): boolean => state.isLoading
);
`;
  }