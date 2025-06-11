import {Component, HostListener, OnInit } from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFadeIn', [
      transition(':enter', [
        // This will apply to each child element with a delay
        query('span', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'portfolio-frontend';
  currentSection = 'about';  // default active section
  ngOnInit(): void {
    // Initialization logic here (or leave empty if not needed)
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        // offsetTop is distance from top of the page
        // Adjust offset for your fixed nav height (e.g., 80px)
        if (scrollPos >= el.offsetTop - 100) {
          this.currentSection = section;
        }
      }
    }
  }
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();  // prevent default anchor jump

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
