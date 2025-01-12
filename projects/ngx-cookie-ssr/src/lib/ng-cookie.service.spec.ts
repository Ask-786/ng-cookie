import { TestBed } from '@angular/core/testing';

import { NgCookieService } from './ng-cookie.service';

describe('NgCookieService', () => {
  let service: NgCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
