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
    dancers:              ['#bd3263', '#77a7f8', '#bff877', '#e51c00', '#ff9600']
  },
  font:  {
    lobster: '"Lobster", cursive',
    ubuntu:  '"Ubuntu", sans-serif'
  }
};

/*const screen_sm_min = '768px',
      screen_md_min = '992px',
      screen_lg_min = '1200px',
      screen_xs_max = parseInt(screen_sm_min) - 1 + 'px',
      screen_sm_max = parseInt(screen_md_min) - 1 + 'px',
      screen_md_max = parseInt(screen_lg_min) - 1 + 'px';*/

let setStyle = (skin) => {
  let default_pixel_size = 16,
      rem                = (px) => {
        return px / default_pixel_size + 'rem';
      };

  return {
    container: {
      fontSize: '16px',
    },

    dancers: {
      position: 'absolute',
      top:      0,
      left:     0,
    },

    title: {
      padding:      0,
      marginBottom: rem(100),
      fontSize:     rem(280),
      lineHeight:   rem(280),
      fontFamily:   skin.font.lobster,
      textAlign:    'center',
      color:        '#ffdd64',
    },

    navigation: {
      position:  'relative',
      textAlign: 'center',
      color:     '#ffffff',

      item: {
        display:    'inline-block',
        margin:     `0 ${rem(25)}`,
        fontSize:   rem(20),
        lineHeight: rem(20),
        position:   'relative',
        transition: 'color 0.25s',
        cursor:     'pointer',

        firstname: {
          fontFamily: skin.font.ubuntu,
          fontWeight: 700,
          fontStyle:  'italic',
        },

        surname: {
          fontFamily: skin.font.ubuntu,
          fontWeight: 300,
        },

        ':hover': {
          color: '#000000'
        },

        '@media (min-width: 768px)': {
          fontSize:   rem(40),
          lineHeight: rem(40),
        },
      },

      separator: {
        display:     'block',
        position:    'absolute',
        left:        rem(-25),
        right:       rem(-25),
        top:         '-75%',
        borderRight: `${rem(1)} solid rgba(255, 255, 255, 0.5)`,
        height:      '250%',
        transform:   'skew(-15deg)',
        transition:  'background 0.25s',

        ':hover': {
          background: 'rgba(255, 255, 255, 0.1)'
        }
      },
    },

    profile: {
      fontFamily: skin.font.ubuntu,
      fontWeight: 300,
      color:      '#ffffff',
      visibility: 'hidden',
      position:   'absolute',
      top:        0,
      left:       0,
      width:      '100%',
      height:     '100%',
      overflowY:  'scroll',

      visible: {
        visibility: 'visible',
      },

      fill: {
        background: '#2abbe7',
        position:   'fixed',
        top:        0,
        left:       '-150%',
        width:      '100%',
        height:     '100%',
        transform:  'skew(45deg)',
        transition: 'all 1s',

        visible: {
          left:      0,
          transform: 'skew(0deg)',
        }
      },

      close: {
        position:   'fixed',
        fontSize:   rem(80),
        lineHeight: rem(80),
        cursor:     'pointer',
        userSelect: 'none',
        top:        0,
        right:      rem(30),
        color:      '#ffffff',

        ':hover': {
          color: '#ffdd64'
        },
      },

      content: {
        position:   'relative',
        opacity:    0,
        maxWidth:   rem(800),
        padding:    rem(20),
        margin:     '0 auto',
        transition: 'all 0.2s 0.75s',
        textAlign:  'center',

        avatar: {
          width:        '150px',
          height:       '150px',
          borderRadius: '50%',
          margin:       `0 auto ${rem(40)}`,
          overflow:     'hidden',
          border:       `${rem(15)} solid rgba(255, 255, 255, 0.5)`,
        },

        img: {
          width:  '150px',
          height: '150px',
        },

        title: {
          fontFamily: skin.font.lobster,
          fontSize:   rem(80),
          padding:    `${rem(40)} 0 ${rem(20)} 0`,
          margin:     0,
        },

        bio: {
          textAlign: 'left'
        },

        visible: {
          opacity: 1,
        },

        linkedin: {
          fontSize:       rem(20),
          borderRadius:   rem(28),
          border:         `${rem(4)} solid #ffffff`,
          textDecoration: 'none',
          padding:        `${rem(9)} ${rem(20)} ${rem(11)}`,
          fontWeight:     700,
          color:          '#ffffff',
          display:        'inline-block',
          marginTop:      rem(80),

          ':hover': {
            color:  '#ffdd64',
            border: `${rem(4)} solid #ffdd64`,
          },
        },
      }
    },

    skin: skin
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