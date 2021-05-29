import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { 
  //Singleton guard per prevenire duplicazione dei servizi injectable
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    //Se esiste già un'istanza del CoreModule
    if(parentModule){
      throw new Error("CoreModule è già stato instanziato. Assicurati di averlo importato solamente in AppModule");
    }
  }

  //metodo forRoot per disporre i servizi in modo unico
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: false}},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
        // {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
      ]
    }
  }
}
