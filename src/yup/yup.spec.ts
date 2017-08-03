import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { YUPComponent } from './yup.component';
import { DialogComponent, AlertComponent, ToastComponent, CustomComponent, LoadComponent } from './dialog.component';
import { YUPService } from './yup.service';

describe('YUPComponent (inline template)', () => {

  let comp: YUPComponent;
  let fixture: ComponentFixture<YUPComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ YUPComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [YUPService]
    });
    fixture = TestBed.createComponent(YUPComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('yup-dialog'));
    el = de.nativeElement;
  });

});
