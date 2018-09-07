import { store } from '@/store/store'
import router from '@/router/routes'

export default {
  canActivate () {
    if (store.state.user.currentUser) {
      return true;
    }
    router.push('/login');
    return false;
  }
}
