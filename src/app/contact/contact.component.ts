import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

interface ContactInfo {
  phone: string;
  email: string;
  location: string;
}

interface ProfileInfo {
  name: string;
  title: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('slideUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('800ms ease-out')
      ])
    ]),
    trigger('fadeInLeft', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('600ms 200ms ease-out')
      ])
    ]),
    trigger('fadeInRight', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('600ms 400ms ease-out')
      ])
    ]),
    trigger('fadeInUp', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms 600ms ease-out')
      ])
    ])
  ]
})
export class ContactComponent implements OnInit {
  animationState = 'in';

  contactInfo: ContactInfo = {
    phone: '+216 24 745 035',
    email: 'raed.maaloul@esprit.tn',
    location: 'Ariana, Tunisia'
  };

  profileInfo: ProfileInfo = {
    name: 'Raed Maaloul',
    title: 'Software engineer '
  };

  socialLinks: SocialLink[] = [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/raed-maaloul-9b5912173/',
      icon: 'fab fa-linkedin-in'
    },
    {
      platform: 'github',
      url: 'https://github.com/raed20',
      icon: 'fab fa-github'
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/raed.maaloul.3/',
      icon: 'fab fa-facebook'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Component initialization
    this.animationState = 'in';
  }

  callPhone(): void {
    window.location.href = `tel:${this.contactInfo.phone}`;
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.contactInfo.email}`;
  }

  onSocialHover(platform: string): void {
    // Add any hover effects logic here
    console.log(`Hovering over ${platform}`);
  }

  onSocialLeave(): void {
    // Add any hover leave effects logic here
    console.log('Social hover ended');
  }

  // Optional: Method to copy contact info to clipboard
  copyToClipboard(text: string, type: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log(`${type} copied to clipboard: ${text}`);
      // You can add a toast notification here
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  // Optional: Method to open map location
  openLocation(): void {
    const encodedLocation = encodeURIComponent(this.contactInfo.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  }

  handleKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.callPhone();
      event.preventDefault(); // Prevents scrolling on spacebar
    }
  }

}
