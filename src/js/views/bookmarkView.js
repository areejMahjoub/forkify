import view from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class BookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = '  No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
