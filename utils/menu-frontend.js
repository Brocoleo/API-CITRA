const getMenuFrontend = (role = 'USER_ROLE') => {

  const menu = [
      {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
              { titulo: 'Naves Invernaderos', url: ''},
              { titulo: 'Historial', url: 'historial'},
          ]
      },
  ];

  if(role === 'ADMIN_ROLE'){

      menu.unshift(
          {
              titulo: 'Mantenimientos',
              icono: 'mdi mdi-folder-lock-open',
              submenu: [
                  { titulo: 'Usuarios', url: 'usuarios'},
                  { titulo: 'Componentes', url: 'componentes'},
              ]
          },
      )
  }

  return menu;
}

module.exports= {

  getMenuFrontend
}
