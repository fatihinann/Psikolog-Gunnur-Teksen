require('@testing-library/jest-dom')

// Polyfills
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Response class
class MockResponse {
  constructor(body, init = {}) {
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new MockHeaders(init.headers)
    this._body = body
    this.ok = this.status >= 200 && this.status < 300
  }

  async json() {
    if (typeof this._body === 'string') {
      try {
        return JSON.parse(this._body)
      } catch {
        return this._body
      }
    }
    return this._body
  }

  async text() {
    return typeof this._body === 'string' ? this._body : JSON.stringify(this._body)
  }

  static json(data, init = {}) {
    return new MockResponse(JSON.stringify(data), {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init.headers || {})
      }
    })
  }
}

// Mock Headers class
class MockHeaders {
  constructor(init) {
    this.headers = new Map()
    
    if (init) {
      if (typeof init === 'object') {
        Object.entries(init).forEach(([key, value]) => {
          this.headers.set(key.toLowerCase(), String(value))
        })
      }
    }
  }

  get(name) {
    return this.headers.get(name.toLowerCase()) || null
  }

  set(name, value) {
    this.headers.set(name.toLowerCase(), String(value))
  }

  has(name) {
    return this.headers.has(name.toLowerCase())
  }

  delete(name) {
    this.headers.delete(name.toLowerCase())
  }

  forEach(callback) {
    this.headers.forEach((value, key) => callback(value, key, this))
  }

  append(name, value) {
    const existingValue = this.headers.get(name.toLowerCase())
    if (existingValue) {
      this.headers.set(name.toLowerCase(), `${existingValue}, ${value}`)
    } else {
      this.headers.set(name.toLowerCase(), String(value))
    }
  }

  entries() { return this.headers.entries() }
  keys() { return this.headers.keys() }
  values() { return this.headers.values() }
  [Symbol.iterator]() { return this.headers[Symbol.iterator]() }
}

// Set global mocks
global.Response = MockResponse
global.Headers = MockHeaders
global.fetch = jest.fn()

// Mock next/server with proper ESM support
jest.mock('next/server', () => {
  class MockNextRequest {
    constructor(url, init = {}) {
      this.url = url
      this.method = init.method || 'GET'
      this.headers = new MockHeaders(init.headers)
      this._body = init.body
      this.ip = '127.0.0.1'
    }

    async json() {
      if (typeof this._body === 'string') {
        try {
          return JSON.parse(this._body)
        } catch (e) {
          throw new SyntaxError('Unexpected token in JSON')
        }
      }
      return this._body
    }

    async text() {
      return typeof this._body === 'string' ? this._body : JSON.stringify(this._body)
    }
  }

  return {
    NextRequest: MockNextRequest,
    NextResponse: {
      json: (data, init = {}) => MockResponse.json(data, init),
      redirect: (url, status = 302) => new MockResponse(null, { 
        status, 
        headers: { 'Location': url } 
      })
    }
  }
})

// Mock bcrypt with ESM support
jest.mock('bcrypt', () => {
  const mockCompare = jest.fn()
  return {
    __esModule: true,
    default: {
      compare: mockCompare
    },
    compare: mockCompare
  }
})

// Mock Upstash Redis
jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({
    hgetall: jest.fn().mockResolvedValue({}),
    hset: jest.fn().mockResolvedValue('OK'),
    expire: jest.fn().mockResolvedValue(1),
    setex: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
    ttl: jest.fn().mockResolvedValue(-1)
  }))
}))

// Environment variables
process.env.ADMIN_USERNAME = 'admin'
process.env.ADMIN_PASSWORD_HASH = '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u'
process.env.NODE_ENV = 'test'

// Clear Redis env vars to force memory store usage
delete process.env.UPSTASH_REDIS_REST_URL
delete process.env.UPSTASH_REDIS_REST_TOKEN

console.log('Jest setup completed successfully')