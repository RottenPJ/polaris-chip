import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
  

  static get tag() {
    return 'party-ui';
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      projectName: { type: String},
      usernames: { type: Array }
     
    };
  }

  constructor() {
    super();
    this.title = "Default Title";
    this.projectName = "Default Project"
    this.usernames = [];
  }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
      }
      .party-wrapper {
        padding: var(-ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0); 
        color: var(--ddd-theme-default-beaverBlue);
        border: 3px solid black;
        background-color: var(--ddd-theme-default-pughBlue);
      }

      .user-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px; 
        justify-content: center; 
        transition: background-color 0.4s ease-in-out;
      }

      .user-container div 
      {
        text-align: center; 
        background-color: var(--ddd-theme-default-beaver70);
        border-radius: 10px;
        padding: 10px;
        
      }

      .user-container :hover
      {
        background-color: var(--ddd-theme-default-skyLight);
      }


      rpg-character {
        width: 150px;
        height: 250px;
        display: block;
        margin: 0 auto;
      }

      details {
        border: none;
        outline: none;
      }

      img {
        width: 50px;
        display: flex;
      }
      
      h2 {
        color: var(--ddd-theme-default-beaverBlue);
      }

      .title-with-icon {
        display: flex;
        align-items: center;
      }

      .title-with-icon h1 {
        margin-right: 20px;
      }

      label {
        color: var(--ddd-theme-default-beaverBlue);

      }

      span {
        color: var(--ddd-theme-default-nittanyNavy);
        display: block;
        margin-top: 10px;
        

      }

    `];
  }
  


  render() {
    return html`
    <div class="party-wrapper">

      <div class="title-with-icon">

        <h1> ${this.projectName}</h1>  
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fb%2F183-1832959_project-management-clipart.png&f=1&nofb=1&ipt=01246a5ecab7d56bd69a10da0734472904f10bc0266fb9a74c11f4f33740f1f6&ipo=images" alt="Project Image" />
      </div>

        <details>
          <h2> Team Options: </h2>

          <label for="userInput">Add User:</label>
          <input type="text" id="userInput">
          <button @click="${this.addUsername}">Submit</button>
          <div class="user-container">

          ${this.usernames.map(username => html`
             <div>
                <rpg-character seed="${username}"></rpg-character>
                <span>${username}</span>
             </div>
        `)}
         </div>
        

        </details>

    </div>

    
      
    `;
  }

  addUsername() {
    const inputField = this.shadowRoot.getElementById('userInput');
    const username = inputField.value.trim();
    if (username) {
      this.usernames = [...this.usernames, username]; // Add username to the array
      inputField.value = ''; // Clear input field to recieve new value!
    }
  }
  
}

customElements.define(PartyUI.tag, PartyUI);