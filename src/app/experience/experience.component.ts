import { Component, OnInit } from '@angular/core';

// Ensure proper typing for DOM events
declare global {
  interface Event {
    stopPropagation(): void;
  }
}

interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'internship' | 'project' | 'full-time';
  description: string[];
  technologies: string[];
  achievements?: string[];
  icon: string;
  color: string;
  screenshots: string[]; // Array of screenshot URLs
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences: Experience[] = [
    {
      id: 1,
      title: 'DevOps Engineer',
      company: 'Capgemini Engineering',
      location: 'Tunis, Tunisia',
      period: 'July - August 2025',
      type: 'internship',
      description: [
        'Built complete CI/CD pipeline for Angular application deployment',
        'Implemented automated testing with Jasmine, Karma, Robot Framework and Selenium',
        'Deployed applications on Azure Kubernetes Service (AKS)',
        'Set up monitoring solutions using Prometheus and Grafana',
        'Managed infrastructure as code with Terraform'
      ],
      technologies: ['GitHub', 'Jenkins', 'Angular', 'SonarQube', 'Docker', 'Azure Container Registry', 'Azure Kubernetes Service', 'Prometheus', 'Grafana', 'Terraform', 'DuckDNS'],
      icon: '⚙️',
      color: '#F59E0B',
      screenshots: [
        'assets/images/img.png',
        'assets/images/pipeline jenkins.png'
      ]
    },
    {
      id: 2,
      title: 'Odoo Developer',
      company: 'TEAMDOO',
      location: 'Tunis, Tunisia',
      period: 'June - July 2024',
      type: 'internship',
      description: [
        'Customized Odoo modules for sales and inventory management',
        'Developed and maintained views, forms, and business logic',
        'Integrated third-party APIs using Python and XML'
      ],
      technologies: ['Odoo', 'Python', 'XML', 'PostgreSQL', 'Git'],
      icon: '🏢',
      color: '#4F46E5',
      screenshots: [
        'assets/images/3.png',
        'assets/images/4.png',
        'assets/images/odooo.png',
        'assets/images/quo.png',
        'assets/images/setsodoo.png',
        'assets/images/setsss.png',
      ]
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'EXCEL-LENCE',
      location: 'Manouba, Tunisia',
      period: 'February - June 2023',
      type: 'internship',
      description: [
        'Designed a comprehensive Data warehouse architecture',
        'Performed data preparation and cleaning processes',
        'Developed interactive dashboards for business insights',
        'Deployed dashboard solutions on web platforms'
      ],
      technologies: ['Excel', 'MySQL', 'Alteryx', 'Power BI', 'Azure'],
      achievements: ['Final Project Internship'],
      icon: '📊',
      color: '#059669',
      screenshots: [
        'assets/images/dash mach.png',
        'assets/images/dash pers.png',
        'assets/images/dash proj.png'
      ]
    },
    {
      id: 4,
      title: 'Web Developer',
      company: 'SOLIXY',
      location: 'Gabés, Tunisia',
      period: 'August 2022',
      type: 'internship',
      description: [
        'Developed web application for Excel file database integration',
        'Implemented file upload and data processing functionality',
        'Created user-friendly interface for data management'
      ],
      technologies: ['Angular', 'Symfony', 'Excel', 'MySQL'],
      icon: '💻',
      color: '#DC2626',
      screenshots: [

      ]
    },
    {
      id: 5,
      title: 'Cloud Infrastructure Deployment',
      company: 'Academic Project',
      location: 'ESPRIT, Tunisia',
      period: '2025',
      type: 'project',
      description: [
        'Deployed rental platform on OpenStack infrastructure',
        'Implemented CI/CD pipeline on Microsoft Azure',
        'Managed cloud resources and environment configuration',
        'Set up monitoring and automated deployment systems'
      ],
      technologies: ['OpenStack', 'Azure', 'Docker', 'Kubernetes', 'Linux'],
      icon: '☁️',
      color: '#7C3AED',
      screenshots: [
        'assets/images/K8s.png',
        'assets/images/Grafana.png',
        'assets/images/Granfana2.png'
      ]
    },
    {
      id: 6,
      title: 'Rental Management Platform',
      company: 'Personal Project',
      location: 'Tunisia',
      period: '2025',
      type: 'project',
      description: [
        'Built complete rental platform with modern tech stack',
        'Developed secure REST APIs with authentication',
        'Implemented role management and admin dashboard',
        'Connected frontend and backend with MySQL database'
      ],
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Git', 'Postman'],
      icon: '🏠',
      color: '#EA580C',
      screenshots: [
        'assets/images/signin.png',
        'assets/images/signup.png',
        'assets/images/home1.png',
        'assets/images/home2.png',
        'assets/images/home3.png',
        'assets/images/home4.png',
        'assets/images/home5.png',
        'assets/images/myreservation.png',
        'assets/images/payment1.png',
        'assets/images/payment2.png',
        'assets/images/payment3.png',
        'assets/images/product-details1.png',
        'assets/images/dashboard.png'
      ]
    },
    {
      id: 7,
      title: 'Participation in Bal des Projets',
      company: 'ESPRIT',
      location: 'Ariana, Tunisia',
      period: '2025',
      type: 'project',
      description: [
        'Presented an innovative student project during the Bal des Projets event',
        'Collaborated with teammates to demonstrate technical and business value',
        'Engaged with industry professionals and academic evaluators',
        'Showcased application features and answered audience questions'
      ],
      technologies: ['Presentation', 'Teamwork', 'Project Management'],
      icon: '🎓',
      color: '#10B981',
      screenshots: [

      ]
    }
  ];

  selectedExperience: Experience | null = null;
  isModalOpen = false;
  currentScreenshotIndex = 0;

  constructor() { }

  ngOnInit(): void {
    // Ensure cards are visible immediately, then add animation
    setTimeout(() => {
      this.animateCards();
    }, 100);

    // Fallback: if animation doesn't work, make sure cards are visible
    setTimeout(() => {
      this.ensureCardsVisible();
    }, 2000);
  }

  openModal(experience: Experience): void {
    console.log('Opening modal for:', experience); // Debug log
    this.selectedExperience = experience;
    this.isModalOpen = true;
    this.currentScreenshotIndex = 0;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedExperience = null;
    this.currentScreenshotIndex = 0;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  nextScreenshot(): void {
    if (this.selectedExperience && this.currentScreenshotIndex < this.selectedExperience.screenshots.length - 1) {
      this.currentScreenshotIndex++;
    }
  }

  previousScreenshot(): void {
    if (this.currentScreenshotIndex > 0) {
      this.currentScreenshotIndex--;
    }
  }

  goToScreenshot(index: number): void {
    this.currentScreenshotIndex = index;
  }

  private animateCards(): void {
    if (typeof document !== 'undefined') {
      const cards = document.querySelectorAll('.experience-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-in');
        }, index * 200);
      });
    }
  }

  private ensureCardsVisible(): void {
    if (typeof document !== 'undefined') {
      const cards = document.querySelectorAll('.experience-card');
      cards.forEach((card) => {
        const htmlCard = card as HTMLElement;
        htmlCard.style.opacity = '1';
        htmlCard.style.transform = 'translateY(0)';
      });
    }
  }

  getExperiencesByType(type: string): Experience[] {
    return this.experiences.filter(exp => exp.type === type);
  }

  getTypeTitle(type: string): string {
    switch(type) {
      case 'internship': return 'Professional Internships';
      case 'project': return 'Key Projects';
      case 'full-time': return 'Full-time Positions';
      default: return 'Experience';
    }
  }

  getTypeIcon(type: string): string {
    switch(type) {
      case 'internship': return '💼';
      case 'project': return '🚀';
      case 'full-time': return '🏆';
      default: return '📋';
    }
  }

  // Getter methods for stats
  get internshipCount(): number {
    return this.experiences.filter(exp => exp.type === 'internship').length;
  }

  get projectCount(): number {
    return this.experiences.filter(exp => exp.type === 'project').length;
  }

  get totalTechnologies(): number {
    return this.experiences.reduce((acc, exp) => acc + exp.technologies.length, 0);
  }
}
