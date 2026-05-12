import {
  createAdminSession,
  getAdminSession,
  revokeAdminSession,
  startAdminSessionCleanup,
} from '../repositories/adminSessionsRepository.js';

startAdminSessionCleanup();

function parseBearer(authHeader = '') {
  if (!authHeader.startsWith('Bearer ')) return '';
  return authHeader.slice(7).trim();
}

async function requireAdmin(req, res, next) {
  try {
    const bearer = parseBearer(req.headers.authorization || '');
    const session = await getAdminSession(bearer);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.adminSession = session;
    return next();
  } catch {
    return res.status(500).json({ error: 'Unable to validate admin session' });
  }
}

async function login(req, res) {
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const u = String(req.body?.username || '').trim();
    const p = String(req.body?.password || '');

    if (u !== username || p !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const session = await createAdminSession({
      username: u,
      metadata: {
        userAgent: req.get('user-agent') || '',
        ip: req.ip || '',
      },
    });

    return res.json({
      token: session.token,
      username: u,
      expiresAt: session.expiresAt,
    });
  } catch {
    return res.status(500).json({ error: 'Unable to create admin session' });
  }
}

async function logout(req, res) {
  try {
    const bearer = parseBearer(req.headers.authorization || '');
    if (bearer) {
      await revokeAdminSession(bearer);
    }

    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Unable to revoke admin session' });
  }
}

export const adminAuthMiddleware = {
  login,
  logout,
  requireAdmin,
};