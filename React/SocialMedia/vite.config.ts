import {defineConfig} from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": {
                target: "http://jsonplaceholder.typicode.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@assets": path.resolve(__dirname, "src/assets"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@store": path.resolve(__dirname, "src/store"),
            "@components": path.resolve(__dirname, "src/components"),
        },
    },
});
