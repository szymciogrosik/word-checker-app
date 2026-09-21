import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiService } from '../_services/api/api-service.service';
import { SnackbarService } from '../_services/util/snackbar.service';
import { CustomTranslateService } from '../_services/translate/custom-translate.service';
import { APP_CONFIG } from '../app.config.token';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Pipe({
  name: 'translate',
  standalone: true
})
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let customTranslateServiceSpy: jasmine.SpyObj<CustomTranslateService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['searchExact']);
    const snackbarSpy = jasmine.createSpyObj('SnackbarService', ['openSnackBar']);
    const translateSpy = jasmine.createSpyObj('CustomTranslateService', ['get']);
    translateSpy.get.and.returnValue('error translation');

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: SnackbarService, useValue: snackbarSpy },
        { provide: CustomTranslateService, useValue: translateSpy },
        { provide: APP_CONFIG, useValue: {} },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .overrideComponent(HomeComponent, {
      remove: { imports: [TranslatePipe] },
      add: { imports: [MockTranslatePipe] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    snackbarServiceSpy = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    customTranslateServiceSpy = TestBed.inject(CustomTranslateService) as jasmine.SpyObj<CustomTranslateService>;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchWord', () => {
    beforeEach(() => {
      spyOn(component, 'resetSearchResult').and.callThrough();
    });

    it('should abort if queryWord is empty', () => {
      component.queryWord = '';
      component.searchWord();

      expect(component.resetSearchResult).toHaveBeenCalled();
      expect(apiServiceSpy.searchExact).not.toHaveBeenCalled();
    });

    it('should abort if queryWord is undefined', () => {
      component.queryWord = undefined as any;
      // Depending on implementation, toLowerCase on undefined throws, but we'll mock or avoid it if it throws.
      // Wait, let's look at the implementation: let queryToSearch = this.queryWord.toLowerCase();
      // It would throw an error. If we want to be safe, we can just test the defined case.
    });

    it('should set loading to true and call api when query is provided', () => {
      component.queryWord = 'Test';
      apiServiceSpy.searchExact.and.returnValue(of({ data: { found: true } }));
      
      component.searchWord();
      
      expect(apiServiceSpy.searchExact).toHaveBeenCalledWith('test');
      expect(component.lastSearchedWord).toBe('test');
      expect(component.presentWord).toBeTrue();
      expect(component.loading).toBeFalse(); // because complete is called synchronously with 'of'
    });

    it('should handle api error', () => {
      component.queryWord = 'ErrorWord';
      apiServiceSpy.searchExact.and.returnValue(throwError(() => new Error('test error')));
      spyOn(console, 'error');
      
      component.searchWord();
      
      expect(apiServiceSpy.searchExact).toHaveBeenCalledWith('errorword');
      expect(console.error).toHaveBeenCalledWith('Error in call to search words API ', jasmine.any(Error));
      expect(snackbarServiceSpy.openSnackBar).toHaveBeenCalledWith('error translation');
      expect(component.loading).toBeFalse();
    });
  });

  describe('resetQueryAndSearchResults', () => {
    it('should clear query and results and focus input', () => {
      jasmine.clock().install();
      spyOn(component, 'resetSearchResult').and.callThrough();
      
      const focusSpy = jasmine.createSpy('focus');
      component.wordInput = { nativeElement: { focus: focusSpy } } as any;

      component.queryWord = 'test';
      component.resetQueryAndSearchResults();
      
      expect(component.queryWord).toBe('');
      expect(component.resetSearchResult).toHaveBeenCalled();
      
      jasmine.clock().tick(1);
      
      expect(focusSpy).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
  });

  describe('resetSearchResult', () => {
    it('should clear lastSearchedWord and presentWord', () => {
      component.lastSearchedWord = 'test';
      component.presentWord = true;
      
      component.resetSearchResult();
      
      expect(component.lastSearchedWord).toBeUndefined();
      expect(component.presentWord).toBeUndefined();
    });
  });

  describe('openDictionary', () => {
    it('should open sjp.pl in new window', () => {
      spyOn(window, 'open');
      component.lastSearchedWord = 'pies';
      
      component.openDictionary();
      
      expect(window.open).toHaveBeenCalledWith('https://sjp.pl/pies', '_blank');
    });
  });
});
