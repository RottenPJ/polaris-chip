import { LitElement, html, css } from 'lit';

export class WarningApp extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean },
      status: { type: String },
      date: { type: String },
      sticky: { type: Boolean },
      exclamationImage: {type: String},
      description: {type: String},
    };
  }

  constructor() {
    super();
    this.open = true; 
    this.status = 'notice'; //Having issues here with this.open and local storage acts weird. Something to do with cookies??
    this.date = ''; 
    this.sticky = false; 
    this.description = 'This is the default description.'
    this.exclamationImage = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F8%2FExclamation-Mark-PNG-Photos.png&f=1&nofb=1&ipt=c40732e50c7b7cfa01654b714374b1efb43417645bf8ee42b763ee82c0bd27d9&ipo=images';
    const localStorageStatus = localStorage.getItem('warningAppStatus');
    if (localStorageStatus === 'closed') {
      this.open = true;
    }
  }

  //Below it sets basic colors for host, then custom depending on what kind of warning this is (specified in index)

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 8px;
        color: black;
        background-color: white;
        border: 2px solid black;
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
      .custom { 
        padding: 16px;
        color: purple;
        background-color: violet;    //Here is where you apply custom colors to your warning app instance
      }
      .wrapper {
        position: relative;
      }
      .wrapper img {
        width: 40px; //Admjust size of exclamation photo
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        localStorage.removeItem('warningAppStatus');  //This is from chatGPT, controls the local storage status of open/closed
      } else {
        localStorage.setItem('warningAppStatus', 'closed');
      }
    }
  }

  render() {
    return html`
      <div class="wrapper ${this.status}">

      <img src="${this.exclamationImage}" alt="Card Image" />

         <div style="text-transform:uppercase;"> <h3>${this.status}</h3></div>
<!-- Transforms the status into all uppercase for the title which says alert, warning, notice -->
         ${this.open ? html`
          <details>${this.description}</details>
          <h3>${this.date}</h3>
          

        ` : html`
        `}
      </div>
    `;
  }
}

customElements.define('warning-app', WarningApp);
