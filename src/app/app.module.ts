import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompositionComponent } from './component/composition/composition.component';
import { RemoveWhiteSpacePipe} from './pipes/RemoveWhiteSpace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CompositionComponent,
    RemoveWhiteSpacePipe

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
