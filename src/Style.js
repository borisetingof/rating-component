const DEFAULT_THEME = {
  color: {
    title:                '#4A4A4A',
    active_star:          '#4A90E2',
    inactive_star:        '#E3E6E9',
    alert_text:           '#FFFFFF',
    alert_background:     '#7ED321',
    button_text_grey_out: '#B9B7B9',
    border:               '#D2D0D2',
    shadow:               '#DBDBDB',
  },
  font:  {
    lobster: '"Lobster", cursive',
    ubuntu:  '"Ubuntu", sans-serif'
  }
};

let setStyle = (skin) => {
  let default_pixel_size = 16,
      em                 = (px) => {
        return px / default_pixel_size + 'rem';
      };

  return {
    container: {
      fontSize: '16px',
      // display: 'none'
    },

    title: {
      padding:      0,
      marginBottom: em(100),
      fontSize:     em(280),
      lineHeight:   em(280),
      fontFamily:   skin.font.lobster,
      textAlign:    'center',
      color:        '#ffdd64',
    },

    teamlist: {
      margin:  0,
      padding: 0,
      outline: 'none',

      position:  'relative',
      textAlign: 'center',
      color:     '#ffffff',

      item: {
        fontSize:   em(40),
        display:    'inline-block',
        listStyle:  'none',
        margin:     `0 ${em(25)}`,
        lineHeight: em(40),
        position:   'relative',
        transition: 'color 0.25s',
        cursor:     'pointer',

        firstname: {
          fontFamily: skin.font.ubuntu,
          fontWeight: 700,
          fontSize:   em(40),
          fontStyle:  'italic',
        },

        surname: {
          fontFamily: skin.font.ubuntu,
          fontWeight: 300,
          fontSize:   em(40),
        },

        ':hover': {
          color: '#000000'
        }
      },

      separator: {
        display:     'block',
        position:    'absolute',
        left:        em(-25),
        right:       em(-25),
        top:         '-75%',
        borderRight: `${em(1)} solid rgba(255, 255, 255, 0.5)`,
        height:      '250%',
        transform:   'skew(-15deg)',
        transition:  'background 0.25s',

        ':hover': {
          background: 'rgba(255, 255, 255, 0.1)'
        }
      },
    },

    info: {
      curtain: {
        background: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transform:   'skew(-15deg)'
      }
    }
  }
}, instance;

export default {
  getInstance(params = DEFAULT_THEME) {
    if (!instance) {
      instance = setStyle(params);
    }
    return instance;
  }
};