/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "480px",
      },
    },
    extend: {
      colors: {
        // 主色调 - 怀旧复古色
        warm: {
          50: "#FFFDF7",
          100: "#FFF8E1",
          200: "#FFE4B5",
          300: "#FFD28A",
          400: "#FFBC5C",
          500: "#F5A623",
          600: "#E08E0B",
          700: "#B26A00",
        },
        kraft: {
          100: "#F5E6D0",
          200: "#E8D4B0",
          300: "#D2B48C",
          400: "#B8956A",
          500: "#9B7A4A",
          600: "#7A5E36",
        },
        rust: {
          300: "#D9534F",
          400: "#CC3B2C",
          500: "#B22222",
          600: "#8B1A1A",
          700: "#6B1212",
        },
        wood: {
          400: "#A0522D",
          500: "#8B4513",
          600: "#6B3410",
          700: "#4A2308",
        },
        mint: {
          200: "#BFF5BF",
          300: "#98FB98",
          400: "#77DD77",
        },
        retro: {
          pink: "#FFB6C1",
          blue: "#87CEEB",
          yellow: "#FFD700",
          green: "#90EE90",
        },
      },
      fontFamily: {
        handwriting: ['"Ma Shan Zheng"', '"ZCOOL KuaiLe"', '"Zhi Mang Xing"', 'cursive'],
        retro: ['"ZCOOL XiaoWei"', '"Noto Serif SC"', 'serif'],
        typewriter: ['"Courier Prime"', '"Special Elite"', 'monospace'],
      },
      backgroundImage: {
        'wood-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%238B4513\" fill-opacity=\"0.08\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'paper-texture': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.06\"/%3E%3C/svg%3E')",
        'glass-jar': 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
        'thermal-paper': 'linear-gradient(180deg, #FFFDF7 0%, #F8F0E0 100%)',
      },
      boxShadow: {
        'vintage': '4px 4px 0 rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
        'sticker': '2px 2px 8px rgba(0,0,0,0.15), -1px -1px 0 rgba(255,255,255,0.5)',
        'glass': 'inset 0 2px 10px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.1)',
        'neon': '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.2)',
        'button-3d': '0 4px 0 rgba(107, 52, 16, 0.8), 0 6px 10px rgba(0,0,0,0.2)',
        'button-pressed': '0 2px 0 rgba(107, 52, 16, 0.8), 0 2px 5px rgba(0,0,0,0.2)',
      },
      keyframes: {
        'neon-flicker': {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700, 0 0 40px #FF6B35' },
          '50%': { opacity: '0.92', textShadow: '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700, 0 0 20px #FF6B35' },
        },
        'float-down': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        'danmaku-scroll': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px) rotate(-1deg)' },
          '75%': { transform: 'translateX(4px) rotate(1deg)' },
        },
        'stamp': {
          '0%': { transform: 'scale(3) rotate(-20deg)', opacity: '0' },
          '60%': { transform: 'scale(1.1) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-5deg)', opacity: '0.9' },
        },
        'page-flip': {
          '0%': { transform: 'perspective(600px) rotateY(0deg)', opacity: '1' },
          '100%': { transform: 'perspective(600px) rotateY(-90deg)', opacity: '0' },
        },
        'cart-bounce': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(var(--bx, -80px), var(--by, -120px)) scale(0.4)' },
          '100%': { transform: 'translate(var(--bx, -120px), var(--by, -200px)) scale(0.2)', opacity: '0' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite',
        'float-down': 'float-down linear infinite',
        'danmaku-scroll': 'danmaku-scroll 28s linear infinite',
        'bounce-soft': 'bounce-soft 1.8s ease-in-out infinite',
        'shake': 'shake 0.4s ease-in-out',
        'stamp': 'stamp 0.6s ease-out forwards',
        'page-flip': 'page-flip 0.4s ease-in',
        'cart-bounce': 'cart-bounce 0.8s ease-out forwards',
        'floatY': 'float-y 2.8s ease-in-out infinite',
        'slideUp': 'slide-up 0.35s ease-out',
        'popIn': 'pop-in 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      },
    },
  },
  plugins: [],
};
