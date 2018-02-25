
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';

import 'rxjs/add/operator/toPromise';
import { InitTagsService } from './app-init.service';
import { ItemComponentComponent } from './item-component/item-component.component';
import { ItemEditComponentComponent } from './item-edit-component/item-edit-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponentComponent,
    ItemEditComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    InitTagsService,
    { provide: APP_INITIALIZER,
      useFactory: (initTagsService: InitTagsService) => function() {return initTagsService.loadTags(); },
      deps: [ InitTagsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

