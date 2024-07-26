import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// export default defineConfig({
//   plugins: [
//     react(),
//     visualizer({
//       filename: './dist/stats.html', // The file where the visualization will be saved
//       open: true, // Automatically open the visualization in the browser
//     }),
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks(id: string) {
//           if (id.includes('node_modules')) {
//             return id.toString().split('node_modules/')[1].split('/')[0].toString();
//           }
//         },
//       },
//     },
//   },
// });
