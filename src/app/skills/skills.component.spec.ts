import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillsComponent],
      imports: [BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set active category', fakeAsync(() => {
    component.setActiveCategory('backend');
    tick(150);
    expect(component.activeCategory).toBe('backend');
  }));

  it('should return active skills', () => {
    component.activeCategory = 'frontend';
    const skills = component.getActiveSkills();
    expect(skills.length).toBeGreaterThan(0);
    expect(skills[0].name).toBe('Angular');
  });

  it('should return category button classes', () => {
    const classes = component.getCategoryButtonClasses('frontend');
    expect(classes).toContain('active');
  });

  it('should return summary card classes', () => {
    const classes = component.getSummaryCardClasses('frontend');
    expect(classes).toContain('active');
  });

  it('should return active category icon', () => {
    const icon = component.getActiveCategoryIcon();
    expect(icon).toContain('fas');
  });

  it('should return progress bar classes', () => {
    expect(component.getProgressBarClasses(85)).toBe('progress-bar high');
    expect(component.getProgressBarClasses(65)).toBe('progress-bar medium');
    expect(component.getProgressBarClasses(50)).toBe('progress-bar low');
  });

  it('should return star classes', () => {
    expect(component.getStarClasses(80, 0)).toBe('fas fa-star filled');
    expect(component.getStarClasses(80, 4)).toBe('far fa-star empty');
  });

  it('should return all skills', () => {
    const allSkills = component.getAllSkills();
    expect(allSkills.length).toBeGreaterThan(0);
  });

  it('should return default icon when activeCategoryData is undefined', () => {
    // Temporarily set activeCategory to a non-existent category
    component.activeCategory = 'nonexistent-category';

    const icon = component.getActiveCategoryIcon();
    expect(icon).toBe('fas fa-code');
  });

});
