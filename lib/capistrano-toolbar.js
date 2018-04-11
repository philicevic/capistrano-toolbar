'use babel';

import CapistranoToolbarView from './capistrano-toolbar-view';
import { CompositeDisposable } from 'atom';

export default {

  capistranoToolbarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.capistranoToolbarView = new CapistranoToolbarView(state.capistranoToolbarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.capistranoToolbarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'capistrano-toolbar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.capistranoToolbarView.destroy();
  },

  serialize() {
    return {
      capistranoToolbarViewState: this.capistranoToolbarView.serialize()
    };
  },

  toggle() {
    console.log('CapistranoToolbar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
