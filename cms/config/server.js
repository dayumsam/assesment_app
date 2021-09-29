module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'efdd0b7eeb4ecbbd20ef1c0f27b091d7'),
    },
  },
});
