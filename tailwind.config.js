module.exports = {
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  theme: {
    extend: {
      height: {
        80: '90vh',
        200: '200px',
        250: '250px',
        300: '300px',
        400: '400px',
        450: '450px',
        500: '500px',
        700: '700px',
      },
      colors: {
        andrea: '#6700f9',
      },
    },
    fontFamily: {
      body: ['Open Sans', 'Roboto', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwindcss-animatecss')({
      classes: [
        'animate__animated',
        'animate__fadeIn',
        'animate__bounceIn',
        'animate__lightSpeedOut',
        'animate__lightSpeedInRight',
        'animate__lightSpeedInLeft',
        'animate__fadeInDown',
        'animate__fadeInUp',
        'animate__fadeInLeft',
        'animate__fadeOut',
        'animate__fadeOutLeft',
        'animate__heartBeat',
        'animate__rollIn',
        'animate__rollOut',
        'animate__backOutDown',
        'animate__backOutUp',
      ],
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDeplaySpeed: 1000,
      },
      variants: ['responsive'],
    }),
  ],
};
