import { html, customElement, LitElement, TemplateResult, property } from 'lit-element';
import styles from './rating-bar-css';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('orxe-rating-bar')
export default class OrxeRatingBar extends LitElement {
  /**
   * Implement `render` to define a template for button element.
   */
  @property({type: String, reflect: true})
  label = "";

  @property({type: Number, reflect: true})
  rating = 0;
  
  @property({type: String})
  ariaLabel = "";

  @property({type: String})
  _ratingColor = 'bad';

  @property({type: Number})
  _dispalyRating = 0;
  
  render(){
    this._setDisplayRating();
    this._setProgressColor();
    return html`
    ${this._renderRatingBar()}
    `;
  }

  firstUpdated() {
    if (!this.hasAttribute('aria-label')) {
      this._setAriaLabel();
    }
  }

  private _setProgressColor() {
      if (this._dispalyRating >= 3 && this._dispalyRating < 5) {
        this._ratingColor = 'poor';
      }
      else if (this._dispalyRating >= 5 && this._dispalyRating < 7 ) {
        this._ratingColor = 'average';
      } 
      else if (this._dispalyRating >= 7 && this._dispalyRating < 8.5) {
        this._ratingColor = 'great';
      } 
      else if (this._dispalyRating >= 8.5 ) {
        this._ratingColor = 'excellent';
      }
  }

  private _setDisplayRating() {
    this._dispalyRating = !this.rating ? 0 : this.rating > 100 ? 10 : this.rating < 0 ? 0 : Math.floor(this.rating) / 10;
  }

  private _setAriaLabel() {
    let ariaLabel = '';
    if (this.ariaLabel) {
      ariaLabel += `${this.ariaLabel} `;
    }
    else if (this.rating && this.label) {
      ariaLabel += `${this.label} ${this._dispalyRating} out of 10`;
    }
    this.setAttribute('aria-label', ariaLabel);
  }

  private _getStyles() : Record<string, string>{
    let styles = {};
    styles['width'] = this.rating < 0 ? '0%' : this.rating > 100 ? '100%' : this.rating + '%' ;
    return styles; 
  }

  private _renderRatingBar() : TemplateResult {
    return html`
    <div class="bar-container" aria-hidden="true">
      <div id="bar-indicator" class="${this._ratingColor} bar-indicator" style=${styleMap(this._getStyles())}></div>
    </div>
    <div class="bar-info">
      <span class="label">${this.label}</span>
      <span class="display-rating">${this._dispalyRating}/10</span>
    </div>
    `;
  }
  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
