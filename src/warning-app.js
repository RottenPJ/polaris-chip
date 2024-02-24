import { LitElement, html, css } from 'lit';



export class WarningApp extends LitElement {
  

  static get tag() {
    return 'warning-app';
  }

  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
   
  }

  static get styles() {
    return css`
      
    `;
  }
  

  
  render() {
    return html`

    <div class="warning wrapper">
        <p>Warning! There has been an incident on campus!</p>
    </div>
      
    `;
  }
  
}

customElements.define(WarningApp.tag, WarningApp);