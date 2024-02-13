import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement
{
    static get tag() {
        return 'counter-app';
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
          :host {
            display: block;
          }
      
        `;
      }


      render() {
        return html`

        <div class="counter-wrapper">
            <div class="counter-app">






            </div>
        </div>
    
        `;
      }
      
    }
    
    customElements.define(CounterApp.tag, CounterApp);
