// No-auth mode: disable Clerk middleware by making it a no-op
export default function middleware() {
  // no-op
}

export const config = {
  matcher: [],
};