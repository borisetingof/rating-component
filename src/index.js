import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import '../node_modules/normalize.css/normalize.css';

import Team from './team';

import registerServiceWorker from './registerServiceWorker';

let custom_skin = {
      color: {
        background: '#fc749a',
        title:      '#ffdd64',
        navigation: '#ffffff',
        navhover:   '#000000',
        fill:       '#2abbe7',
        dancers:    ['#e51c4e', '#2d95f0', '#42d73f', '#e51c00', '#fa6629']
      },
      font:  {
        lobster: '"Lobster", cursive',
        ubuntu:  '"Ubuntu", sans-serif'
      }
    },
    service_url = 'https://deliver.kenticocloud.com/f838c20b-6429-46dd-89aa-e14f3f5d83ed/items/deepend_technical_team';

ReactDOM.render(<StyleRoot><Team url={service_url} skin={custom_skin}/></StyleRoot>, document.getElementById('root'));
registerServiceWorker();
