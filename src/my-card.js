import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do:
 * 1. Get you HTML from your card working in here 
 * 2. Get your CSS rescoped as needed to work here
 */

export class MyCard extends LitElement {
  //Lit element means web component i think?

  static get tag() {
    return 'my-card';
  }

  static get properties() {
    return {
      cardTitle: { type: String },
      cardImage: { type: String }, //Why is this type string??
      cardDescription: { type: String },
      fancy: { type: Boolean, reflect: true },
      bottomText: {type: String },
      topText: {type: String },
    };
  }

  constructor() {
    super();
    this.cardTitle = "My card";  //Defaults for the card ifi nothing specified
    this.cardImage = "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg";
    this.cardDescription = "This is the default paragraph.";
    this.fancy = false;
    this.bottomText = "";
    this.topText = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
  
      .card-wrapper {
        text-align: center;
        border: 3px solid #ccc;
        width: fit-content; /* Adjusted width to fit the content */
        height: fit-content; /* Adjusted height to fit the content */
        margin: 16px;
        padding: 16px; /* Added padding to prevent the bleed effect */
      }
  
      .card img {
        margin: 8px;
        display: block;
        width: 95%;
        border-radius: 8px;
      }
  
      .btn-wrapper {
        margin-top: 15px;
      }
  
      .btn {
        display: inline-block;
      }
  
      :host([fancy]) {
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
        padding: 0; /* Removed padding from the fancy style because it was fitting weird*/
      }
    `;
  }
  

  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <div class="card-wrapper">
        <div class="card">
          <h2 class="title">${this.cardTitle}</h2>
          <!-- <img src="${this.cardImage}" alt="Card Image" /> --> <!-- Commented out image to replace with meme -->
          <meme-maker alt="meme" image-url="${this.cardImage}" top-text= "${this.topText}" bottom-text= "${this.bottomText}">
</meme-maker>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
             <summary>Description</summary>
           <div>
             <slot>${this.description}</slot>
           </div>
        </details>
          <slot>${this.cardDescription}</slot>
          <div class="btn-wrapper">
            <a href="https://www.psu.edu" target="blank"> 
              <button class="btn">Details</button>
            </a>
          </div>
        </div>
      </div>
    `;
  }
  
}

customElements.define(MyCard.tag, MyCard);