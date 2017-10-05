const DEFAULT_SKIN = {
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

class Style {

  init(skin = DEFAULT_SKIN) {
    this._theme = Style._setTheme(skin);
    return this._theme;
  }

  getTheme() {
    this._theme = this._theme || this.init();
    return this._theme;
  }

  static _setTheme(skin) {
    let default_pixel_size = 16,
        em                 = (px) => {
          return px / default_pixel_size + 'em';
        };

    return {
      width:      em(299),
      fontSize:   '1em',
      fontFamily: skin.font_family,
      color:      skin.color.title,

      interactive: {
        width: em(225),
      },

      container: {
        padding:      `${em(24)} ${em(24)} ${em(23)}`,
        borderRadius: em(5),
        border:       `${em(1)} solid ${skin.color.border}`,
        whiteSpace:   'nowrap',

        interactive: {
          boxShadow: `0 0 ${em(4)} ${em(1)} ${skin.color.shadow} inset`,
        },

        disabled: {
          opacity: 0.42
        }
      },

      title: {
        padding:       0,
        margin:        `${em(-1)} 0 0 0`,
        fontSize:      em(16),
        lineHeight:    '1.3em',
        display:       'inline-block',
        fontWeight:    'normal',
        verticalAlign: 'top',

        interactive: {
          fontSize:   em(18),
          margin:     `0 0 ${em(15)} 0`,
          display:    'block',
          fontWeight: 'bold',
        },
      },

      alert: {
        fontSize:     em(14),
        lineHeight:   '1.3em',
        fontWeight:   500,
        margin:       `0 0 ${em(7)}`,
        padding:      `${em(16.5)} 0 ${em(17.5)}`,
        borderRadius: em(5),
        background:   skin.color.alert_background,
        color:        skin.color.alert_text,
        textAlign:    'center',
      },

      button: {
        fontSize:     em(14),
        fontFamily:   skin.font_family,
        padding:      `${em(4)} ${em(27.5)} ${em(6)}`,
        marginTop:    em(16),
        border:       `${em(1)} solid ${skin.color.border}`,
        borderRadius: em(5),
        color:        skin.color.title,
        background:   'transparent',
        transition:   'color 0.2s',
        display:      'block',

        enabled: {
          cursor: 'pointer',
        },

        disabled: {
          outline: 'none',
        },

        greyed_out: {
          color: skin.color.button_text_grey_out,
        }
      },

      stars: {
        margin:  `0 0 0 ${em(8)}`,
        padding: 0,
        display: 'inline',
        outline: 'none',

        interactive: {
          margin: em(-4),
        }
      },

      star: {
        padding:    em(3),
        fontSize:   em(22),
        color:      skin.color.inactive_star,
        transition: 'color 0.2s',
        display:    'inline',
        listStyle:  'none',
        userSelect: 'none',

        interactive: {
          fontSize: em(27),
          padding:  em(4),
        },

        enabled: {
          cursor: 'pointer',
        },

        active: {
          color: skin.color.active_star,
        },

        blurred: {
          outline: 'none'
        },
      }
    }
  }
}

let instance;

export default {
  getInstance() {
    if (!instance) {
      instance = new Style();
    }
    return instance;
  }
};