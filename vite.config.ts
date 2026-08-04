import { website } from '@liangmi/vp-config'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default website({
  plugins: [vue(), UnoCSS()],
  lint: {
    options: {
      typeCheck: false
    }
  }
})
