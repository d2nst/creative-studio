'use strict';

gsap.registerPlugin(ScrollTrigger);

// nav hover

// f-content 이미지 순차적인 애니메이션 효과
let tl1 = new TimelineMax(),
  tl2 = new TimelineMax(),
  count = 0;

tl1.from('.middle__img:nth-child(1)', 2, { height: 0 });
tl2.from('.middle__img:nth-child(2)', 2.8, { height: 0 });

ScrollTrigger.create({
  trigger: '.middle__img',
  start: 'top 80%', // 스크롤 트리거 시작 지점
  onEnter: function () {
    tl1.restart();
    tl2.restart();
  },
});

// f-contnet --> text 올라가는 효과
gsap.from('.in', {
  y: 30,
  opacity: 0,
  stagger: 0.5,
  scrollTrigger: {
    trigger: '.f-content',
    start: 'top 80%',
    markers: true,
    toggleActions: 'play none none reset',
    ease: 'power1.inOut',
  },
});
