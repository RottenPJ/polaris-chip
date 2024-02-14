import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {
  static get tag() {
    return 'counter-app';
  }


  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number }, //Basic properties of the counter are the counter itself, min number and max number which differ from instance to instance
      max: { type: Number }
    };
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0; //Default values of all
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
        border: 3px solid black; //border around each counter
        padding: 16px;
        width: 200px;
        height: 200px;
        background-color: gray;
      }

      .counter:hover {
        transform: scaleY(-1); //Found this by looking "fun hover effects" on chatgpt. Flips counter inverted when hovered over. Scale y means vertically, scale x is horizontally
      }
      

      .counter {
        font-size: 75px;
        color: black; 
        padding: 16px;
        margin-top: 24px;
      }

      .button-wrapper {
        margin-top: 8px;
        padding 8px;
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
        cursor: not-allowed; //makes cursor have an x not allowed type symbol when it is disabled aka at max or min 
      }
    `;
  }

  render() {
    return html`
    
    
      <div class="counter-wrapper"> <!-- confetti wrapper is limited to being inside each counter -->
      <confetti-container id="confetti">
        <div class="counter">${this.counter}</div>
        <div class="button-wrapper">
          <button class="button" @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
          <button class="button" @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button> <!-- If counter at max or min, disable button -->
        </div>
        </confetti-container>
        </div>
      </div>

      
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      // Check if the counter value triggers the confetti animation                  //This section copy and pasted
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
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.                                   //This section copy and pasted
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
      if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) {   //If counter less than max, allow increment otherwize do not and change run change color method.
        this.changeColor();
      }
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
      if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) { //Same for here but min
        this.changeColor();
      }
    }
  }

  changeColor() {
    const counterElement = this.shadowRoot.querySelector('.counter');
    if (this.counter === 18) 
    {
      counterElement.style.color = 'green'; //Changes color to green once hits 18
    } 
    else if (this.counter === 21) {
      counterElement.style.color = 'pink'; //Changes color to pink once it hits 21
    }
    else if (this.counter === this.min || this.counter === this.max) //if counter at max or min, color red
    {
      counterElement.style.color = 'red';
    }

  }
}

customElements.define(CounterApp.tag, CounterApp);
