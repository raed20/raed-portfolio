import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  tools: string[];
  link: string | null;
  category: string;
}

interface ProjectCategory {
  key: string;
  label: string;
  iconClass: string;
  colorClass: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  activeCategory = 'all';

  categories: ProjectCategory[] = [
    { key: 'all', label: 'All Projects', iconClass: 'fas fa-border-all', colorClass: 'bg-all' },
    { key: 'ai', label: 'AI & Machine Learning', iconClass: 'fas fa-robot', colorClass: 'bg-indigo-purple' },
    { key: 'cloud', label: 'Cloud & DevOps', iconClass: 'fas fa-cloud', colorClass: 'bg-cyan-blue' },
    { key: 'web', label: 'Web Development', iconClass: 'fas fa-code', colorClass: 'bg-blue-purple' },
    { key: 'other', label: 'Other', iconClass: 'fas fa-layer-group', colorClass: 'bg-orange-red' }
  ];

  projects: Project[] = [
    {
      title: 'TestForge AI – AI-Powered QA & Test Management Platform',
      description: 'A full-stack SaaS platform that uses LLM agents to automate the QA lifecycle: refining user stories, generating risk analyses, test plans, test suites, and test cases, then autonomously writing and running Playwright end-to-end tests from natural language. Includes Jira and Testomat.io integrations for defect and test sync, an AI chatbot assistant, and an Angular Material admin dashboard, with LLM observability and evaluation (Langfuse, LangSmith, DeepEval).',
      tools: ['FastAPI', 'Angular', 'LangChain', 'LangGraph', 'Playwright', 'PostgreSQL', 'Redis', 'Docker', 'Jira API', 'Testomat.io', 'Sentence-Transformers'],
      link: 'https://github.com/ayetayadi/TestForge-AI',
      category: 'ai'
    },
    {
      title: 'Azure Kubernetes Service Infrastructure with Terraform',
      description: 'Infrastructure as Code project for building a production-ready Azure Kubernetes Service cluster using Terraform. The project includes automated cluster provisioning, monitoring setup with Prometheus and Grafana, and complete infrastructure management with best practices for scalability and security.',
      tools: ['Terraform', 'Azure Kubernetes Service', 'Azure Container Registry', 'Prometheus', 'Grafana', 'DuckDNS'],
      link: 'https://github.com/raed20/akscluster-main',
      category: 'cloud'
    },
    {
      title: 'E-commerce Platform with CI/CD Pipeline',
      description: 'A full-featured e-commerce application built with Angular, implementing a complete CI/CD pipeline with automated testing, code quality analysis, containerization, and deployment. Features comprehensive testing with unit tests, end-to-end testing, and continuous integration practices.',
      tools: ['Angular', 'Jenkins', 'Jasmine', 'Karma', 'SonarQube', 'Docker', 'Robot Framework', 'Selenium'],
      link: 'https://github.com/raed20/E-commerce-App-main',
      category: 'cloud'
    },
    {
      title: 'My Portfolio',
      description: 'A modern, responsive web portfolio designed to showcase my skills, projects, and professional background. Built with a clean UI and smooth animations, it highlights my journey as a developer, featuring categorized project sections, technology stacks, and interactive design elements.',
      tools: ['Angular'],
      link: 'https://github.com/raed20/raed-portfolio',
      category: 'web'
    },
    {
      title: 'Deployment of Rental Platform on Cloud Infrastructures',
      description: 'Deployed our rental platform on OpenStack infrastructure and implemented a deployment pipeline while managing cloud resources on Microsoft Azure, handling environment setup, configuration, and monitoring to ensure smooth operations.',
      tools: ['Docker', 'Kubernetes', 'Azure', 'OpenStack'],
      link: null,
      category: 'cloud'
    },
    {
      title: 'Cloud Infrastructure with OpenStack',
      description: 'Deployed private cloud services using OpenStack by configuring compute, storage, and network nodes, while applying automation and orchestration techniques to streamline operations.',
      tools: ['OpenStack', 'Linux', 'Git', 'Shell Scripting'],
      link: null,
      category: 'cloud'
    },
    {
      title: 'Rentify',
      description: 'A modern web platform designed to streamline the property rental process. It connects landlords and tenants through a clean interface, offering property listings, intelligent search filters, booking systems, integrated communication tools, a product recognition system, and an AI assistant.',
      tools: ['Angular', 'Spring Boot', 'Python'],
      link: 'https://github.com/taher129/Rentify-Front.git',
      category: 'web'
    },
    {
      title: 'Airport Management System',
      description: 'A comprehensive desktop application designed to simulate core airport operations. It facilitates the management of flights, passengers, staff, and ticketing, supporting CRUD operations, scheduling, and real-time status updates.',
      tools: ['.NET'],
      link: 'https://github.com/raed20/AirportManagement.git',
      category: 'other'
    },
    {
      title: 'Exam Scheduling System',
      description: 'A Python-based project developed to optimize exam timetables using the simulated annealing algorithm, allocating exams across available time slots and rooms while minimizing conflicts and balancing constraints such as room capacities and durations.',
      tools: ['Python'],
      link: 'https://github.com/raed20/ExamScheduling.git',
      category: 'ai'
    }
  ];

  setActiveCategory(key: string): void {
    this.activeCategory = key;
  }

  getFilteredProjects(): Project[] {
    return this.activeCategory === 'all'
      ? this.projects
      : this.projects.filter(p => p.category === this.activeCategory);
  }

  getCategoryMeta(key: string): ProjectCategory | undefined {
    return this.categories.find(c => c.key === key);
  }

  getCategoryButtonClasses(key: string): string {
    const meta = this.getCategoryMeta(key);
    return this.activeCategory === key ? `active ${meta?.colorClass}` : 'inactive';
  }

  getCategoryColorClass(key: string): string {
    return this.getCategoryMeta(key)?.colorClass ?? '';
  }

  getCategoryIconClass(key: string): string {
    return this.getCategoryMeta(key)?.iconClass ?? 'fas fa-code';
  }

  getCategoryCount(key: string): number {
    return key === 'all' ? this.projects.length : this.projects.filter(p => p.category === key).length;
  }
}
