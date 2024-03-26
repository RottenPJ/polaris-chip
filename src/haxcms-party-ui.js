import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js"; //Import of custom character functionality.

export class PartyUI extends DDD { //PERSON GRADING THIS: PLEASE LET ME KNOW OF THINGS I CAN IMPROVE, CHANGE ETC IN CANVAS GRADE COMMENTS. THANKS!

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
    this.usernames = []; //Initialize usernmes array list to nothing initially.
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

      .within-details button {
        color: var(--ddd-theme-default-pughBlue);
        background: var(--ddd-theme-default-beaver80);
      }

      .user-container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-4); 
        justify-content: center; 
        transition: background-color 0.4s ease-in-out;
      }

      .user-container div 
      {
        text-align: center; 
        background-color: var(--ddd-theme-default-beaver70);
        border-radius: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        
      }

      .user-container :hover
      {
        background-color: var(--ddd-theme-default-skyLight); //Hover state for user containers.
      }


      rpg-character {
        width: 150px;
        height: 250px;
        display: block;
        margin: 0 auto; //Set to auto so it fits various screen sizes.
      }

      details {
        border: none; //Added this to get rid of a weird line below details. No other purpose other than that.
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
        align-items: center; //Title and project icon "checklist looking thing" are grouped together.
      }

      .title-with-icon h1 {
        margin-right: var(--ddd-spacing-4);
      }

      label {
        color: var(--ddd-theme-default-beaverBlue);

      }

      span {
        color: var(--ddd-theme-default-nittanyNavy);
        display: block;
        margin-top: var(--ddd-spacing-4);
      }

    `];
  }
  


  render() {
    return html`
    
    <div class="party-wrapper">
      <confetti-container id="confetti"> 

        <div class="title-with-icon">
          <h1> ${this.projectName}</h1>  
          <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fb%2F183-1832959_project-management-clipart.png&f=1&nofb=1&ipt=01246a5ecab7d56bd69a10da0734472904f10bc0266fb9a74c11f4f33740f1f6&ipo=images" alt="Project Image" />
        </div>

        <details class="within-details">
          <h2> Team Options: </h2>

          <label for="userInput">Add User:</label>
          <input type="text" id="userInput">
          
          <button @click="${this.addUsername}" >Submit</button> <!-- Sorry, divs get a little confusing here lol -->
          <div class="user-container">

          ${this.usernames.map((username,index) => html`
             <div>

             <button @click="${() => this.deleteUser(index)}">X</button> <!-- When x button clicked, send index to deleteUser method where it will be handled. -->
                <rpg-character seed="${username}"></rpg-character>  <!-- Adds user inputted username as the seed in each character -->
                <span>${username}</span>
             </div>

             
        `)}
           </div>

             <button @click="${this.changesSaved}" >Save Changes</button>  <!-- Clicking changes saved calls another seperate mathod called changesSaved.-->
        

        </details>
      </div>

     </confetti-container>
  

    
      
    `;
  }

  addUsername() {
    const inputField = this.shadowRoot.getElementById('userInput');   //Gets user input, trims. Trim removes white space from either side of text.
    const username = inputField.value.trim();

    const validUsernameRegex = /^[a-z0-9]+$/;
    if (username && validUsernameRegex.test(username)) {
      this.usernames = [...this.usernames, username];      //This regex input validation was taken from chatGPT.
      inputField.value = ''; 
      this.makeItRain();
    }
    else
    {
      alert("Only lowercase letters and numbers please!") //If regex fails, alert user
    }
  }

  changesSaved() {
      if (this.usernames.length > 0) {
        const userList = this.usernames.join(', '); //If username has at least one list in it, join all usernames seperated by commas. Else, say "No usernames to display."
        alert(`Changes saved successfully!\nUsernames: ${userList}`);
    } else {
        alert("Changes saved, but no usernames to display. How lonely!"); 
    }

    this.makeItRain();  //Calls make it rain at end to create desired confetti effect.
    
  }

  makeItRain() {
    
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");  //Make it rain code, given to us by Prof 
        }, 0);
      } 
    );
  }

  deleteUser(index) {
    this.usernames.splice(index, 1);  //Delete user method, where it is passed respective index from X button.
    this.requestUpdate();
  }
  
}

customElements.define(PartyUI.tag, PartyUI);