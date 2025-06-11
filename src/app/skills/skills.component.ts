import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Skill {
  name: string;
  level: number;
  years: string;
}

interface SkillCategory {
  key: string;
  iconClass: string;
  colorClass: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateX(-50px)'
      })),
      transition('out => in', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit {
  activeCategory: string = 'frontend';
  animatedSkills: Set<number> = new Set();

  skillCategories: SkillCategory[] = [
    {
      key: 'frontend',
      iconClass: 'fas fa-code',
      colorClass: 'bg-blue-purple',
      skills: [
        { name: 'Angular', level: 90, years: '2+' },
        { name: 'JavaScript', level: 85, years: '3+' },
        { name: 'HTML5/CSS3', level: 90, years: '3+' },
        { name: 'TypeScript', level: 80, years: '2+' }
      ]
    },
    {
      key: 'backend',
      iconClass: 'fas fa-database',
      colorClass: 'bg-green-teal',
      skills: [
        { name: 'Spring Boot', level: 85, years: '2+' },
        { name: 'Java', level: 80, years: '2+' },
        { name: 'Python', level: 75, years: '2+' },
        { name: 'Symfony', level: 70, years: '1+' },
        { name: 'PHP', level: 75, years: '2+' },
        { name: '.Net', level: 75, years: '1+' }
      ]
    },
    {
      key: 'cloud',
      iconClass: 'fas fa-cloud',
      colorClass: 'bg-cyan-blue',
      skills: [
        { name: 'Docker', level: 80, years: '1+' },
        { name: 'Kubernetes', level: 70, years: '1+' },
        { name: 'Azure', level: 75, years: '1+' },
        { name: 'OpenStack', level: 70, years: '1+' },
        { name: 'Terraform', level: 65, years: '1+' },
        { name: 'Ansible', level: 65, years: '1+' }
      ]
    },
    {
      key: 'database',
      iconClass: 'fas fa-layer-group',
      colorClass: 'bg-orange-red',
      skills: [
        { name: 'MySQL', level: 85, years: '3+' },
        { name: 'MongoDB', level: 75, years: '2+' },
        { name: 'PostgreSQL', level: 80, years: '2+' },
        { name: 'Oracle', level: 70, years: '1+' }
      ]
    },
    {
      key: 'tools',
      iconClass: 'fas fa-wrench',
      colorClass: 'bg-purple-pink',
      skills: [
        { name: 'Git/GitHub', level: 90, years: '3+' },
        { name: 'GitLab', level: 85, years: '2+' },
        { name: 'Postman', level: 85, years: '2+' },
        { name: 'Swagger', level: 85, years: '2+' },
      ]
    },
    {
      key: 'analytics',
      iconClass: 'fas fa-chart-bar',
      colorClass: 'bg-indigo-purple',
      skills: [
        { name: 'Power BI', level: 80, years: '1+' },
        { name: 'Pandas', level: 75, years: '1+' },
        { name: 'NumPy', level: 70, years: '1+' },
        { name: 'Matplotlib', level: 70, years: '1+' },
        { name: 'Alteryx', level: 70, years: '1+' },
        { name: 'Excel', level: 85, years: '3+' },
        { name: 'Sklearn', level: 65, years: '1+' },
        { name: 'Talend', level: 65, years: '1+' }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.triggerSkillAnimation();
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.animatedSkills.clear();
    setTimeout(() => {
      this.triggerSkillAnimation();
    }, 100);
  }

  private triggerSkillAnimation(): void {
    const activeSkills = this.getActiveSkills();
    activeSkills.forEach((_, index) => {
      setTimeout(() => {
        this.animatedSkills.add(index);
      }, index * 150);
    });
  }

  getActiveSkills(): Skill[] {
    const category = this.skillCategories.find(cat => cat.key === this.activeCategory);
    return category ? category.skills : [];
  }

  getActiveCategoryData(): SkillCategory | undefined {
    return this.skillCategories.find(cat => cat.key === this.activeCategory);
  }

  getCategoryButtonClasses(categoryKey: string): string {
    const isActive = this.activeCategory === categoryKey;
    const category = this.skillCategories.find(cat => cat.key === categoryKey);

    if (isActive) {
      return `active ${category?.colorClass}`;
    }
    return 'inactive';
  }

  getActiveCategoryHeaderClasses(): string {
    const activeCategoryData = this.getActiveCategoryData();
    return `category-header ${activeCategoryData?.colorClass}`;
  }

  getActiveCategoryIcon(): string {
    const activeCategoryData = this.getActiveCategoryData();
    return activeCategoryData?.iconClass || 'fas fa-code';
  }

  getSummaryCardClasses(categoryKey: string): string {
    const isActive = this.activeCategory === categoryKey;
    const category = this.skillCategories.find(cat => cat.key === categoryKey);

    if (isActive) {
      return `active ${category?.colorClass}`;
    }
    return 'inactive';
  }

  getProgressBarClasses(level: number): string {
    if (level >= 80) {
      return 'progress-bar high';
    } else if (level >= 60) {
      return 'progress-bar medium';
    }
    return 'progress-bar low';
  }

  getStarClasses(skillLevel: number, starIndex: number): string {
    const filledStars = Math.floor(skillLevel / 20);
    if (starIndex < filledStars) {
      return 'fas fa-star filled';
    }
    return 'far fa-star empty';
  }

  getAllSkills(): Skill[] {
    return this.skillCategories.reduce((allSkills: Skill[], category) => {
      return allSkills.concat(category.skills);
    }, []);
  }
}
