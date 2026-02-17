// __tests__/api/auth/login.test.ts
const { POST } = require('@/app/api/auth/login/route')
const bcrypt = require('bcrypt')

// Mock bcrypt
jest.mock('bcrypt')
const mockCompare = bcrypt.compare as jest.MockedFunction<typeof bcrypt.compare>

describe('Login API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Environment variables
    process.env.ADMIN_USERNAME = 'admin'
    process.env.ADMIN_PASSWORD_HASH = '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u'
    
    // Clear Redis env vars 
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('should return 400 if username or password is missing', async () => {
    const { NextRequest } = require('next/server')
    
    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({})
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Kullanıcı adı ve şifre gereklidir.')
  })

  it('should return 401 for wrong password', async () => {
    mockCompare.mockResolvedValue(false)
    const { NextRequest } = require('next/server')

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        username: 'admin', 
        password: 'wrong_password' 
      })
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.message).toContain('Geçersiz kullanıcı adı veya şifre')
  })

  it('should return 200 for valid credentials', async () => {
    mockCompare.mockResolvedValue(true)
    const { NextRequest } = require('next/server')

    const req = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ 
        username: 'admin', 
        password: 'correct_password' 
      })
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Giriş başarılı')
    expect(data.username).toBe('admin')
  })
})