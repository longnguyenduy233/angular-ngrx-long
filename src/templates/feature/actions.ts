export function feature_actions_ts(featureNameClassName: string, featureNameVarName: string): string {
  return `
import { createAction, props } from '@ngrx/store';
import { ${featureNameClassName} } from 'src/app/models';
import { CustomQuery } from 'src/app/api/api-models/pagination';

export enum ${featureNameClassName}ActionType {
  Load = '[${featureNameClassName} Component] Load',
  Search${featureNameClassName}s = '[${featureNameClassName} Component] Search ${featureNameClassName}',
  Update${featureNameClassName} = '[${featureNameClassName} Component] Update ${featureNameClassName}',
  Create${featureNameClassName} = '[${featureNameClassName} Component] Create ${featureNameClassName}',
  UpdateTotal = '[${featureNameClassName} Component] Update Total',
  ActionFailure = '[${featureNameClassName} API] Execute action failure',
  ActionSuccess = '[${featureNameClassName} API] Execute action success',
  LoadSuccess = '[${featureNameClassName} API] Load Success',
  Refresh = '[${featureNameClassName} Page] Refresh',
  Selected = '[${featureNameClassName} Page] Select',
  SubmitSuccess = '[${featureNameClassName} API] Submit Success'
}

export const load = createAction(${featureNameClassName}ActionType.Load);
export const search${featureNameClassName}s = createAction(
  ${featureNameClassName}ActionType.Search${featureNameClassName}s,
  props<{ query: CustomQuery }>()
);

export const create${featureNameClassName} = createAction(
  ${featureNameClassName}ActionType.Create${featureNameClassName},
  props<{ ${featureNameVarName}: ${featureNameClassName}, ref: any }>()
);

export const actionFailure = createAction(
  ${featureNameClassName}ActionType.ActionFailure,
  props<{ error: string }>()
);

export const actionSuccess = createAction(
  ${featureNameClassName}ActionType.ActionSuccess,
  props<{ msg: string }>()
);

export const updateTotal = createAction(
  ${featureNameClassName}ActionType.UpdateTotal,
  props<{ total: number }>()
);

export const loadSuccess = createAction(
  ${featureNameClassName}ActionType.LoadSuccess,
  props<{ ${featureNameVarName}s: ${featureNameClassName}[] }>()
);

export const submitSuccess = createAction(
  ${featureNameClassName}ActionType.SubmitSuccess,
  props<{ msg: string }>()
);

export const refresh = createAction(${featureNameClassName}ActionType.Refresh);

export const select = createAction(
  ${featureNameClassName}ActionType.Selected,
  props<{ selected${featureNameClassName}Id: string | number }>()
);

export const update${featureNameClassName} = createAction(
  ${featureNameClassName}ActionType.Update${featureNameClassName},
  props<{ ${featureNameVarName}: ${featureNameClassName}, ref: any }>()
);
`;
}