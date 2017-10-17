/*const screen_sm_min = '768px',
      screen_md_min = '992px',
      screen_lg_min = '1200px',
      screen_xs_max = parseInt(screen_sm_min) - 1 + 'px',
      screen_sm_max = parseInt(screen_md_min) - 1 + 'px',
      screen_md_max = parseInt(screen_lg_min) - 1 + 'px';*/

const DEFAULT_THEME = {
  color: {
    title:      '#ffdd64',
    navigation: '#ffffff',
    navhover:   '#000000',
    fill:       '#2abbe7',
    dancers:    ['#bd3263', '#77a7f8', '#bff877', '#e51c00', '#ff9600']
  },
  font:  {
    lobster: '"Lobster", cursive',
    ubuntu:  '"Ubuntu", sans-serif'
  }
};

let setStyle = (skin) => {
  let default_pixel_size = 16,
      rem                = (px) => {
        return px / default_pixel_size + 'rem';
      };

  return {
    container: {
      position:       'fixed',
      width:          '100%',
      height:         '100%',
      overflow:       'hidden',
      top:            0,
      left:           0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    },

    dancers: {
      position: 'absolute',
      top:      0,
      left:     0,
    },

    header: {
      position: 'relative',
      top:      '-15%'
    },

    title: {
      padding:    0,
      margin:     `0 0 ${rem(70)} 0`,
      fontSize:   rem(280),
      lineHeight: '1em',
      fontFamily: skin.font.lobster,
      textAlign:  'center',
      color:      skin.color.title,
    },

    navigation: {
      position:  'relative',
      textAlign: 'center',
      color:     skin.color.navigation,

      item: {
        display:    'inline-block',
        margin:     `0 ${rem(50)}`,
        fontSize:   rem(20),
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
          color: skin.color.navhover
        },

        '@media (min-width: 768px)': {
          fontSize:   rem(40),
          lineHeight: rem(40),
        },
      },

      separator: {
        display:     'block',
        position:    'absolute',
        left:        rem(-50),
        right:       rem(-50),
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
      color:      skin.color.navigation,
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
        background: skin.color.fill,
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
        color:      skin.color.navigation,
        transition: 'color 0.25s',

        ':hover': {
          color: skin.color.title
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
          border:         `${rem(4)} solid ${skin.color.navigation}`,
          textDecoration: 'none',
          padding:        `${rem(9)} ${rem(20)} ${rem(11)}`,
          fontWeight:     700,
          color:          skin.color.navigation,
          display:        'inline-block',
          marginTop:      rem(80),
          transition:     'all 0.25s',

          ':hover': {
            color:  skin.color.title,
            border: `${rem(4)} solid ${skin.color.title}`,
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
