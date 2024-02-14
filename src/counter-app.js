import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {
  static get tag() {
    return 'counter-app';
  }


  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
        text-align: center;
      }

      .counter-wrapper {
        margin: 20px;
        border: 3px solid black;
        padding: 16px;
        width: 100px;
      }

      .counter {
        font-size: 48px;
        color: black; /* Default color without hitting any of specified numbers*/
      }

      .button-wrapper {
        margin-top: 10px;
      }

      .button {
        padding: 8px 16px;
        font-size: 18px;
        background-color: blue;
        color: white;
        border: none;
      }

      .button:hover {
        background-color: orange;
      }

      .button:disabled {
        background-color: red;
        cursor: not-allowed;
      }
    `;
  }

  render() {
    return html`
    
      <div class="counter-wrapper">
        <div class="counter">${this.counter}</div>
        <div class="button-wrapper">
          <button class="button" @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
          <button class="button" @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
        </div>
        </div>
      </div>
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      // Check if the counter value triggers the confetti animation
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  

  

  increment() {
    if (this.counter < this.max) {
      this.counter++;
      if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) {
        this.changeColor();
      }
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
      if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) {
        this.changeColor();
      }
    }
  }

  changeColor() {
    const counterElement = this.shadowRoot.querySelector('.counter');
    if (this.counter === 18) 
    {
      counterElement.style.color = 'green';
    } 
    else if (this.counter === 21) {
      counterElement.style.color = 'pink';
    }
    else if (this.counter === this.min || this.counter === this.max)
    {
      counterElement.style.color = 'red';
    }

  }
}

customElements.define(CounterApp.tag, CounterApp);
