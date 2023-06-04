import type { UserConfig } from 'vite'

const config: UserConfig = {
  optimizeDeps: {
    include: ["react-icons"],
  },
}

export default config
