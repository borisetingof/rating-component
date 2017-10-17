import React from 'react';
import ReactDOM from 'react-dom';
import Ragdolls from './ragdolls';
import './index.css';
import '../node_modules/normalize.css/normalize.css';

import registerServiceWorker from './registerServiceWorker';

let callback    = (rating, success, error) => {
      console.log(`processing rating ${rating}`);
      setTimeout(() => {
        console.log(`rating is processed`);
        success();
      }, 1000);
    },
    custom_skin = {
      color:       {
        title:                '#4A4A4A',
        active_star:          '#4A90E2',
        inactive_star:        '#E3E6E9',
        alert_text:           '#FFFFFF',
        alert_background:     '#7ED321',
        button_text_grey_out: '#B9B7B9',
        border:               '#D2D0D2',
        shadow:               '#DBDBDB',
      },
      font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif'
    };

// ReactDOM.render(<RatingComponent rating={0} callback={callback} skin={custom_skin}/>, document.getElementById('root'));
ReactDOM.render(<Ragdolls />, document.getElementById('root'));
registerServiceWorker();
