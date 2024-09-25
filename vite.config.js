import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return defineConfig({
        plugins: [react()],
        define: {
            'process.env.REACT_APP_URL': JSON.stringify(env.REACT_APP_URL),
        }
    })
}
