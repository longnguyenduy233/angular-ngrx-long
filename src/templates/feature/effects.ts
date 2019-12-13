export function feature_effects_ts(
    featureNameClassName: string,
    featureNameVarName: string
  ): string {
    return `
  import { get } from 'lodash';
  import { of } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { Actions, createEffect, ofType } from '@ngrx/effects';
  import { catchError, concatMap, map, switchMap, mergeMap } from 'rxjs/operators';

  import * as ${featureNameVarName}Actions from './actions';
  import { ${featureNameClassName}ManagementAPIService as DataService } from '../../../api';
  import { ${featureNameClassName}Adapter } from 'src/app/core/adapter';
  import { CommonService } from 'src/app/shared/services/common.service';
  import { DialogService } from 'src/app/shared/common/dialog/dialog.service';
  import { COMMON_ERRORS } from 'src/app/shared/services/error-handler.service';

  @Injectable()
  export class ${featureNameClassName}StoreEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private commonService: CommonService,
    private ${featureNameVarName}Adapter: ${featureNameClassName}Adapter,
    private dialogService: DialogService
  ) { }

  loadRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${featureNameVarName}Actions.load),
      concatMap(() =>
        this.dataService.search${featureNameClassName}s()
          .pipe(
            map(items =>
              ${featureNameVarName}Actions.loadSuccess({
                ${featureNameVarName}s: items.data.items.map(item => this.${featureNameVarName}Adapter.adapt(item))
              })
            ),
            catchError(error => of(${featureNameVarName}Actions.actionFailure({ error })))
          )
      )
    )
  );

  search${featureNameClassName}sEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(${featureNameVarName}Actions.search${featureNameClassName}s),
      switchMap((action: any) => {
        delete action.type;
        return this.dataService.search${featureNameClassName}s(action)
          .pipe(
            mergeMap(items => {
              return [
                ${featureNameVarName}Actions.loadSuccess({
                  ${featureNameVarName}s: items ? items.data.items.map(item => this.${featureNameVarName}Adapter.adapt(item)) : []
              }),
              ${featureNameVarName}Actions.updateTotal({
                total: items ? items.data.pagination.total : 0
              })
            ];
          }),
            catchError(error => of(${featureNameVarName}Actions.actionFailure({ error })))
          );
      })
    );
  });

  createRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${featureNameVarName}Actions.create${featureNameClassName}),
      concatMap((action: any) =>
        this.dataService.create${featureNameClassName}(action.${featureNameVarName})
        .pipe(
          map(response => {
            action.ref.close();
            this.commonService.formatDataResponse(response, true);
            return ${featureNameVarName}Actions.actionSuccess({ msg: 'success' });
          }),
          catchError(error => of(${featureNameVarName}Actions.actionFailure({ error })))
        )
      )
    )
  );

  updateRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${featureNameVarName}Actions.update${featureNameClassName}),
      concatMap((action: any) =>
        this.dataService.update${featureNameClassName}(action.${featureNameVarName})
          .pipe(
            map(response => {
              action.ref.close();
              this.commonService.formatDataResponse(response, true);
              return ${featureNameVarName}Actions.actionSuccess({ msg: 'success' });
            }),
            catchError(error => {
              return of(${featureNameVarName}Actions.actionFailure({ error }));
            })
          )
      )
    )
  );

  actionFailureEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${featureNameVarName}Actions.actionFailure),
      map((action: any) => {
        const errCode = get(action, 'error.status');
        if (COMMON_ERRORS.indexOf(errCode) === -1) {
          return this.dialogService.openWarningDialog(get(action, 'error.error.meta.message', 'Error Occurs!'));
        }
      })
    ),
    { dispatch: false }
  );

  refreshEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${featureNameVarName}Actions.refresh),
      map(_ => ${featureNameVarName}Actions.load())
    )
  );
}
`;
  }