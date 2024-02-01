import { LitElement, html, css } from 'lit';

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  static get properties() {
    return {
      cardTitle: { type: String },
      cardImage: { type: String },
      cardDescription: { type: String },
    };
  }

  constructor() {
    super();
    this.cardTitle = "My card";
    this.cardImage = "https://pic.onlinewebfonts.com/thumbnails/icons_98811.svg";
    this.cardDescription = "This is the default paragraph.";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card {
        text-align: center;
      }

      .card img {
        margin: 8px;
        display: block;
        width: 100%;
        border-radius: 8px;
      }

      .card p {
        display: block;
        margin-top: 15px;
      }

      .card-wrapper {
        text-align: center;
        border: 3px solid #ccc;
        width: 400px;
        height: 600px;
        margin: 16px;
      }

      .btn {
        display: inline-block;
      }
    `;
  }

  render() {
    return html`
      <div class="card-wrapper">
        <div class="card">
          <h2 class="title">${this.cardTitle}</h2>
          <img src="${this.cardImage}" alt="Card Image" />
          <p class="p">${this.cardDescription}</p>
          <div class="btn-wrapper">
            <a href="#">
              <button class="btn">Details</button>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(MyCard.tag, MyCard);