import view from './view.js';
import icons from '../../img/icons.svg';
class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goToPage = +btn.dataset.goto;
      if (!btn) return;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    //we need to know how many pages there are
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1, and There are Other Pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> 
      `;
    }

    //Last Page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>`;
    }
    //Other Page Like Page 2 or Page 3
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>

        <button  data-goto="${
          currentPage + 1
        }"class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
            
        `;
    }
    //Page 1, and There are No Other Pages
    return '';
  }
}

export default new PaginationView();
