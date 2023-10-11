export default function ({ content, id, source_file }) {
  try {
    const idProp = id ? ` id=${id}` : '';
    const fileLink = source_file ? `
      <a href="${ source_file }" role="menuitem" class="figure-option orange-bg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16"><path d="M6 12v-2h3v2H6z"/><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z"/></svg>
        <span>Get data</span>
      </a>` : ''

    return `<div class='pane'${idProp}>
      <figure data-dependencies="/assets/js/vendor/dom-to-image.min.js,/assets/js/figure.js">
        <div class="figure-options"><div class="figure-option-list">${ fileLink }</div></div>
        ${ content }
      </figure>
    </div>`;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

