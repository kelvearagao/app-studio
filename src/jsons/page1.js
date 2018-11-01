export default {
    'container': {
      type: 'div',
      childs: [
        'header',
        'content',
        'footer'
      ]
    },
    'header' : {
      type: 'div',
      style: {
        "backgroundColor": "gray",
        "height": "100px",
      },
      childs: [
        'nav'
      ]
    },
    'nav': {
      type: 'ul',
      style: {
        'backgroundColor': 'red',
      },
      childs: [
        'link1',
        'link2',
        'link3'
      ]
    },
    'link1': {
      type: 'li',
      style: {
        'backgroundColor': 'yellow'
      },
      childs: ['Home']
    },
    'link2': {
      type: 'li',
      style: {
        'backgroundColor': 'green'
      },
      childs: ['Contact']
    },
    'link3': {
      type: 'li',
      style: {
        'backgroundColor': 'pink'
      },
      childs: ['Map']
    },
    'content': {
      type: 'div',
      style: {
        'height': '300px',
        'backgroundColor': 'blue' 
      }
    },
    'footer': {
      type: 'div',
      style: {
        'height': '250px',
        'backgroundColor': 'black',
        'color': 'white'
      },
      childs: [
        'Todos os direitos reservados' 
      ]
    }
  }
