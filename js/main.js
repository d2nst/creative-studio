'use strict';

// 로딩페이지 구현
// const loader = document.querySelector('.loader');
// const html = document.querySelector('html');

// html.style.overflow = 'hidden'; //로딩 중 스크롤 방지

// window.addEventListener('load', ()=>{

//      setTimeout(() => { //  <-* 로딩속도를 구현하기 위한 코드로 실제 적용시 제거

//       	loader.style.opacity = '0';
// 		html.style.overflow = 'auto'; //스크롤 방지 해제

//         setTimeout(() => {
//       		loader.style.display = 'none';
//   		}, 400);

//   }, 2000); // <-* 로딩속도 구현

// })

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
  start: 'top 90%', // 스크롤 트리거 시작 지점
  // markers: true,
  onEnter: function () {
    tl1.restart();
    tl2.restart();
  },
});

// f-contnet --> text 올라가는 효과
gsap.from('.in', {
  y: 30,
  opacity: 0,
  stagger: 0.7,
  scrollTrigger: {
    trigger: '.f-content',
    start: 'top 70%',
    toggleActions: 'play none none reset',
    ease: 'power1.inOut',
  },
});

// s-content 이미지 scale효과
let tl3 = gsap.fromTo('.imgscale', { scale: 1.3 }, { scale: 1, duration: 3 });
ScrollTrigger.create({
  trigger: '.s-content',
  start: 'top 40%',
  end: 'center 60%',
  scrub: 3,
  animation: tl3,
});

// s-content 텍스트 올라가는 효과
let tl5 = new TimelineMax({});
tl5.staggerFrom('.hidden-text', 1.5, { opacity: 0, ease: 'power4.easeOut' }, 1);

ScrollTrigger.create({
  trigger: '.s-wrap',
  start: 'top center',
  opacity: 1,
  onEnter: function () {
    tl5.restart();
  },
});

// s-content text sticky효과
gsap.utils.toArray('.s-main__text').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top 40%',
    end: 'bottom -100%',
    pin: true,
    pinSpacing: false,
    markers: true,
  });
});

// s-image__list 이미지 올라가는 효과
gsap.from('.listitem', {
  y: 30,
  opacity: 0,
  stagger: 0.5,
  scrub: 1,
  scrollTrigger: {
    trigger: '.s-image__list',
    start: 'top 70%',
    toggleActions: 'play none none reset',
    ease: 'power2.inOut',
  },
});

// s-main__text h3 - span 내용 좌측 이미지 배열에 따라 변경
const stickyLink = [
  'Websites',
  'Collateral',
  'Strategy',
  'Identity',
  'Packaging',
];
