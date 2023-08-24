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

tl1.from('.middle__img:nth-child(1)', 1.5, { height: 0 });
tl2.from('.middle__img:nth-child(2)', 2, { height: 0 });

ScrollTrigger.create({
  trigger: '.middle__img',
  start: 'top 90%', // 스크롤 트리거 시작 지점
  // markers: true,
  onEnter: function () {
    tl1.restart();
    tl2.restart();
  },
});

// window.addEventListener('scroll', function () {
//   // Get number of pixels of scroll.
//   const pixel = window.scrollY;
//   console.log(pixel);
//   if (pixel > 685) {
//     document.querySelector('.nav__wrap').classList.add('fixed-menu');
//   } else {
//     document.querySelector('.nav__wrap').classList.remove('fixed-menu');
//   }
// });

// f-contnet --> text 올라가는 효과
gsap.from('.in', {
  y: 30,
  opacity: 0,
  stagger: 0.5,
  scrollTrigger: {
    trigger: '.f-content',
    start: 'top 70%',
    toggleActions: 'play none none reset',
    ease: 'power1.inOut',
  },
});

// s-content 이미지 scale효과
let tl3 = gsap.fromTo('.imgscale', { scale: 1.2 }, { scale: 1, duration: 3 });
ScrollTrigger.create({
  trigger: '.s-content',
  start: 'top 40%',
  end: 'center 60%',
  scrub: 3,
  animation: tl3,
});

//  s-content 이미지리스트 - y 값 움직이기
const firstImageMove = document.querySelectorAll('.listitem .item');

firstImageMove.forEach((item) => {
  let triggerElement = item;
  let targetElement = item;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });
  tl.fromTo(
    targetElement,
    {
      y: '30%',
    },
    {
      ease: 'power2',
      y: '0',
    }
  );
});

// s-content text sticky효과
gsap.utils.toArray('.s-main__text').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top 40%',
    end: 'bottom -120%',
    pin: true,
    pinSpacing: false,
  });
});

// s-content hidden-text 서서히 나타나는 효과
let tl5 = new TimelineMax({});
tl5.staggerFrom('.hidden-text', 1.4, { opacity: 0, ease: 'power4.easeOut' }, 1);

ScrollTrigger.create({
  trigger: '.s-wrap',
  start: 'top center',
  opacity: 1,
  onEnter: function () {
    tl5.restart();
  },
});

// s-content text cursive 텍스트 순서대로 위로 올라가기
let line = $('.up');
let tl = new TimelineLite({
  onComplete: function () {
    tl.restart();
  },
});

TweenLite.defaultEase = Circ.easeInOut;

let time = 0.5;
let y = 10;
let x = 10;

tl.add(
  TweenMax.staggerFromTo(
    line,
    time,
    {
      opacity: 0,
      y: y,
      x: x,
    },
    {
      opacity: 1,
      y: 0,
      lineHeight: 1.5,
      x: 10,
    },
    2
  )
).add(
  TweenMax.staggerTo(
    line,
    time,
    {
      delay: time,
      opacity: 0,
      y: -y,
    },
    2
  ),
  1.5
);

// t-content text
let tl6 = gsap.timeline();

gsap.utils.toArray('.t-content__text').forEach((content, i) => {
  tl6
    .to(content, {
      opacity: 1,
      duration: 3,
    })
    .to(content, {
      y: -100,
      opacity: 0,
      duration: 3,
    });
});

ScrollTrigger.create({
  trigger: '.t-content',
  start: '400px center',
  end: '+=1000',
  scrub: 1,
  animation: tl6,
  pin: true,
  anticipathPin: 1,
  // markers: true,
});

// t-content img
const images = gsap.utils.toArray('.t-content__img');
const imagesTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.t-content__img',
    pin: images,
    pinSpacing: false,
    start: 'top 60%',
    end: '+=1000',
    // markers: {
    //   startColor: 'yellow',
    //   endColor: 'black',
    //   fontSize: '4rem',
    //   indent: 200,
    // },
    scrub: true,
  },
});

images.forEach((image, i) => {
  if (i) {
    imagesTl.to(image, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
    });
  }
});

// fo-content
let btn = document.querySelector('.f-btn');
let clipPathAnimation = gsap.to('.hovered-img', 1, {
  paused: true,
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  ease: 'power4.inOut',
  stagger: {
    from: 'random',
    amount: 0.75,
  },
});
console.log('clipPathAnimation: ', clipPathAnimation);

btn.addEventListener('mouseenter', () => {
  clipPathAnimation.play();
});

btn.addEventListener('mouseleave', () => {
  clipPathAnimation.reverse();
});

// fo
gsap.utils.toArray('.f-btn').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: 'top top',
    end: 'bottom -100%',
    pin: true,
    pinSpacing: false,
  });
});
// s-content 이미지 scale효과
let tl7 = gsap.fromTo('.imgscale', { scale: 1.2 }, { scale: 1, duration: 2 });
ScrollTrigger.create({
  trigger: '.l-content',
  start: 'top center',
  end: 'bottom top',
  scrub: 1,
  animation: tl7,
});
//  s-content 이미지리스트 - y 값 움직이기
const lastImageMove = document.querySelectorAll('.l-text');

lastImageMove.forEach((item) => {
  let triggerElement = item;
  let targetElement = item;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top 20%',
      end: 'center top',
      scrub: 4,
      markers: true,
    },
  });
  tl.fromTo(
    targetElement,
    {
      y: '0',
    },
    {
      ease: 'power2',
      y: '-30%',
    }
  );
});
