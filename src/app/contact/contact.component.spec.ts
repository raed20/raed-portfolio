import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [BrowserAnimationsModule] // Required for animations to work
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ContactComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize animationState to "in" on init', () => {
    component.ngOnInit();
    expect(component.animationState).toBe('in');
  });
  it('should navigate to phone URL on callPhone()', () => {
    // Mock window.location.href setter
    let hrefValue = '';
    spyOnProperty(window.location, 'href', 'set').and.callFake((url: string) => {
      hrefValue = url;
    });

    component.callPhone();

    expect(hrefValue).toBe(`tel:${component.contactInfo.phone}`);
  });

  it('should navigate to mailto URL on sendEmail()', () => {
    let hrefValue = '';
    spyOnProperty(window.location, 'href', 'set').and.callFake((url: string) => {
      hrefValue = url;
    });

    component.sendEmail();

    expect(hrefValue).toBe(`mailto:${component.contactInfo.email}`);
  });

  it('should call callPhone() on Enter or Space keypress in handleKey()', () => {
    spyOn(component, 'callPhone');

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    component.handleKey(enterEvent);
    expect(component.callPhone).toHaveBeenCalled();

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    component.handleKey(spaceEvent);
    expect(component.callPhone).toHaveBeenCalledTimes(2);
  });

  it('should not call callPhone() on other keys in handleKey()', () => {
    spyOn(component, 'callPhone');
    const otherKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleKey(otherKeyEvent);
    expect(component.callPhone).not.toHaveBeenCalled();
  });

  it('should open Google Maps in new tab on openLocation()', () => {
    spyOn(window, 'open');
    component.openLocation();
    const encodedLocation = encodeURIComponent(component.contactInfo.location);
    expect(window.open).toHaveBeenCalledWith(
      `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`,
      '_blank'
    );
  });

  it('should log hover and leave events', () => {
    spyOn(console, 'log');
    component.onSocialHover('github');
    expect(console.log).toHaveBeenCalledWith('Hovering over github');

    component.onSocialLeave();
    expect(console.log).toHaveBeenCalledWith('Social hover ended');
  });

  it('should copy text to clipboard and log success', async () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    spyOn(console, 'log');

    await component.copyToClipboard('test text', 'Phone');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
    expect(console.log).toHaveBeenCalledWith('Phone copied to clipboard: test text');
  });

  it('should log error if clipboard write fails', async () => {
    const error = new Error('Clipboard error');
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.reject(error));
    spyOn(console, 'error');

    await component.copyToClipboard('fail text', 'Email');
    expect(console.error).toHaveBeenCalledWith('Could not copy text: ', error);
  });

  it('should navigate to phone URL on callPhone()', () => {
    let hrefValue = '';
    spyOnProperty(window.location, 'href', 'set').and.callFake((url: string) => {
      hrefValue = url;
    });

    component.callPhone();

    expect(hrefValue).toBe(`tel:${component.contactInfo.phone}`);
  });

  it('should navigate to mailto URL on sendEmail()', () => {
    let hrefValue = '';
    spyOnProperty(window.location, 'href', 'set').and.callFake((url: string) => {
      hrefValue = url;
    });

    component.sendEmail();

    expect(hrefValue).toBe(`mailto:${component.contactInfo.email}`);
  });

});
