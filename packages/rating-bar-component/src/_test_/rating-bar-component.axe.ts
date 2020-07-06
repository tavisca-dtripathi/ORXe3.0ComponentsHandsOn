import { OrxeRatingBarComponent } from '../';

import { axe, toHaveNoViolations } from '@orxe-devkit/axe';
expect.extend(toHaveNoViolations);

describe('orxe-rating-bar-component-axe', () => {
  it('', () => {
    expect(true).toBeTruthy();
  });
  
  let RatingBarComponent;

  beforeEach(async () => {
    OrxeRatingBarComponent;
    document.body.appendChild(document.createElement('RatingBarComponent'));
    RatingBarComponent = document.querySelector('RatingBarComponent') as OrxeRatingBarComponent;
  });

  afterEach(() => {
    RatingBarComponent.remove();
  });

  it('should support all WCAG Accessibility Rules. when default toolbar is rendered', async () => {
    const result = await axe(RatingBarComponent);
    expect(result).toHaveNoViolations();
  });
});
