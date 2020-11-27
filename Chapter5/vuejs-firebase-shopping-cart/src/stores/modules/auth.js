const state = {
	isLoggedIn: localStorage.getItem('user'),
	user: localStorage.getItem('user'),
}

const mutations = {
	'AUTH_STATUS_CHANGE' (state) {
		state.isLoggedIn = localStorage.getItem('user');
		state.user =localStorage.getItem('user');
	}
}

const actions = {

}

const getters = {
	isLoggedIn: (state) => {
		return state.isLoggedIn;
	},
	currentUser: (state) => {
		if (state && state.user) {
			return {
				email: state.user.email,
				emailVerified: state.user.emailVerified,
				uid: state.user.uid
			}
		} else {
			return {};
		}
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
