import icons from '../../img/icons.svg';
export default class View {
  _data;
  /**
   * Render the recevied object to the DOM
   * @param {Object | Object[Array]} data The data to be rendered (e.g. recipe)
   * @param {boolean} render If false, create markup string instaed of rendering to the DOM
   * @returns {undefined | string} A marhup string is returned if render= false
   * @this {Object} View instance
   * @author Areej Mahjoub
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._claer();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    /*convert the newMarkup string into real Dom node object
    so that will be easy to compare, and will be store in memory */
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    //select all the elements in there
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //Update Change Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💰', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //Update Change Attrbuite
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attribute =>
          curEl.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }
  _claer() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use> 
          </svg>
        </div>`;
    this._claer();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._claer();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._claer();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
