export function feature_store_module_ts(
    featureNameClassName: string,
    featureNameVarName: string
  ): string {
    return `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import { ${featureNameClassName}StoreEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('${featureNameVarName}', reducer),
    EffectsModule.forFeature([${featureNameClassName}StoreEffects])
  ]
})
export class ${featureNameClassName}StoreModule { }
`;
  }