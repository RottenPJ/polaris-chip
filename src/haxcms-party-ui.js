import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {
  

  static get tag() {
    return 'party-ui';
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
    <div>
        <h1>This is a placeholder!</h1>
        <rpg-character>seed="example"</rpg-character>  <!-- Seed is where you pass in the name to create a unqiue character from its hash value -->
    </div>
      
    `;
  }
  
}

customElements.define(PartyUI.tag, PartyUI);