export const updateCart = ({
  commit
}, {item, quantity, isAdd}) => {
  // TODO: Call service
  commit('UPDATE_CART', {item, quantity, isAdd});
  if (isAdd) {
    let message_obj = {
      message: `Add ${item.title} to cart successfully`,
      messageClass: "success",
      autoClose: true
    }
    commit('ADD_MESSAGE', message_obj);
  }
}

export const removeItemInCart = ({commit}, {item}) => {
	commit('REMOVE_CART_ITEM', {item});
}

export const logout = ({commit}) => {
  commit('SET_CART', []); // clear current cart
  localStorage.removeItem('user');
  window.location.href = '/';
}

export function loginWithEmail (_, {email, password}) {
	if(email === 'admin@gmail.com' && password === 'admin') {
		localStorage.setItem('user',  { 
			uid: email, 
			email: email, 
			emailVerified: true });
		window.location.href = '/';
		return true;
	}
	return Promise.reject(new Error('Invalid user'));
}

export function getShoppingCart() {
	return localStorage.getItem('cart');
}

export function saveShoppingCart(_, {cartItemList}) {
	// console.log("ACTIONS saveShoppingCart");
	// console.log("CART DATA", cartItemList);
	return localStorage.setItem('cart', cartItemList);
}
