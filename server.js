const PORT = process.env.PORT || 5000
const APP_ENV = process.env.APP_ENV || 'dev'

const server = require('./src/app')({
  logger: {
    level: 'info',
    transport:
      APP_ENV === 'dev'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
})

const start = async () => {
  await server.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })
}

start()
