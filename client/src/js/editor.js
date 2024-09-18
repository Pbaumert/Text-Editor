// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize CodeMirror editor
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load data from IndexedDB into the editor. 
    // If IndexedDB doesn't have data, fallback to localStorage or default 'header' content.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Listen for changes in the editor and save them to localStorage
    this.editor.on('change', () => {
      const content = this.editor.getValue();
      localStorage.setItem('content', content); // Fallback to localStorage for quick access
    });

    // When the editor loses focus, save the current content to IndexedDB
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      const content = localStorage.getItem('content');
      if (content) {
        putDb(content); // Save to IndexedDB for persistence
      }
    });
  }
}
