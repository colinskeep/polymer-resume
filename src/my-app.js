import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-button/paper-button.js';
setPassiveTouchGestures(true);

setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #212121;
          --app-secondary-color: white;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);

        }

        app-header paper-button {
          color: var(--app-secondary-color);
          line-height: 40px;
          font-size: 16px;
        }

        .drawer-list {
          margin: 0 20px;
        }

        a.iron-selected {
          color: white;
          font-weight: bold;
        }
      </style>
      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <app-header-layout has-scrolling-region="">
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <div main-title="">Colin Inskeep</div>
              <iron-selector selected="[[page]]" attr-for-selected="name" role="navigation" class="menu-items">
                <a name="resume" href="[[rootPath]]resume"><paper-button>Resume</paper-button></a>
                <a name="about" href="[[rootPath]]about"><paper-button>About</paper-button></a>
                <a name="contact" href="[[rootPath]]contact"><paper-button>Contact</paper-button></a>
              </iron-selector>
            </app-toolbar>
          </app-header>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-view1 name="resume"></my-view1>
            <my-view2 name="about"></my-view2>
            <my-view3 name="contact"></my-view3>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = 'resume';
    } else if (['resume', 'about', 'contact'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  _pageChanged(page) {
    switch (page) {
      case 'resume':
        import('./my-view1.js');
        break;
      case 'about':
        import('./my-view2.js');
        break;
      case 'contact':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
