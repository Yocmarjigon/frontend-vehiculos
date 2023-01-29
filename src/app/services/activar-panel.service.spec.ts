import { TestBed } from '@angular/core/testing';

import { ActivarPanelService } from './activar-panel.service';

describe('ActivarPanelService', () => {
  let service: ActivarPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivarPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
