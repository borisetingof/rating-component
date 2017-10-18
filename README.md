tech-team
================

Team info component

## Installation with yarn
```sh
$ yarn install
$ yarn start
```

## Installation with npm
```sh
$ npm install
$ npm start
```

## Overview & Basic Example
`<Team />` renders configurable interactive team page.

app.js
```js
import React from 'react';
import {StyleRoot} from 'radium';

import Team from 'tech-team';
...

class App extends React.Component ({
  render() {
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

    return (
        <StyleRoot><Team url={service_url} skin={custom_skin}/></StyleRoot>
    );
  },
});

```

### `<Team />` Props

#### url _(string: Required)_
Set service url.

Example:
```js
<Team url={'https://deliver.kenticocloud.com/f838c20b-6429-46dd-89aa-e14f3f5d83ed/items/deepend_technical_team'}/>
```

#### skin _(object: Optional)_
Set custom skin.

Example:
```js
<Team skin={{
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
}}/>
```