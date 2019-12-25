export function feature_state_ts(
    featureNameClassName: string,
    featureNameVarName: string
  ): string {
    return `
import { ${featureNameClassName} } from 'src/app/models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const ${featureNameVarName}Adapter: EntityAdapter<${featureNameClassName}> = createEntityAdapter<${featureNameClassName}>({
  selectId: model => model.id.toString()
});
export interface State extends EntityState<${featureNameClassName}> {
  isLoading?: boolean;
  error?: any;
  total?: number;
  selected${featureNameClassName}Id?: string | number;
}

export const initialState: State = ${featureNameVarName}Adapter.getInitialState({
  isLoading: false,
  error: null,
  selected${featureNameClassName}Id: null,
  total: 0
});
`;
  }