import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0a',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Top-left terminal label
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 40,
                left: 52,
                fontSize: 14,
                color: '#00ff41',
                letterSpacing: 3,
                opacity: 0.6,
              },
              children: '// portfolio.ts',
            },
          },
          // Bottom-right URL label
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 40,
                right: 52,
                fontSize: 13,
                color: '#00e5ff',
                letterSpacing: 2,
                opacity: 0.5,
              },
              children: 'humberto-fullstack-dev-website.vercel.app',
            },
          },
          // Accent line top
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
              },
            },
          },
          // Accent line bottom
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
              },
            },
          },
          // Main content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
              },
              children: [
                // Name
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 72,
                      fontWeight: 900,
                      color: '#00ff41',
                      letterSpacing: 6,
                      textShadow: '0 0 40px rgba(0,255,65,0.5)',
                      marginBottom: 8,
                    },
                    children: 'HUMBERTO LÓPEZ',
                  },
                },
                // Divider
                {
                  type: 'div',
                  props: {
                    style: {
                      width: 320,
                      height: 1,
                      backgroundColor: 'rgba(0,255,65,0.3)',
                      marginBottom: 20,
                    },
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 22,
                      color: '#00e5ff',
                      letterSpacing: 8,
                      textShadow: '0 0 20px rgba(0,229,255,0.4)',
                      marginBottom: 32,
                    },
                    children: 'FULL STACK DEVELOPER',
                  },
                },
                // Skills row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 12,
                    },
                    children: ['Angular', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'].map(
                      (skill) => ({
                        type: 'div',
                        props: {
                          style: {
                            padding: '6px 16px',
                            border: '1px solid rgba(0,255,65,0.3)',
                            color: 'rgba(0,255,65,0.8)',
                            fontSize: 13,
                            letterSpacing: 2,
                            borderRadius: 4,
                          },
                          children: skill,
                        },
                      })
                    ),
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
}
