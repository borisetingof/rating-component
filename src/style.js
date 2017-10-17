const DEFAULT_THEME = {
  color: {
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
};

let setStyle = (skin) => {
  let default_pixel_size = 16,
      rem                = (px) => {
        return px / default_pixel_size + 'rem';
      };

  return {
    container: {
      position:  'fixed',
      width:     '100%',
      height:    '100%',
      overflowY: 'scroll',
      top:       0,
      left:      0,

      '@media (min-width: 768px)': {
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }
    },

    noscroll: {
      overflowY: 'hidden',
    },

    dancers: {
      display: 'none',

      '@media (min-width: 768px)': {
        display:  'block',
        position: 'absolute',
        top:      0,
        left:     0,
      }
    },

    header: {
      '@media (min-width: 768px)': {
        position: 'relative',
        top:      '-15%',
      },
    },

    title: {
      padding:    0,
      margin:     `${rem(15)} 0`,
      fontSize:   rem(100),
      lineHeight: '1em',
      fontFamily: skin.font.lobster,
      textAlign:  'center',
      color:      skin.color.title,

      '@media (min-width: 768px)': {
        fontSize: rem(280),
        margin:   `0 0 ${rem(70)} 0`,
      },
    },

    navigation: {
      position:  'relative',
      textAlign: 'center',
      color:     skin.color.navigation,

      '@media (min-width: 768px)': {
        whiteSpace: 'nowrap',
      },

      item: {
        margin:     `${rem(21)} 0`,
        fontSize:   rem(21),
        position:   'relative',
        transition: 'color 0.25s',
        cursor:     'pointer',
        display:    'block',

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
          display:    'inline-block',
          margin:     `0 ${rem(25)}`,
          fontSize:   rem(20),
          lineHeight: rem(20),
        },

        '@media (min-width: 992px)': {
          margin:     `0 ${rem(40)}`,
          fontSize:   rem(30),
          lineHeight: rem(30),

        },

        '@media (min-width: 1200px)': {
          margin:     `0 ${rem(50)}`,
          fontSize:   rem(40),
          lineHeight: rem(40),
        },
      },

      separator: {
        width:        rem(10),
        height:       rem(10),
        borderRadius: rem(5),
        top:          rem(10),
        margin:       '0 auto',
        position:     'relative',

        '@media (max-width: 767px)': {
          background: skin.color.navigation
        },

        '@media (min-width: 768px)': {
          display:      'block',
          position:     'absolute',
          left:         rem(-25),
          right:        rem(-25),
          top:          '-75%',
          borderRight:  `${rem(1)} solid rgba(255, 255, 255, 0.5)`,
          borderRadius: 0,
          width:        'auto',
          height:       '250%',
          transform:    'skew(-15deg)',
          transition:   'background 0.25s',

          ':hover': {
            background: 'rgba(255, 255, 255, 0.1)'
          },
        },

        '@media (min-width: 992px)': {
          left:  rem(-40),
          right: rem(-40),
        },

        '@media (min-width: 1200px)': {
          left:  rem(-50),
          right: rem(-50),
        },
      },
    },

    profile: {
      fontFamily: skin.font.ubuntu,
      color:      skin.color.navigation,
      fontWeight: 300,
      visibility: 'hidden',
      position:   'fixed',
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
        left:       '-200%',
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
        fontSize:   rem(40),
        lineHeight: rem(40),
        cursor:     'pointer',
        userSelect: 'none',
        top:        0,
        right:      rem(10),
        color:      skin.color.navigation,
        transition: 'color 0.25s',

        '@media (min-width: 768px)': {
          fontSize:   rem(80),
          lineHeight: rem(80),
          right:      rem(30),
        },

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
          width:        150,
          height:       150,
          borderRadius: '50%',
          margin:       `0 auto ${rem(20)}`,
          overflow:     'hidden',
          border:       `${rem(15)} solid rgba(255, 255, 255, 0.5)`,

          '@media (min-width: 768px)': {
            margin:       `0 auto ${rem(40)}`,

          },
        },

        img: {
          width:  150,
          height: 150,
        },

        title: {
          fontFamily: skin.font.lobster,
          fontSize:   rem(50),
          lineHeight:   rem(50),
          padding:    `${rem(40)} 0 ${rem(20)} 0`,
          margin:     0,

          '@media (min-width: 768px)': {
            fontSize:   rem(60),
            lineHeight:   rem(60),
          },
        },

        bio: {
          textAlign: 'left',
          fontSize:   rem(14),

          '@media (min-width: 768px)': {
            fontSize:   rem(16),
          },
        },

        visible: {
          opacity: 1,
        },

        linkedin: {
          fontSize:       rem(15),
          borderRadius:   rem(28),
          border:         `${rem(4)} solid ${skin.color.navigation}`,
          textDecoration: 'none',
          padding:        `${rem(9)} ${rem(20)} ${rem(11)}`,
          fontWeight:     700,
          color:          skin.color.navigation,
          display:        'inline-block',
          marginTop:      rem(30),
          transition:     'all 0.25s',

          ':hover': {
            color:  skin.color.title,
            border: `${rem(4)} solid ${skin.color.title}`,
          },

          '@media (min-width: 768px)': {
            marginTop:      rem(80),
            fontSize:   rem(20),
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
