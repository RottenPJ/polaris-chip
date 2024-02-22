import { LitElement, html, css } from 'lit';

export class WarningApp extends LitElement {
  static get tag() {
    return 'warning-app';
  }


  static get properties() {
    return {
      warningDescription: { type: String },
      warningLevel: { type: Number }, //Should be 1,2,3 for low medium or high respectively.
    };
  }

  constructor() {
    super();
    this.warningDescription = "Default description.";
    this.warningLevel = 1;


    
  }

  static get styles() {
    return css`
    :host {
        display: block;
        font-family: Arial, sans-serif;
        text-align: center;
      }

      .warning-wrapper {
        display: block;
        font-family: Arial, sans-serif;
        text-align: center;
      }
      
    `;
  }

  render() {
    return html`

    <div class="warning-wrapper">
      <p>${this.warningDescription}</p>
    </div>
    
  
    `;
  }

  

  

 
}

customElements.define(WarningApp.tag, WarningApp);
