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
      color: '#4F46E5'
    },
    {
      id: 2,
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
      color: '#059669'
    },
    {
      id: 3,
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
      color: '#DC2626'
    },
    {
      id: 4,
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
      color: '#7C3AED'
    },
    {
      id: 5,
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
      color: '#EA580C'
    },
    {
      id: 6,
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
      color: '#10B981'
    }
  ];

  selectedExperience: Experience | null = null;
  isModalOpen = false;

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
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedExperience = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
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
