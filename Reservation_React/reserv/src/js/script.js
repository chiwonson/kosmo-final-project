(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.butti-N1').forEach(function(block) {
      // Header Scroll
      window.addEventListener('load', handleScroll);
      window.addEventListener('scroll', handleScroll);

      function handleScroll() {
        const scrollTop = window.scrollY || window.pageYOffset;
        if (scrollTop > 0) {
          block.classList.add('header-top-active');
        } else {
          block.classList.remove('header-top-active');
        }
      }

      // Gnb
      const headerCenter = block.querySelector('.header-center');
      if (headerCenter) {
        headerCenter.addEventListener('mouseover', function() {
          if (window.innerWidth > 992) {
            block.classList.add('block-active');
          }
        });
        headerCenter.addEventListener('mouseout', function() {
          if (window.innerWidth > 992) {
            block.classList.remove('block-active');
          }
        });
      }

      // Gnb DecoLine
      block.querySelectorAll('.header-gnbitem').forEach(function(item) {
        const headerGnbLink = item.querySelector('.header-gnblink');
        if (headerGnbLink) {
          item.addEventListener('mouseover', function() {
            if (window.innerWidth > 992) {
              headerGnbLink.classList.add('on');
            }
          });
          item.addEventListener('mouseout', function() {
            if (window.innerWidth > 992) {
              headerGnbLink.classList.remove('on');
            }
          });
        }
      });

      // Mobile Top
      const btnMoMenu = block.querySelector('.btn-momenu');
      const btnMoClose = block.querySelector('.btn-moclose');
      if (btnMoMenu) {
        btnMoMenu.addEventListener('click', function() {
          block.classList.add('mo-active');
        });
      }
      if (btnMoClose) {
        btnMoClose.addEventListener('click', function() {
          block.classList.remove('mo-active');
        });
      }

      // Mobile Gnb
      block.querySelectorAll('.header-gnbitem').forEach(function(item) {
        const headerGnbLink = item.querySelector('.header-gnblink');
        if (headerGnbLink) {
          headerGnbLink.addEventListener('click', function() {
            const parentItem = item.parentElement;
            if (!parentItem.classList.contains('item-active')) {
              document.querySelectorAll('.header-gnbitem').forEach(function(el) {
                el.classList.remove('item-active');
              });
            }
            item.classList.toggle('item-active');
          });
        }
      });

      // Full Gnb
      const btnAllMenu = block.querySelector('.btn-allmenu');
      const fullmenuClose = block.querySelector('.fullmenu-close');
      if (btnAllMenu) {
        btnAllMenu.addEventListener('click', function() {
          block.querySelector('.header-fullmenu').classList.add('fullmenu-active');
        });
      }
      if (fullmenuClose) {
        fullmenuClose.addEventListener('click', function() {
          block.querySelector('.header-fullmenu').classList.remove('fullmenu-active');
        });
      }

      // Full Gnb DecoLine
      block.querySelectorAll('.fullmenu-gnbitem').forEach(function(item) {
        const fullmenuGnbLink = item.querySelector('.fullmenu-gnblink');
        if (fullmenuGnbLink) {
          item.addEventListener('mouseover', function() {
            if (window.innerWidth > 992) {
              fullmenuGnbLink.classList.add('on');
            }
          });
          item.addEventListener('mouseout', function() {
            if (window.innerWidth > 992) {
              fullmenuGnbLink.classList.remove('on');
            }
          });
        }
      });

      // Header Mobile 1Depth Click
      if (window.innerWidth <= 992) {
        block.querySelectorAll('.fullmenu-gnbitem').forEach(function(item) {
          const sublist = item.querySelector('.fullmenu-sublist');
          if (sublist) {
            const link = item.querySelector('.fullmenu-gnblink');
            if (link) {
              link.setAttribute('href', 'javascript:void(0);');
            }
          }
        });
      }
    });
  });
})();