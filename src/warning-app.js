import { LitElement, html, css } from 'lit';

export class WarningApp extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean },
      exclamationImage: {type: String},
    };
  }

  constructor() {
    super();
    this.open = false; 
    this.status = 'notice'; 
    this.date = ''; 
    this.sticky = false; 
    this.exclamationImage = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FExclamation-Mark-PNG-Photos.png&f=1&nofb=1&ipt=c40732e50c7b7cfa01654b714374b1efb43417645bf8ee42b763ee82c0bd27d9&ipo=images';
    const localStorageStatus = localStorage.getItem('warningAppStatus');
    if (localStorageStatus === 'closed') {
      this.open = true;
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 8px;
        color: black;
        background-color: white;
        border: 2px solid black;
        border-color: black;
      }
      .notice {
        background-color: lightblue;
        padding: 16px;
      }
      .warning {
        background-color: orange;
        padding: 16px;
      }
      .alert {
        background-color: red;
        padding: 16px;
      }
      .sticky {
        position: sticky;
        top: 0;
      }

      .wrapper img 
      {
        width: 40px;
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        localStorage.removeItem('warningAppStatus');
      } else {
        localStorage.setItem('warningAppStatus', 'closed');
      }
    }
  }

  toggleAlert() {
    this.open = !this.open;
    // Ensure opposite button is focused
    if (this.open) {
      this.shadowRoot.querySelector('.close-button').focus();
    } else {
      this.shadowRoot.querySelector('.open-button').focus();
    }
  }

  render() {
    return html`
      <div class="wrapper ${this.status} ${this.sticky ? 'sticky' : ''}">

      <img src="${this.exclamationImage}" alt="Card Image" />

         <div style="text-transform:uppercase;"> <h3>${this.status}</h3></div>

         ${this.open ? html`
          <details>${this.textContent}</details>
          <p>${this.date}</p>

        ` : html`
        `}
      </div>
    `;
  }
}

customElements.define('warning-app', WarningApp);
