document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.butti-N1');

  blocks.forEach(block => {
    // Header Scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        block.classList.add('header-top-active');
      } else {
        block.classList.remove('header-top-active');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    // Gnb
    const headerCenter = block.querySelector('.header-center');
    if (headerCenter) {
      headerCenter.addEventListener('mouseover', () => {
        if (window.innerWidth > 992) {
          block.classList.add('block-active');
        }
      });

      headerCenter.addEventListener('mouseout', () => {
        if (window.innerWidth > 992) {
          block.classList.remove('block-active');
        }
      });
    }

    // Gnb DecoLine
    const gnbItems = block.querySelectorAll('.header-gnbitem');
    gnbItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        if (window.innerWidth > 992) {
          const link = item.querySelector('.header-gnblink');
          if (link) link.classList.add('on');
        }
      });

      item.addEventListener('mouseout', () => {
        if (window.innerWidth > 992) {
          const link = item.querySelector('.header-gnblink');
          if (link) link.classList.remove('on');
        }
      });
    });

    // Mobile Top
    const btnMoMenu = block.querySelector('.btn-momenu');
    const btnMoClose = block.querySelector('.btn-moclose');

    if (btnMoMenu) {
      btnMoMenu.addEventListener('click', () => {
        block.classList.add('mo-active');
      });
    }

    if (btnMoClose) {
      btnMoClose.addEventListener('click', () => {
        block.classList.remove('mo-active');
      });
    }

    // Mobile Gnb
    gnbItems.forEach(item => {
      const link = item.querySelector('.header-gnblink');
      if (link) {
        link.addEventListener('click', () => {
          const parent = link.closest('.header-gnbitem');
          if (parent && !parent.classList.contains('item-active')) {
            gnbItems.forEach(i => i.classList.remove('item-active'));
          }
          if (parent) parent.classList.toggle('item-active');
        });
      }
    });

    // Full Gnb
    const btnAllMenu = block.querySelector('.btn-allmenu');
    const fullMenuClose = block.querySelector('.fullmenu-close');

    if (btnAllMenu) {
      btnAllMenu.addEventListener('click', () => {
        const headerFullMenu = block.querySelector('.header-fullmenu');
        if (headerFullMenu) headerFullMenu.classList.add('fullmenu-active');
      });
    }

    if (fullMenuClose) {
      fullMenuClose.addEventListener('click', () => {
        const headerFullMenu = block.querySelector('.header-fullmenu');
        if (headerFullMenu) headerFullMenu.classList.remove('fullmenu-active');
      });
    }

    // Full Gnb DecoLine
    const fullGnbItems = block.querySelectorAll('.fullmenu-gnbitem');
    fullGnbItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        if (window.innerWidth > 992) {
          const link = item.querySelector('.fullmenu-gnblink');
          if (link) link.classList.add('on');
        }
      });

      item.addEventListener('mouseout', () => {
        if (window.innerWidth > 992) {
          const link = item.querySelector('.fullmenu-gnblink');
          if (link) link.classList.remove('on');
        }
      });
    });

    // Header Mobile 1Depth Click
    if (window.innerWidth <= 992) {
      fullGnbItems.forEach(item => {
        const sublist = item.querySelector('.fullmenu-sublist');
        if (sublist) {
          const link = item.querySelector('.fullmenu-gnblink');
          if (link) link.setAttribute('href', 'javascript:void(0);');
        }
      });
    }
  });
});