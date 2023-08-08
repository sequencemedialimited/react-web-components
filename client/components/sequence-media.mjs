// https://css-tricks.com/styling-a-web-component/

/**
 *  const style = document.createElement('style');
 *  style.textContent = `
 *    .sequence-media {
 *      display: block;
 *      border: 1px solid silver;
 *      border-radius: 2px;
 *      padding: .25rem;
 *    }
 *  `;
 */

class SequenceMedia extends HTMLElement {
  constructor () {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })

    const sequenceMedia = document.createElement('div')
    sequenceMedia.setAttribute('class', 'sequence-media')
    sequenceMedia.addEventListener('click', (e) => {
      console.log('sequenceMedia click', e)
    })

    const text = this.getAttribute('data-text')
    sequenceMedia.textContent = text

    shadowRoot.appendChild(document.getElementById('sequence-media').cloneNode(true))
    shadowRoot.appendChild(sequenceMedia)
  }

  connectedCallback () {
    this.shadowRoot.addEventListener('click', (e) => {
      console.log('shadowRoot click', e)
    })
  }
}

customElements.define('sequence-media', SequenceMedia)
