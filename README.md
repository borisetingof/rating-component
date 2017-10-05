rating-component
================

Interactive star rating component

## Installation
```sh
$ yarn install
$ yarn start
```

## Overview & Basic Example
`<RatingComponent />` renders configurable interactive star rating widget or non-interactive rating display element.

app.js
```js
import React from 'react';
import RatingComponent from 'rating-component';
...

class App extends React.Component ({
  render() {
      let callback     = (rating, success, error) => {
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

    return (
      <RatingComponent rating={0} callback={callback} skin={custom_skin}/>
    );
  },
});

```

### `<RatingComponent />` Props

#### rating _(default: 0)_
Set initial rating between `0` and `5` inclusive. Rating set to `0` means `no rating`. `Apply` button is disabled when rating equals to `0` and is enabled when rating is greater than `0`. Initial rating can be set for both interactive and non-interactive states.

Example:
```js
<RatingComponent rating={0}/>
```

#### callback _(function)_
The component is rendered as interactive widget when the callback function is defined. Callback function gets executed with `rating` passed as a parameter along with `success` and `error` hooks when `Apply` button is pressed. Callback function can be used to process/store the selected rating.

Example:
```js
<RatingComponent callback={(rating, success, error) => {
    console.log(`processing rating ${rating}`);
    setTimeout(() => {
      console.log(`rating is processed`);
      success();
    }, 1000);
}}/>
```

#### skin _(object)_
Set custom skin.

Example:
```js
<RatingComponent skin={{
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
}}/>
```