import { APPRoutingModule, routedComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData, CommonModule } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ...routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    APPRoutingModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule
  ],
  exports: [
    BrowserAnimationsModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  /** 配置 ng-zorro-antd 国际化 **/
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, CommonModule]
})
export class AppModule { }
